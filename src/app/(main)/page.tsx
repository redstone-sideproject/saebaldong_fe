import { ArrowRight, Calendar, Users, Sword, Swords } from 'lucide-react'
import Link from 'next/link'

import ChangelogModal from '@/components/changelog/ChangelogModal'
import FaqAnswer from '@/components/faq/FaqAnswer'
import JsonLd from '@/components/global/JsonLd'
import { faqList, faqSchema } from '@/constants/structuredData'
import { GAPageView } from '@/hooks/useGAPageView'

export default function Home() {
  return (
    <div className="flex flex-col">
      <JsonLd data={faqSchema} />
      <main className="mx-auto flex-1">
        <section className="container py-12 md:py-24">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <div className="flex w-full justify-end">
              <ChangelogModal />
            </div>
            <h1 className="text-3xl leading-tight font-bold tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              새발동 <span className="text-primary">게임 통계</span>
            </h1>
            <p className="text-muted-foreground max-w-[750px] text-lg sm:text-xl">
              새발동 타임라인과 참여인원의 통계를 한눈에 확인하세요.
            </p>
          </div>

          <section
            aria-label="새발동 소개"
            className="mx-auto mt-8 max-w-[750px] text-center"
          >
            <p className="text-muted-foreground leading-relaxed">
              새발동은 &quot;새벽 발로란트 동아리&quot;의 줄임말로 늦은 밤부터
              시작하여 아침까지 발로란트 경쟁전을 돌리는 치지직 스트리머
              크루입니다. 이 사이트에서 누적 참여 스트리머 수, 게임별 통계,
              타임라인 기록을 제공합니다.
            </p>
          </section>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <Link
              href="/timeline"
              className="group border-border/50 bg-card hover:border-primary/50 hover:shadow-primary/5 relative overflow-hidden rounded-lg border p-6 text-left shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <Calendar className="text-primary mb-4 h-8 w-8" />
                  <h3 className="text-2xl font-bold">타임라인</h3>
                  <p className="text-muted-foreground mt-2">
                    날짜별 타임라인을 확인해보세요.
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
            <Link
              href="/record/party"
              className="group border-border/50 bg-card hover:border-primary/50 hover:shadow-primary/5 relative overflow-hidden rounded-lg border p-6 text-left shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <Sword className="text-primary mb-4 h-8 w-8" />
                  <h3 className="text-2xl font-bold">5인큐</h3>
                  <p className="text-muted-foreground mt-2">
                    새발동에서 진행한 5인큐 기록을 확인 할 수 있어요.
                  </p>
                </div>
                <ArrowRight className="text-primary mt-4 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            <Link
              href="/record/custom"
              className="group border-border/50 bg-card hover:border-primary/50 hover:shadow-primary/5 relative overflow-hidden rounded-lg border p-6 text-left shadow-md transition-all hover:shadow-lg"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <Swords className="text-primary mb-4 h-8 w-8" />
                  <h3 className="text-2xl font-bold">내전</h3>
                  <p className="text-muted-foreground mt-2">
                    여러 스트리머들이 참여한 내전 기록을 확인 할 수 있어요.
                  </p>
                </div>
                <ArrowRight className="text-primary mt-4 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          <section
            aria-labelledby="faq-heading"
            className="mx-auto mt-16 max-w-[750px]"
          >
            <h2
              id="faq-heading"
              className="mb-6 text-center text-2xl font-bold tracking-tight"
            >
              자주 묻는 질문
            </h2>
            <dl className="flex flex-col gap-4">
              {faqList.map((faq) => (
                <div
                  key={faq.question}
                  className="border-border/50 bg-card rounded-lg border p-5 text-left shadow-sm"
                >
                  <dt className="font-semibold">{faq.question}</dt>
                  <dd className="text-muted-foreground mt-2 leading-relaxed">
                    <FaqAnswer answer={faq.answer} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
      </main>
      <GAPageView />
    </div>
  )
}
