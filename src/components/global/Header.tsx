'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
  const pathname = usePathname()

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center p-4">
        <Link
          href="/"
          className="text-primary text-xl font-bold"
        >
          새발동 <span className="text-foreground">게임 통계</span>
        </Link>
        <nav className="ml-auto flex gap-4">
          <NavLink
            href="/"
            pathname={pathname}
          >
            홈
          </NavLink>
          <NavLink
            href="/timeline"
            pathname={pathname}
          >
            타임라인
          </NavLink>

          <div className="group">
            <NavLink
              href="/record"
              pathname={pathname}
            >
              기록실
            </NavLink>
            <div className="bg-background absolute hidden flex-col items-center gap-y-1 rounded-2xl border px-4 py-2 group-hover:flex">
              <NavLink
                href="/record"
                pathname={pathname}
              >
                전체
              </NavLink>
              <NavLink
                href="/record/party"
                pathname={pathname}
              >
                5인큐
              </NavLink>
              <NavLink
                href="/record/custom"
                pathname={pathname}
              >
                내전
              </NavLink>
            </div>
          </div>
          <NavLink
            href="/streamers"
            pathname={pathname}
          >
            스트리머
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

interface INavLinkProps {
  href: string
  pathname: string
  children: React.ReactNode
}

function NavLink({ href, pathname, children }: INavLinkProps) {
  const isActive = href === pathname

  return (
    <Link
      href={href}
      className={`text-foreground/60 hover:text-primary ${isActive ? 'text-primary font-medium' : ''}`}
    >
      {children}
    </Link>
  )
}

export default Header
