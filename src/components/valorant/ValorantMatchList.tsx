'use client'

import { useQuery } from '@tanstack/react-query'

// import Loading from '@/components/global/Loading'
import { fetchValorantMatchByTimeline } from '@/api/valorant'
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
      <div className="text-primary mt-5 text-center text-base">
        <span>경기 기록이 없습니다.</span>
      </div>
    )
  }

  return (
    <div className="border-border relative space-y-6 border-l-2 pt-4 pl-6">
      {isSuccess &&
        valorantMatch.map((data) => (
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
            {/* 내전 */}
            {data.matchType === 'CUSTOM' && (
              <div className="bg-foreground absolute -left-[24px] h-3 w-3 rounded-full"></div>
            )}
            <ValorantMatchCard data={data} />
          </div>
        ))}
    </div>
  )
}

export default ValorantMatchList
