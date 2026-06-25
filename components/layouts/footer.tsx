import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* 版权信息 */}
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            <p>© {new Date().getFullYear()} DogeLake. 保留所有权利。</p>
          </div>

          {/* 备案信息 */}
          <div className="flex flex-col items-center gap-1 text-sm sm:items-center">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              闽ICP备2023018495号-2
            </a>
            <a
              href="https://icp.gov.moe/?keyword=20250122"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              萌ICP备20250122号
            </a>
          </div>

          {/* 相关链接 */}
          <Link
            href="https://github.com/your-org/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="sr-only">GitHub</span>
          </Link>
        </div>

        {/* 免责声明 */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          免责声明：本站与Mojang以及微软公司没有从属关系。
        </p>
      </div>
    </footer>
  )
}