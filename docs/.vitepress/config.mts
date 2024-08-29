import { defineConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
  title: "DogeLake-东方犬明湖",
  description: "服务器官网",
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.png',
    nav: [ ],

    sidebar:  sidebarGuide(),
    // [
    //   {
    //     text: '菜单',
    //     items: [
    //   { text: '主页', link: '/' },

    //   { text: '开始游戏', link: '/startplay' },
    //   { text: '客户端', link: '/guide/client' },

    //   { text: '卫星地图', link: 'https://map.dogelake.cn/map' },
    //   { text: '地图画自助上传', link: '/map' },

    //   { text: '宣传信息', link: '/publicity' },
    //   { text: '更新日志', link: '/updatelog' },
      
    //   { text: '画廊', link: '/gallery' },

    //   { text: '关于', link: '/about' },
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Tanya7z/DogeLake-Website' },
      { icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673c.54.065 2.103-2.472 2.103-2.472c0 1.469.756 3.387 2.394 4.771c-.612.188-1.363.479-1.845.835c-.434.32-.379.646-.301.778c.343.578 5.883.369 7.482.189c1.6.18 7.14.389 7.483-.189c.078-.132.132-.458-.301-.778c-.483-.356-1.233-.646-1.846-.836c1.637-1.384 2.393-3.302 2.393-4.771c0 0 1.563 2.537 2.103 2.472c.251-.03.581-1.39-.438-4.673"/></svg>' }, link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Hr_WEyTZO9BA8lxRig6jcCqagrZWa7NO&authKey=lEXfyfr0oMJzNhvLxBpT78grOtT6yWqRVvNhrpa' },
      { icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.813 4.653h.854q2.266.08 3.773 1.574Q23.946 7.72 24 9.987v7.36q-.054 2.266-1.56 3.773c-1.506 1.507-2.262 1.524-3.773 1.56H5.333q-2.266-.054-3.773-1.56C.053 19.614.036 18.858 0 17.347v-7.36q.054-2.267 1.56-3.76t3.773-1.574h.774l-1.174-1.12a1.23 1.23 0 0 1-.373-.906q0-.534.373-.907l.027-.027q.4-.373.92-.373t.92.373L9.653 4.44q.107.106.187.213h4.267a.8.8 0 0 1 .16-.213l2.853-2.747q.4-.373.92-.373c.347 0 .662.151.929.4s.391.551.391.907q0 .532-.373.906zM5.333 7.24q-1.12.027-1.88.773q-.76.748-.786 1.894v7.52q.026 1.146.786 1.893t1.88.773h13.334q1.12-.026 1.88-.773t.786-1.893v-7.52q-.026-1.147-.786-1.894t-1.88-.773zM8 11.107q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q0-.56.386-.947q.387-.386.947-.386m8 0q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q.025-.586.4-.96q.373-.373.933-.373"/></svg>'}, link: 'https://b23.tv/1cAIF9k' }
    ],
    
    footer: {
      message: '<a href="https://beian.miit.gov.cn" id="beian" target="_blank">闽ICP备2023018495号-2</a>',
      copyright: 'Copyright © 2024 东方犬明湖'
    }
  }
})

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    { text: '返回主页', link: '/' },
    {
      text: '导引',
      collapsed: false,
      items: [
        { text: '开始游戏', link: '/guide/startplay' },
        { text: '客户端', link: '/guide/client' }
      ]
    },
    {
      text: '实用工具',
      collapsed: true,
      items: [
        { text: '卫星地图', link: 'https://map.dogelake.cn/map' },
        { text: '地图画自助上传', link: '/tools/map' }
      ]
    },
    {
      text: '管理事务',
      collapsed: true,
      items: [
        { text: '管理守则', link: '/admin/op' },
        { text: '更新日志', link: '/admin/updatelog' },
      ]
    },
    { text: '宣传信息', link: '/others/publicity' },
    { text: '关于', link: '/others/about' },
  ]
}