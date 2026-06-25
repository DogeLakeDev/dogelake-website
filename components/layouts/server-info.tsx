"use client";

import { WobbleCard } from "@/components/ui/wobble-card"

const timeline = [
  { date: "2022 Q1", title: "服务器成立" },
  { date: "2022 Q3", title: "首个生存周目开启" },
  { date: "2023 Q2", title: "玩家突破 300 人" },
  { date: "2024 Q1", title: "引入领地与经济系统" },
  { date: "2025 Q1", title: "跨平台互通上线" },
]

export default function ServerInfo() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">服务器简介</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            东方犬明湖 (DogeLake) 是一个以 Minecraft Bedrock Edition 为基础的
            原版生存服务器。我们致力于为玩家提供一个稳定、公平、有趣的
            多人生存环境，支持跨平台互联，让不同设备的玩家都能一同畅玩。
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[300px] bg-blue-900">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold text-white">游玩人数</h3>
              <p className="mt-3 text-5xl font-extrabold text-white">500+</p>
              <p className="mt-1 text-blue-200">常驻活跃玩家</p>
              <p className="mt-4 text-sm leading-relaxed text-blue-100">
                我们拥有一个充满活力的玩家社区，每天都有新朋友加入。
                无论是生存建筑、红石科技还是休闲聊天，这里总有适合你的伙伴。
              </p>
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-purple-900">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold text-white">运营时间</h3>
              <p className="mt-3 text-5xl font-extrabold text-white">3年+</p>
              <p className="mt-1 text-purple-200">稳定运行至今</p>
              <p className="mt-4 text-sm leading-relaxed text-purple-100">
                自 2022 年开服以来，我们始终保持稳定运行，
                持续为玩家提供优质的游戏体验。
              </p>
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-emerald-900">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold text-white">游戏特色</h3>
              <p className="mt-3 text-5xl font-extrabold text-white">原版+</p>
              <p className="mt-1 text-emerald-200">生电 / 建筑 / 红石 / 模组</p>
              <p className="mt-4 text-sm leading-relaxed text-emerald-100">
                在保留原版生存核心体验的基础上，我们引入了辅助插件与
                经济系统，让游戏更加丰富有趣。
              </p>
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[300px] bg-amber-900">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold text-white">发展时间线</h3>
              <div className="mt-4 space-y-3">
                {timeline.map((item) => (
                  <div key={item.date} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-300" />
                      <div className="mt-1 w-px flex-1 bg-amber-700" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-200">{item.date}</p>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WobbleCard>
        </div>
      </div>
    </section>
  )
}
