'use client'

// import Loading from '@/components/global/Loading'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { fetchValorantMatchByTimeline } from '@/api/valorant'
import { Button } from '@/components/ui/button'
import ValorantMatchCard from '@/components/valorant/ValorantMatchCard'

interface IValorantMatchListProps {
  timelineId: number
}

function ValorantMatchList({ timelineId }: IValorantMatchListProps) {
  const {
    data: valorantMatch,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [`valorantMatch, ${timelineId}`],
    queryFn: () => fetchValorantMatchByTimeline(timelineId),
  })

  if (isLoading) {
    return
  }

  if (valorantMatch?.length === 0) {
    return (
      <div className="text-primary mt-5 flex flex-col gap-2 text-center text-base">
        <span>기록된 게임이 없어요.</span>
        <span className="text-muted-foreground">
          Tip: 발로란트 기록이 없거나 다시보기가 남지 않은 경우 경기 기록이 없을
          수 있어요.
        </span>
      </div>
    )
  }

  return (
    <div className="border-border relative space-y-6 border-l-2 pt-4 pl-6">
      {isSuccess &&
        valorantMatch.map((data, index) => {
          if (index >= 5) return null

          return (
            <div
              key={data.matchId}
              className="relative"
            >
              {/* 초록 점 */}
              {data.matchType === 'PARTY' && data.winningTeam === 'BLUE' && (
                <div className="bg-primary absolute -left-[24px] h-3 w-3 rounded-full"></div>
              )}
              {/* 빨간 점 */}
              {data.matchType === 'PARTY' && data.winningTeam === 'RED' && (
                <div className="bg-destructive absolute -left-[24px] h-3 w-3 rounded-full"></div>
              )}
              {/* 무승부 */}
              {data.winningTeam === 'DRAW' && (
                <div className="bg-foreground absolute -left-[24px] h-3 w-3 rounded-full"></div>
              )}
              {/* 커스텀 */}
              {data.matchType === 'CUSTOM' && (
                <div className="absolute -left-[24px] h-3 w-3 rounded-full bg-amber-500"></div>
              )}
              <ValorantMatchCard data={data} />
            </div>
          )
        })}
      {isSuccess && valorantMatch.length >= 6 && (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="mb-4 w-full cursor-pointer"
        >
          <Link href={`/timeline/${timelineId}`}>
            더 많은 경기 기록 확인하기
          </Link>
        </Button>
      )}
    </div>
  )
}

export default ValorantMatchList
