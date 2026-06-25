// Cloudflare Worker — map.dogelake.cn → dogelake.cn/map 透明代理
// 访问 map.dogelake.cn 时，实际展示 dogelake.cn/map 的内容
// URL 地址栏保持显示 map.dogelake.cn

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const path = url.pathname === "/" ? "" : url.pathname

    // 从主站 /map 目录获取内容
    const target = `https://dogelake.cn/map${path}${url.search}`

    const response = await fetch(target)

    // 透传响应，不做任何修改
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })
  },
}
