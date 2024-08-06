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

const members = [
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=368364534&s=100',
    name: '1',
    title: '服主',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'bilibili', link: 'https://twitter.com/youyuxi' }
    ]
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=954853616&s=100',
    name: '1',
    title: '服主',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'bilibili', link: 'https://twitter.com/youyuxi' }
    ]
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1156592371&s=100',
    name: '1',
    title: '服主',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'bilibili', link: 'https://twitter.com/youyuxi' }
    ]
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3575057858&s=100',
    name: '1',
    title: '服主',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'bilibili', link: 'https://twitter.com/youyuxi' }
    ]
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2131595226&s=100',
    name: '1',
    title: '服主',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'bilibili', link: 'https://twitter.com/youyuxi' }
    ]
  },
    {
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1920749072&s=100',
    name: '1',
    title: '服主',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'bilibili', link: 'https://twitter.com/youyuxi' }
    ]
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