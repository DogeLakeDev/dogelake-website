import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { FileTextIcon, CodeIcon, ArchiveIcon, UpdateIcon } from "@radix-ui/react-icons"

const features = [
  {
    Icon: FileTextIcon,
    name: "文文新闻",
    description: "玩家投稿的服务器新闻与趣事，记录犬明湖的每一天。",
    href: "/archive/news",
    cta: "阅读更多",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-indigo-900/30 to-transparent" />
    ),
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    Icon: CodeIcon,
    name: "自研作品",
    description: "由玩家和管理团队共同打造的技术成果与项目展示。",
    href: "/projects",
    cta: "浏览作品",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-emerald-900/30 to-transparent" />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: ArchiveIcon,
    name: "存档资料",
    description: "服务器文档、账本、管理守则等各类文献汇总。",
    href: "/archive/docs",
    cta: "查阅资料",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-amber-900/30 to-transparent" />
    ),
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    Icon: UpdateIcon,
    name: "更新日志",
    description: "服务器版本更新与功能变更记录，了解最新变化。",
    href: "/archive/changelog",
    cta: "查看日志",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950/60 via-rose-900/30 to-transparent" />
    ),
    className: "lg:col-span-2 lg:row-span-1",
  },
]

export default function BentoSection() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">探索更多</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            从新闻公告到技术项目，从文献存档到版本更新，一网打尽。
          </p>
        </div>

        <BentoGrid>
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
