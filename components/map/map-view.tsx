"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"

const PROXY = "/api/map-proxy"
const ASSETS = "/map/assets/"

// Preload pixel fonts
if (typeof document !== "undefined") {
  ;["minecraft_font.ttf", "unifont-15.1.04.otf"].forEach((f) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "font"
    link.href = `${ASSETS}/font/${f}`
    link.crossOrigin = "anonymous"
    document.head.appendChild(link)
  })
}

interface MapProperties {
  minRegionX: number
  minRegionZ: number
  maxRegionX: number
  maxRegionZ: number
  maxZoom: number
  minZoom: number
  imageFormat: string
  markers: Array<{
    x: number; z: number; image?: string; imageScale?: number
    imageAnchor?: [number, number]; text?: string; textColor?: string
    offsetX?: number; offsetY?: number; font?: string
  }>
}

interface RegionGroup { x: number; z: number; m: number[] }

export interface MapViewHandle {
  centerOn: (x: number, z: number) => void
  toggleMarkers: () => boolean
}

const MapView = forwardRef<MapViewHandle>((_, ref) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const viewProjRef = useRef<any>(null)
  const dataProjRef = useRef<any>(null)
  const loaded = useRef(false)

  useImperativeHandle(ref, () => ({
    centerOn(x: number, z: number) {
      const map = mapInstance.current
      if (!map) return
      const { transform } = require("ol/proj")
      const view = map.getView()
      const center = transform([x, z], dataProjRef.current, viewProjRef.current)
      view.animate({ center, duration: 500, zoom: Math.max(view.getZoom() || 0, 2) })
    },
    toggleMarkers() {
      const map = mapInstance.current
      if (!map) return false
      const layers: any[] = map._markerLayers || []
      if (!layers.length) return false
      const visible = layers.some((l: any) => l.getVisible())
      layers.forEach((l: any) => l.setVisible(!visible))
      return !visible
    },
  }))

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    async function initMap() {
      const resp = await fetch("/api/unmined-data")
      if (!resp.ok) throw new Error(`Failed to load map data: ${resp.status}`)
      const { properties: mapProperties, regions } = await resp.json() as {
        properties: MapProperties
        regions: RegionGroup[]
      }

      const { default: Map } = await import("ol/Map")
      const { default: View } = await import("ol/View")
      const { default: TileLayer } = await import("ol/layer/Tile")
      const { default: VectorLayer } = await import("ol/layer/Vector")
      const { default: XYZ } = await import("ol/source/XYZ")
      const { default: VectorSource } = await import("ol/source/Vector")
      const { default: TileGrid } = await import("ol/tilegrid/TileGrid")
      const { Projection, addCoordinateTransforms, transform } = await import("ol/proj")
      const { boundingExtent } = await import("ol/extent")
      const { MousePosition } = await import("ol/control")
      const { default: Zoom } = await import("ol/control/Zoom")
      const { createStringXY } = await import("ol/coordinate")
      const { default: Feature } = await import("ol/Feature")
      const { default: Point } = await import("ol/geom/Point")
      const { default: Style } = await import("ol/style/Style")
      const { default: Icon } = await import("ol/style/Icon")
      const { default: Text } = await import("ol/style/Text")
      const { default: Fill } = await import("ol/style/Fill")
      const { default: Stroke } = await import("ol/style/Stroke")

      const dpiScale = window.devicePixelRatio || 1.0
      const worldMinX = mapProperties.minRegionX * 512
      const worldMinY = mapProperties.minRegionZ * 512
      const worldWidth = (mapProperties.maxRegionX + 1 - mapProperties.minRegionX) * 512
      const worldHeight = (mapProperties.maxRegionZ + 1 - mapProperties.minRegionZ) * 512
      const worldTileSize = 256
      const worldMaxZoomFactor = Math.pow(2, mapProperties.maxZoom)

      const mapExtent = boundingExtent([
        [worldMinX * worldMaxZoomFactor, -(worldMinY + worldHeight) * worldMaxZoomFactor],
        [(worldMinX + worldWidth) * worldMaxZoomFactor, -worldMinY * worldMaxZoomFactor],
      ])

      const viewProjection = new Projection({ code: "VIEW", units: "pixels" })
      const dataProjection = new Projection({ code: "DATA", units: "pixels" })
      viewProjRef.current = viewProjection
      dataProjRef.current = dataProjection

      addCoordinateTransforms(
        viewProjection, dataProjection,
        (c: number[]) => [c[0], -c[1]],
        (c: number[]) => [c[0], -c[1]]
      )

      const mapZoomLevels = mapProperties.maxZoom - mapProperties.minZoom
      const resolutions = new Array(mapZoomLevels + 1)
      for (let z = 0; z < mapZoomLevels + 1; ++z) {
        resolutions[mapZoomLevels - z] = (Math.pow(2, z) * dpiScale) / worldMaxZoomFactor
      }

      const tileGrid = new TileGrid({
        extent: mapExtent, origin: [0, 0], resolutions, tileSize: worldTileSize / dpiScale,
      })

      const unminedLayer = new TileLayer({
        source: new XYZ({
          projection: viewProjection, tileGrid, tilePixelRatio: dpiScale,
          tileSize: worldTileSize / dpiScale,
          tileUrlFunction(coordinate: number[]) {
            const worldZoom = -(mapZoomLevels - coordinate[0]) + mapProperties.maxZoom
            const wf = Math.pow(2, worldZoom)
            const minX = Math.floor(worldMinX * wf / worldTileSize)
            const minY = Math.floor(worldMinY * wf / worldTileSize)
            const maxX = Math.ceil((worldMinX + worldWidth) * wf / worldTileSize) - 1
            const maxY = Math.ceil((worldMinY + worldHeight) * wf / worldTileSize) - 1
            const tx = coordinate[1], ty = coordinate[2]
            const bs = worldTileSize / wf
            const bp = { x: tx * bs, z: ty * bs }
            const has = () => {
              const rp = { x: Math.floor(bp.x / 512), z: Math.floor(bp.z / 512) }
              const rs = Math.ceil(bs / 512)
              for (let x = rp.x; x < rp.x + rs; x++)
                for (let z = rp.z; z < rp.z + rs; z++) {
                  const g = { x: Math.floor(x / 32), z: Math.floor(z / 32) }
                  const rm = regions.find(e => e.x === g.x && e.z === g.z)
                  if (rm) {
                    const rx = x - g.x * 32, rz = z - g.z * 32
                    const b = rm.m[Math.floor((rz * 32 + rx) / 32)]
                    if (b & (1 << ((rz * 32 + rx) % 32))) return true
                  }
                }
              return false
            }
            if (tx >= minX && ty >= minY && tx <= maxX && ty <= maxY && has())
              return `${PROXY}/tiles/zoom.{z}/{xd}/{yd}/tile.{x}.{y}.${mapProperties.imageFormat}`
                .replace("{z}", String(worldZoom))
                .replace("{yd}", String(Math.floor(ty / 10)))
                .replace("{xd}", String(Math.floor(tx / 10)))
                .replace("{y}", String(ty))
                .replace("{x}", String(tx))
            return undefined
          },
        }),
      })

      class CustomZoom extends Zoom {
        constructor() {
          super({
            className: "ol-custom-zoom",
            zoomInLabel: "+", zoomOutLabel: "−",
            zoomInTipLabel: "", zoomOutTipLabel: "",
            delta: 1, duration: 250,
          })
        }
      }

      const map = new Map({
        target: mapRef.current!,
        controls: [
          new CustomZoom(),
          new MousePosition({
            coordinateFormat: createStringXY(0),
            projection: dataProjection,
            className: "ol-custom-mouse-position",
          }),
        ],
        layers: [unminedLayer],
        view: new View({
          center: [0, 0], extent: mapExtent, projection: viewProjection,
          resolutions: tileGrid.getResolutions(),
          maxZoom: mapZoomLevels,
          zoom: mapZoomLevels - mapProperties.maxZoom,
          constrainResolution: true, showFullExtent: true, constrainOnlyCenter: true,
        }),
      })

      const markerLayers: any[] = []
      ;(map as any)._markerLayers = markerLayers

      function addMarker(layer: any) {
        map.addLayer(layer)
        markerLayers.push(layer)
      }

      function createMarkersLayer(markers: MapProperties["markers"]) {
        const features = []
        for (const item of markers) {
          const feature = new Feature({
            geometry: new Point(transform([item.x, item.z], dataProjection, viewProjection)),
          })
          const style = new Style()
          if (item.image) {
            style.setImage(new Icon({
              src: item.image === "steve.png" ? `${ASSETS}/icon/player.png` : item.image,
              anchor: item.imageAnchor || [0.5, 0.5], scale: item.imageScale || 1,
            }))
          }
          if (item.text) {
            style.setText(new Text({
              text: item.text,
              font: item.font || ".65rem Minecraft, Unifont, system-ui",
              offsetX: item.offsetX || 0, offsetY: item.offsetY || 0,
              fill: new Fill({ color: "#ffffff" }),
              padding: [3, 6, 3, 6],
              stroke: new Stroke({ color: "#000000", width: 4 }),
            }))
          }
          feature.setStyle(style)
          features.push(feature)
        }
        return new VectorLayer({ source: new VectorSource({ features }) })
      }

      if (mapProperties.markers?.length) addMarker(createMarkersLayer(mapProperties.markers))

      const pollPlayerMarkers = async () => {
        try {
          const res = await fetch(`${PROXY}/doge/getPlayerMarkers`)
          const data = await res.json()
          const markers = data.markers || data
          if ((map as any)._playerLayer) {
            const idx = markerLayers.indexOf((map as any)._playerLayer)
            if (idx >= 0) markerLayers.splice(idx, 1)
            map.removeLayer((map as any)._playerLayer)
          }
          if (markers?.length) {
            const layer = createMarkersLayer(markers)
            map.addLayer(layer); (map as any)._playerLayer = layer
            markerLayers.push(layer)
          }
          setTimeout(pollPlayerMarkers, 1000)
        } catch { setTimeout(pollPlayerMarkers, 5000) }
      }
      pollPlayerMarkers()

      ;(async () => {
        try {
          const res = await fetch(`${PROXY}/doge/getPlaceMarkers`)
          const data = await res.json()
          if (data?.length) addMarker(createMarkersLayer(data))
        } catch { /* ignore */ }
      })()

      mapInstance.current = map
    }

    initMap()
    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined)
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <>
      <style>{`
        .ol-custom-mouse-position {
          position: absolute; bottom: 8px; left: 8px;
          font-family: "Minecraft", "Unifont", monospace;
          font-size: 13px; color: #d4d4d4;
          background: rgba(0,0,0,0.55); padding: 4px 10px;
          border-radius: 4px; pointer-events: none;
          user-select: none; white-space: nowrap; z-index: 10;
          backdrop-filter: blur(2px);
        }
        .ol-custom-zoom {
          position: absolute; top: 12px; left: 12px; z-index: 20;
          display: flex; flex-direction: column; gap: 2px;
        }
        .ol-custom-zoom button {
          width: 36px; height: 36px; font-size: 20px; font-weight: 600;
          line-height: 1; color: #e0e0e0;
          background: rgba(30,31,34,0.75); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s ease; backdrop-filter: blur(4px);
          user-select: none;
        }
        .ol-custom-zoom button:hover { background: rgba(60,62,68,0.85); border-color: rgba(255,255,255,0.15); }
        .ol-custom-zoom button:active { transform: scale(0.93); background: rgba(40,42,46,0.9); }
        .ol-attribution { display: none !important; }
      `}</style>
      <div ref={mapRef} className="w-full h-full" style={{ imageRendering: "pixelated" }} />
    </>
  )
})

MapView.displayName = "MapView"
export default MapView
