// Cloudflare Worker — map.dogelake.cn → dogelake.cn/map 透明代理
// 访问 map.dogelake.cn 时，实际展示 dogelake.cn/map 的内容
// URL 地址栏保持显示 map.dogelake.cn
// 注意：仅页面入口（/）加 /map 前缀，静态资源直接从主站根目录读取

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const path = url.pathname

    // 只有根路径 / 才加 /map 前缀（获取页面 HTML）
    // 其他路径（/_next/static/*, /map-assets/* 等）直接从主站根目录取
    const target =
      path === "/"
        ? `https://dogelake.cn/map/`
        : `https://dogelake.cn${path}${url.search}`

    const response = await fetch(target)

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })
  },
}
