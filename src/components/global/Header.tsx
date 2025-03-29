'use client'

import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
        <nav className="ml-auto hidden gap-4 md:flex">
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

          <DropdownMenu>
            <DropdownMenuTrigger>
              <NavLink
                href="/record"
                pathname={pathname}
              >
                기록실
              </NavLink>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NavLink
                href="/record"
                pathname={pathname}
              >
                <DropdownMenuItem className="cursor-pointer">
                  전체 기록실
                </DropdownMenuItem>
              </NavLink>
              <DropdownMenuSeparator />
              <NavLink
                href="/record/party"
                pathname={pathname}
              >
                <DropdownMenuItem className="cursor-pointer">
                  5인큐
                </DropdownMenuItem>
              </NavLink>
              <DropdownMenuSeparator />
              <NavLink
                href="/record/custom"
                pathname={pathname}
              >
                <DropdownMenuItem className="cursor-pointer">
                  내전
                </DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavLink
            href="/streamers"
            pathname={pathname}
          >
            스트리머
          </NavLink>
        </nav>

        <nav className="ml-auto flex gap-4 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NavLink
                href="/"
                pathname={pathname}
              >
                <DropdownMenuItem className="cursor-pointer">
                  홈
                </DropdownMenuItem>
              </NavLink>
              <DropdownMenuSeparator />
              <NavLink
                href="/timeline"
                pathname={pathname}
              >
                <DropdownMenuItem className="cursor-pointer">
                  타임라인
                </DropdownMenuItem>
              </NavLink>
              <DropdownMenuSeparator />

              <NavLink
                href="/record"
                pathname={pathname}
              >
                <DropdownMenuItem className="cursor-pointer">
                  전체 기록실
                </DropdownMenuItem>
              </NavLink>
              <DropdownMenuSeparator />
              <NavLink
                href="/record/party"
                pathname={pathname}
              >
                <DropdownMenuItem className="cursor-pointer">
                  5인큐
                </DropdownMenuItem>
              </NavLink>
              <DropdownMenuSeparator />
              <NavLink
                href="/record/custom"
                pathname={pathname}
              >
                <DropdownMenuItem className="cursor-pointer">
                  내전
                </DropdownMenuItem>
              </NavLink>
              <DropdownMenuSeparator />
              <NavLink
                href="/streamers"
                pathname={pathname}
              >
                <DropdownMenuItem className="cursor-pointer">
                  스트리머
                </DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
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
