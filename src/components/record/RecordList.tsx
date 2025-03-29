import ValorantMatchCard from '@/components/valorant/ValorantMatchCard'
import { groupMatchesByDate, transDateFormat } from '@/lib/date'
import { IValorantMatchDetail } from '@/types/valorant'

interface IRecordListProps {
  data: IValorantMatchDetail[]
}

function RecordList({ data }: IRecordListProps) {
  const groupedMatches = groupMatchesByDate(data)
  return (
    <div className="space-y-6">
      {Object.entries(groupedMatches)
        .sort((a, b) => b[0].localeCompare(a[0])) // 최신 날짜 우선
        .map(([dateKey, matches]) => (
          <div key={dateKey}>
            <h1 className="text-xl font-bold text-white">
              {transDateFormat(dateKey)}
            </h1>
            <div className="border-border relative space-y-6 border-l-2 pt-4 pl-6">
              {matches.map((match) => (
                <div
                  key={match.matchId}
                  className="relative"
                >
                  {/* 초록 점 */}
                  {match.matchType === 'PARTY' &&
                    match.winningTeam === 'BLUE' && (
                      <div className="bg-primary absolute -left-[24px] h-3 w-3 rounded-full"></div>
                    )}
                  {/* 빨간 점 */}
                  {match.matchType === 'PARTY' &&
                    match.winningTeam === 'RED' && (
                      <div className="bg-destructive absolute -left-[24px] h-3 w-3 rounded-full"></div>
                    )}
                  {/* 무승부 */}
                  {match.winningTeam === 'DRAW' && (
                    <div className="bg-foreground absolute -left-[24px] h-3 w-3 rounded-full"></div>
                  )}
                  {/* 커스텀 */}
                  {match.matchType === 'CUSTOM' && (
                    <div className="absolute -left-[24px] h-3 w-3 rounded-full bg-amber-500"></div>
                  )}
                  <ValorantMatchCard data={match} />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default RecordList
