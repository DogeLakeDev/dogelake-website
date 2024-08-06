---
prev: false
next: false
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const klpbbs =  {svg:'<svg xmlns="http://www.w3.org/2000/svg" width="1.01em" height="1em" viewBox="0 0 1025 1024"><path fill="currentColor" d="M896.428 1024h-768q-53 0-90.5-37.5T.428 896V128q0-53 37.5-90.5t90.5-37.5h768q53 0 90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5m0-832h-256v256h-256V192h-256v256h256v128h-128v256h128V704h256v128h128V576h-128V448h256z"/></svg>'};

const bilibili = {svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.813 4.653h.854q2.266.08 3.773 1.574Q23.946 7.72 24 9.987v7.36q-.054 2.266-1.56 3.773c-1.506 1.507-2.262 1.524-3.773 1.56H5.333q-2.266-.054-3.773-1.56C.053 19.614.036 18.858 0 17.347v-7.36q.054-2.267 1.56-3.76t3.773-1.574h.774l-1.174-1.12a1.23 1.23 0 0 1-.373-.906q0-.534.373-.907l.027-.027q.4-.373.92-.373t.92.373L9.653 4.44q.107.106.187.213h4.267a.8.8 0 0 1 .16-.213l2.853-2.747q.4-.373.92-.373c.347 0 .662.151.929.4s.391.551.391.907q0 .532-.373.906zM5.333 7.24q-1.12.027-1.88.773q-.76.748-.786 1.894v7.52q.026 1.146.786 1.893t1.88.773h13.334q1.12-.026 1.88-.773t.786-1.893v-7.52q-.026-1.147-.786-1.894t-1.88-.773zM8 11.107q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q0-.56.386-.947q.387-.386.947-.386m8 0q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q.025-.586.4-.96q.373-.373.933-.373"/></svg>'};

const download = {svg:'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z"/></svg>'}
const members = [
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=368364534&s=100',
    name: '体委（）',
    title: '服主',
    links: [
      { icon: 'github', link: 'https://github.com/ENIACJushi/' },
      { icon: klpbbs, link: 'https://klpbbs.com/space-uid-277188.html' },
      { icon: bilibili, link: 'https://space.bilibili.com/83539357' }
    ]
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=954853616&s=100',
    name: '安普反物质',
    title: '拉腐竹进MC巨坑，服务器诞生前和腐竹一起建设，你服第一位管理，现任人民服务员（',
    links: [
      { icon: bilibili, link: 'https://b23.tv/uYr3WsD' }
    ]
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1156592371&s=100',
    name: 'piAno',
    title: '潜水 快毕业了在找工作',
    links: []
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3575057858&s=100',
    name: '不拖更（确信）',
    title: '工程管理/活动策划' + '\n' + '“对于我而言，犬明湖就像是第二个家”' + '\n' + '没什么可贴的链接还是给大家整点福利吧' + '\n' + '另外求求你们来玩犬明湖，只要是我能做到的我什么都愿意做！',
    links: [
      { icon: download, link: 'https://vlink.cc/yuzho' }
    ]
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2131595226&s=100',
    name: 'Shiroha.7z（七罪）',
    title: '喜欢吃，设计，打游戏，然后很懒。',
    links: [
      { icon: 'github', link: 'https://github.com/Tanya7z' },
      { icon: bilibili, link: 'https://b23.tv/4DN4nP1' },
      { icon: klpbbs, link: 'https://www.minebbs.com/members/6587/' },
    ]
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1920749072&s=100',
    name: 'HeyBiblee',
    title: 'Robot大使兼服务器运维',
    links: []
  },
]
</script>

# 关于
> Hi，我们是东方犬明湖，一个纯基岩版的公益服务器。 

## [什么是东方Project?](https://b23.tv/SxcLFtS)
东方犬明湖最初便是以东方Project为主题，现在你在服务器中还能看到不少与东方有关的建筑！

## 我们欢迎每一个热爱MC的你
来到此服务器，我们不需要你有什么特殊的技能、知识等条件。这里是一个海纳百川的社区，有在建筑方面有特长的玩家，也有生电，或专精生存的玩家。这个世界等待着你的添砖加瓦，在各位玩家的努力下，请看着我们一步步变得更好(ง•̀_•́)ง！

## 为什么是基岩版
基岩版服务器似乎从来没被看好，不成熟的社区，封闭的接口，优化很差的BDS。但是它的优点仍然不容小看觑，仅凭多平台这一点就造成基岩版玩家众多。如今，基岩社区也逐步发展，行为包接口的增多、ScriptAPI、LeviLamina的发展为我们扩展了一大片可能性，东方犬明湖现在也是基岩社区的开拓者。  
长路漫漫亦灿灿，相信DogeLake会变得更强！

## 一个功能性的官网
这个官网是用vitepress部署的，它几乎只用于搭建文档和博客。第一代官网和其他几乎所有的服务器官网一样，是用传统的html+css搭建的。虽有华丽的特效与大量图片，但网站由于托管在github-page，加载速度大打折扣；并且我发现网站的主要应服务于功能，玩家常用的功能放在了侧边栏中，主页的一些介绍其实也毫无用处甚至是成为累赘。  
第二代官网改为集中于功能性，但还是用html+css，维护起来并不方便。于是现在你所看到的是第三代官网，使用了加载速度极快的vitepress，主要的内容都用markdown编写，维护起来也很方便，这应该是官网的最后一个版本了。*我也终于可以把更新日志放在官网啦！*  
至于想了解服务器，下面不是有宣传信息嘛～
除了给玩家提供服务，东方犬明湖也有很多除了管理以外开发者，希望我们能为您提供到帮助，也是为基岩社区出一份力！

## 我们是谁？
<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      DogeLake
    </template>
    <template #lead>
      管理人员
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>

## 捐赠
![donation](/Donation.jpg)  

作者/Shiroha.7z