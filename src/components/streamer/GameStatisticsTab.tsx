import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { IStreamerProfile } from '@/types/streamer'

interface IGameStatisticsTabProps {
  data: IStreamerProfile
}

function GameStatisticsTab({ data }: IGameStatisticsTabProps) {
  console.log(data.monthlyParticipation)
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="text-lg">참여 통계</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-medium">참여도</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">전체 참여도</span>
                <span>{(data.participationRatio * 100).toFixed(1)}%</span>
              </div>
              <Progress
                value={data.participationRatio * 100}
                className="h-2"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">월별 참여 게임 수</h3>
            <div className="grid grid-cols-1 gap-2">
              {data.monthlyParticipation.map(({ yearMonth, count }) => {
                console.log(yearMonth)
                const [year, month] = yearMonth.split('-')

                return (
                  <div
                    key={`${year}-${month}`}
                    className="flex items-center gap-2"
                  >
                    <div className="w-24 text-sm">
                      {year}년 {month}월
                    </div>
                    <Progress
                      value={100}
                      className="h-2 flex-1"
                    />
                    <div className="w-8 text-right text-sm font-medium">
                      {count}회
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">함께 플레이한 스트리머</h3>
            <div className="flex flex-wrap gap-2">
              {data.coPlayers.map((streamer) => (
                <Badge
                  key={streamer.nickname}
                  variant="outline"
                  className="bg-secondary/30 border-border/30"
                >
                  {streamer.nickname} ({streamer.count}회)
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GameStatisticsTab
