import { Clock, GamepadIcon, Users } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { IStreamerWithStatus, streamerRoleKeyToValue } from '@/types/streamer'

interface IStreamerListProps {
  data: IStreamerWithStatus[] | null
}

function StreamerList({ data }: IStreamerListProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Users className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="text-lg font-medium">스트리머가 없습니다</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          검색 조건에 맞는 스트리머가 없습니다. 다른 검색어를 입력해보세요.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((streamer) => (
        <Link
          key={streamer.streamerId}
          href={`/streamers/${streamer.streamerId}`}
          className="border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/40 flex items-center rounded-lg border p-3 transition-colors"
        >
          <Avatar className="border-border/50 h-12 w-12 border">
            <AvatarImage src={streamer.profileImageUrl} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {streamer.nickname.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">{streamer.nickname}</div>
              <Badge
                variant="outline"
                className="bg-background border-border/50 text-xs"
              >
                {streamerRoleKeyToValue[streamer.role] || '회원'}
              </Badge>
            </div>

            <div className="text-muted-foreground mt-1 flex items-center gap-3 text-xs">
              <div className="flex items-center">
                <GamepadIcon className="mr-1 h-3 w-3" />
                <span>{streamer.totalParticipations}회</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>{streamer.totalParticipationTime}시간</span>
              </div>
            </div>

            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">참여도</span>
                <span>{(streamer.participationRatio * 100).toFixed(1)}%</span>
              </div>
              <Progress
                value={streamer.participationRatio * 100}
                className="h-1.5"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default StreamerList
