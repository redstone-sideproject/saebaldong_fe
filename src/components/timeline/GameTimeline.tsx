'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Card, CardContent } from '@/components/ui/card'
import { transDateFormat } from '@/lib/date'
import { gacta } from '@/lib/gacta'
import { GA_CTA_EVENTS } from '@/types/constants'
import { Timeline } from '@/types/timeline'

interface IGameTimelineProps {
  data: Timeline
}

function GameTimeline({ data }: IGameTimelineProps) {
  const router = useRouter()

  const handleStreamerClick = (streamerId: number) => {
    if (!streamerId) {
      return
    }
    router.push(`/streamers/${streamerId}`)
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        {/* 날짜 */}
        <h3 className="text-primary mb-4 flex items-center text-lg font-bold">
          <span className="bg-primary mr-2 inline-block h-2 w-2 rounded-full"></span>
          {transDateFormat(data.date)}
        </h3>

        {/* 카드 컴포넌트 */}

        <div className="space-y-4">
          <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
            <CardContent className="px-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-medium">{data.title}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {data.description}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-muted-foreground mb-2 text-sm">
                  참여 스트리머
                </p>

                <div className="flex flex-wrap gap-2">
                  {data.participations.map((participation) => (
                    <div
                      key={crypto.randomUUID()}
                      className="hover:border-primary flex cursor-pointer items-center gap-1.5 rounded-full border p-1"
                      onClick={() => {
                        handleStreamerClick(participation.streamer.streamerId)
                        gacta(GA_CTA_EVENTS.onClickStreamerDetailCTA)
                      }}
                    >
                      <Image
                        className="rounded-full"
                        src={participation.streamer.profileImageUrl}
                        width={24}
                        height={24}
                        alt={participation.streamer.nickname}
                      />
                      <span className="text-sm">
                        {participation.streamer.nickname}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default GameTimeline
