"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import {
    PreviewLinkCard,
    PreviewLinkCardTrigger,
    PreviewLinkCardContent,
    PreviewLinkCardImage,
} from '@/components/animate-ui/components/radix/preview-link-card'
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tools: { title: string; href: string; description: string }[] = [
    {
        title: "格式化字符",
        href: "/tools/mc-format",
        description: "快速生成含我的世界 § 格式化代码的文字。",
    },
    {
        title: "在线卫星地图",
        href: "/map",
        description: "使用 OpenLayers 浏览服务器全貌。",
    },
    {
        title: "地图画上传",
        href: "/",
        description: "维护中...",
    }
]

const community: { title: string; href: string; description: string }[] = [
    {
        title: "QQ 群",
        href: "https://qm.qq.com/q/t9VmSLnPMu",
        description: "加入官方 QQ 群，与我们互动。",
    },
    {
        title: "QQ 频道",
        href: "https://pd.qq.com/s/xn0nkadr",
        description: "加入官方 QQ 频道，发帖，交流，获取经验。",
    },
    {
        title: "MineBBS",
        href: "https://minebbs.com/",
        description: "专属板块 暂时还没有...",
    }
]

const links: { title: string; href: string; description: string }[] = [
    {
        title: "BiliBili官号",
        href: "https://space.bilibili.com/3546630286477615",
        description: "查看更多宣传信息。",
    },
    {
        title: "MineBBS宣传贴",
        href: "https://minebbs.com/",
        description: "正在修改...",
    },
    {
        title: "KlpBBS宣传贴",
        href: "https://pd.qq.com/s/xn0nkadr",
        description: "正在修改...",
    },
    {
        title: "MCNav",
        href: "https://www.mcnav.net/",
        description: "综合型的我的世界实用导航网站",
    },
]

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                        <div className="line-clamp-2 text-muted-foreground">{children}</div>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <SheetClose asChild>
            <Link
                href={href}
                className="block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
                {children}
            </Link>
        </SheetClose>
    )
}

function MobileNavSection({ title, items }: { title: string; items: { title: string; href: string }[] }) {
    return (
        <div>
            <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {title}
            </p>
            {items.map((item) => (
                <MobileNavLink key={item.title} href={item.href}>
                    {item.title}
                </MobileNavLink>
            ))}
        </div>
    )
}

export default function Navigation() {
    const pathname = usePathname()
    return (
        <>
            <div
                className={cn(
                    "absolute inset-0 -z-10",
                    pathname === "/"
                        ? "bg-white/70 backdrop-blur-xl dark:bg-black/70"
                        : "bg-background"
                )}
            />
            {/* 桌面端导航 */}
            <div className="hidden md:grid grid-cols-3 w-full items-center">
                {/* 左侧：品牌名 */}
                <div className="flex justify-start">
                    <Link
                        href="/"
                        className="font-heading text-sm font-semibold tracking-tight"
                    >
                        DogeLake
                    </Link>
                </div>

                {/* 中间：导航菜单 */}
                <div className="flex justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/">主页</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <PreviewLinkCard openDelay={5} closeDelay={100} href="https://www.dogelake.cn/">
                                    <PreviewLinkCardTrigger className={navigationMenuTriggerStyle()}>文档</PreviewLinkCardTrigger>
                                    <PreviewLinkCardContent side="bottom" sideOffset={15}>
                                        <PreviewLinkCardImage alt="Preview link card content" />
                                    </PreviewLinkCardContent>
                                </PreviewLinkCard>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>工具</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="w-96">
                                        {tools.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>社群</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="w-96">
                                        {community.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>相关链接</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="w-96">
                                        {links.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* 右侧：主题切换按钮 */}
                <div className="flex justify-end items-center">
                    <AnimatedThemeToggler className={navigationMenuTriggerStyle()} />
                </div>
            </div>

            {/* 移动端导航 */}
            <div className="grid grid-cols-3 md:hidden w-full items-center">
                {/* 左侧：菜单按钮 */}
                <div className="flex justify-start">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="-ml-3">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">打开导航</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <SheetHeader>
                                <SheetTitle>导航</SheetTitle>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto space-y-2 py-2">
                                <MobileNavLink href="/">主页</MobileNavLink>

                                <MobileNavLink href="https://www.dogelake.cn/">文档</MobileNavLink>

                                <MobileNavSection title="工具" items={tools} />
                                <MobileNavSection title="社群" items={community} />
                                <MobileNavSection title="相关链接" items={links} />
                            </div>

                            <div className="border-t pt-4 pb-2 flex justify-center">
                                {pathname !== "/" && <AnimatedThemeToggler />}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* 中间：品牌名 */}
                <Link
                    href="/"
                    className="text-center font-heading text-sm font-semibold tracking-tight"
                >
                    DogeLake
                </Link>

                {/* 右侧：主题切换按钮 */}
                <div className="flex justify-end">
                    <AnimatedThemeToggler />
                </div>
            </div>
        </>
    )
}