import ValorantPlayerInfo from '@/components/valorant/ValorantPlayerInfo'
import { IValorantMatchDetail } from '@/types/valorant'

interface IValorantMatchInfoTableProps {
  data: IValorantMatchDetail
}

function ValorantMatchInfoTable({ data }: IValorantMatchInfoTableProps) {
  const blueTeam = data.players
    .filter((player) => player.team === 'BLUE')
    .sort((a, b) => b.avgCombatScore - a.avgCombatScore)
  const redTeam = data.players
    .filter((player) => player.team === 'RED')
    .sort((a, b) => b.avgCombatScore - a.avgCombatScore)

  return (
    <div className="mt-4 space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
            <div className="bg-primary h-3 w-3 rounded-full"></div>
            <span>Team A</span>
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-border border-b">
                  <th className="bg-card sticky left-0 z-20 w-45 p-2 text-left">
                    플레이어
                  </th>
                  <th className="p-2 text-center">티어</th>
                  <th className="p-2 text-center">K/D/A</th>
                  <th className="p-2 text-center">ACS</th>
                  <th className="p-2 text-center">효율등급</th>
                  <th className="p-2 text-center">첫 킬</th>
                  <th className="p-2 text-center">설치</th>
                  <th className="p-2 text-center">해제</th>
                </tr>
              </thead>
              <tbody>
                {blueTeam.map((player, index) => (
                  <ValorantPlayerInfo
                    key={crypto.randomUUID()}
                    player={player}
                    index={index}
                    winningTeam={data.winningTeam}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
            <div className="bg-destructive h-3 w-3 rounded-full"></div>
            <span>Team B</span>
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-border border-b">
                  <th className="bg-card sticky left-0 w-45 p-2 text-left">
                    플레이어
                  </th>
                  <th className="p-2 text-center">티어</th>
                  <th className="p-2 text-center">K/D/A</th>
                  <th className="p-2 text-center">ACS</th>
                  <th className="p-2 text-center">효율등급</th>
                  <th className="p-2 text-center">첫 킬</th>
                  <th className="p-2 text-center">설치</th>
                  <th className="p-2 text-center">해제</th>
                </tr>
              </thead>
              <tbody>
                {redTeam.map((player, index) => (
                  <ValorantPlayerInfo
                    key={crypto.randomUUID()}
                    player={player}
                    index={index}
                    winningTeam={data.winningTeam}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValorantMatchInfoTable
