---
layout: home
hero:
  name: "DogeLake-东方犬明湖"
  text: "服务器官网"
  tagline: <div id="json-data">加载中...</div>
  image:
    src: /DOGELAKE_1024x.png
    alt: DOGELAKE
  actions:
    - theme: brand
      text: 开始游戏
      link: /startplay
    - theme: alt
      text: 卫星地图
      link: http://map.dogelake.cn/map
    - theme: alt
      text: 地图画自助上传
      link: /map

features:
  - icon: 🎥
    title: 宣传信息
    details: 点击查看我们最新发布的宣传视频与宣传帖！
    link: /publicity
  - icon: 📷
    title: 画廊
    details: 服务器美景一览！
    link: /gallery
  - icon: 📄
    title: 更新日志
    details: 看看在服务器中最近的一次更新干了什么！
    link: /updatelog
  - icon: ⚒️
    title: 客户端
    details: 客户端/启动器（DEMO）下载！
    link: /client
---
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  fetch('https://motdbe.blackbe.work/api?host=play.dogelake.cn:29033')
    .then(response => response.json())
    .then(data => {
      const online = data['online']
      const max = data['max']
      const version = data['version']
      document.getElementById('json-data').innerText = version + " " + online + "/" + max
    })
    .catch(error => {
      console.error('Error loading JSON data:', error)
    })
})
</script>