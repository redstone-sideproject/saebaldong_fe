import { Calendar, Clock, GamepadIcon, Trophy } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { IStreamerProfile, streamerRoleKeyToValue } from '@/types/streamer'

interface IStreamerProfileProps {
  data: IStreamerProfile
}

function StreamerProfile({ data }: IStreamerProfileProps) {
  return (
    <Card className="border-border/50 bg-card w-full md:w-80">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="border-primary/20 mb-4 h-24 w-24 border-4">
            <AvatarImage
              src={data.profileImageUrl}
              alt={`${data.nickname}`}
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {data.nickname}
            </AvatarFallback>
          </Avatar>

          <h1 className="mb-1 text-2xl font-bold">{data.nickname}</h1>
          <Badge
            variant="outline"
            className="bg-secondary border-border/50 mb-4"
          >
            {streamerRoleKeyToValue[data.role] || '스트리머'}
          </Badge>

          <div className="mb-6 grid w-full grid-cols-3 gap-4 text-center">
            <div className="flex flex-col">
              <span className="text-primary text-2xl font-bold">
                {data.totalParticipations}
              </span>
              <span className="text-muted-foreground text-xs">참여 횟수</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary text-2xl font-bold">
                {data.totalParticipationTime}
              </span>
              <span className="text-muted-foreground text-xs">총 시간</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary text-2xl font-bold">
                {(data.participationRatio * 100).toFixed(1)}%
              </span>
              <span className="text-muted-foreground text-xs">참여도</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            <div className="flex items-center gap-2">
              <GamepadIcon className="text-primary h-4 w-4" />
              <span className="text-sm">
                게임 참여 횟수: {data.totalParticipations}회
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-primary h-4 w-4" />
              <span className="text-sm">
                총 게임 시간: {data.totalParticipationTime}시간
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-primary h-4 w-4" />
              <span className="text-sm">
                참여도: {(data.participationRatio * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-4 w-4" />
              <span className="text-sm">
                첫 참여일:{' '}
                {data.timelines.length > 0
                  ? new Date(
                      data.timelines.at(-1)?.date || new Date(),
                    ).toLocaleDateString('ko-KR')
                  : ''}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StreamerProfile
