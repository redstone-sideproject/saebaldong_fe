import { GamepadIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IStreamerProfile } from '@/types/streamer'

interface IGameListTabProps {
  data: IStreamerProfile
}

function GameListTab({ data }: IGameListTabProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="text-lg">
          참여 게임 ({data.timelines.length}개)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.timelines.length > 0 ? (
          <div className="space-y-4">
            {data.timelines.map((timeline) => (
              <div
                key={timeline.timelineId}
                className="border-border/30 bg-secondary/20 flex items-start gap-3 rounded-md border p-3"
              >
                <div className="my-auto w-14 flex-shrink-0 text-center">
                  <div className="text-muted-foreground text-xs">
                    <span>
                      {new Date(timeline.date).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{timeline.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {timeline.description}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {timeline.participants.map((streamer, idx) => (
                      <Badge
                        key={idx}
                        variant={
                          streamer === data.nickname ? 'default' : 'outline'
                        }
                        className={
                          streamer === data.nickname
                            ? ''
                            : 'bg-secondary/30 border-border/30'
                        }
                      >
                        {streamer}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <GamepadIcon className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
            <p className="text-muted-foreground">참여한 게임이 없습니다.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GameListTab
