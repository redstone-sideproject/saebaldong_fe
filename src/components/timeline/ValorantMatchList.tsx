'use client'

import { useQuery } from '@tanstack/react-query'

import Loading from '@/components/global/Loading'
import ValorantMatchCard from '@/components/valorant/ValorantMatchCard'

import { fetchValorantMatchByTimeline } from '@/api/valorant'

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
    return <Loading />
  }

  if (valorantMatch?.length === 0) {
    return
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
            <div className="bg-primary absolute -left-[24px] h-3 w-3 rounded-full"></div>
            <ValorantMatchCard data={data} />
          </div>
        ))}
    </div>
  )
}

export default ValorantMatchList
