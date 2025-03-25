import { Trophy } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { convertAgentName } from '@/lib/valorant'
import { IValorantMatchPlayer } from '@/types/valorant'
import { TeamTypeUnion } from '@/types/valorant'
interface IValorantPlayerInfoProps {
  player: IValorantMatchPlayer
  index: number
  winningTeam: TeamTypeUnion
}

function ValorantPlayerInfo({
  player,
  winningTeam,
  index,
}: IValorantPlayerInfoProps) {
  return (
    <tr className={cn('border-border/50 border-b')}>
      {/* 플레이어  */}
      <td className="bg-border sticky left-0 p-2">
        <div className="flex items-center gap-2">
          {/* 요원 초상화 */}
          <div className="bg-secondary relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={`/valorant/agent/${player.agent}.png`}
              alt={player.agent}
              className="h-full w-full object-cover"
              width={24}
              height={24}
            />
          </div>

          {/* 유저 정보 닉네임  */}
          {player.streamer ? (
            <div>
              <div className="flex items-center gap-1 font-medium">
                {player.streamer.nickname}
                {index === 0 && winningTeam === player.team && (
                  <Trophy className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <div className="text-muted-foreground text-xs">
                {convertAgentName(player.agent)}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-1 font-medium">
                {convertAgentName(player.agent)}
                {index === 0 && winningTeam === player.team && (
                  <Trophy className="h-4 w-4 text-amber-500" />
                )}
              </div>
            </div>
          )}
        </div>
      </td>

      {/* tier */}
      <td className="p-2">
        {player.tier === 'UnRank' ? (
          ''
        ) : (
          <div className="flex justify-center">
            <Image
              src={`/valorant/tier/${player.tier}_Rank.png`}
              alt={player.tier}
              className="object-cover"
              width={24}
              height={24}
            />
          </div>
        )}
      </td>

      {/* kda */}
      <td className="p-2 text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="text-green-500">{player.kills}</span>
          <span>/</span>
          <span className="text-red-500">{player.deaths}</span>
          <span>/</span>
          <span className="text-blue-500">{player.assists}</span>
        </div>
      </td>

      {/* ACS */}
      <td className="p-2 text-center font-medium">{player.avgCombatScore}</td>

      {/* 효율등급 */}
      <td className="p-2 text-center">{player.efficiencyRating}</td>

      {/* 첫킬 */}
      <td className="p-2 text-center">{player.firstKill}</td>

      {/* 설치 */}
      <td className="p-2 text-center">{player.plant}</td>

      {/* 헤제 */}
      <td className="p-2 text-center">{player.defuse}</td>
    </tr>
  )
}

export default ValorantPlayerInfo
