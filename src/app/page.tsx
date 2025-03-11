import { ArrowRight, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="mx-auto flex-1">
        <section className="container py-12 md:py-24">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl leading-tight font-bold tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              새발동 <span className="text-primary">게임 통계</span>
            </h1>
            <p className="text-muted-foreground max-w-[750px] text-lg sm:text-xl">
              새발동 게임 기록과 참여인원의 통계를 한눈에 확인하세요.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <Link
              href="/timeline"
              className="group border-border/50 bg-card hover:border-primary/50 hover:shadow-primary/5 relative overflow-hidden rounded-lg border p-6 text-left shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <Calendar className="text-primary mb-4 h-8 w-8" />
                  <h3 className="text-2xl font-bold">게임 기록</h3>
                  <p className="text-muted-foreground mt-2">
                    날짜별 게임 기록을 확인해보세요.
                  </p>
                </div>
                <ArrowRight className="text-primary mt-4 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link
              href="/streamers"
              className="group border-border/50 bg-card hover:border-primary/50 hover:shadow-primary/5 relative overflow-hidden rounded-lg border p-6 text-left shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <Users className="text-primary mb-4 h-8 w-8" />
                  <h3 className="text-2xl font-bold">스트리머</h3>
                  <p className="text-muted-foreground mt-2">
                    참여 스트리머들의 게임 참여 횟수와 통계를 확인해보세요.
                  </p>
                </div>
                <ArrowRight className="text-primary mt-4 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
