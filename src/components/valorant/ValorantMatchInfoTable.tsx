import ValorantPlayerInfo from '@/components/valorant/ValorantPlayerInfo'

import { IValorantMatchDetail } from '@/types/valorant'

interface IValorantMatchInfoTableProps {
  data: IValorantMatchDetail
}

function ValorantMatchInfoTable({ data }: IValorantMatchInfoTableProps) {
  const blueTeam = data.players.filter((player) => player.team === 'BLUE')
  const redTeam = data.players.filter((player) => player.team === 'RED')

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
                  <th className="p-2 text-left">플레이어</th>
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
                {blueTeam.map((player) => (
                  <ValorantPlayerInfo
                    key={crypto.randomUUID()}
                    player={player}
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
                  <th className="p-2 text-left">플레이어</th>
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
                {redTeam.map((player) => (
                  <ValorantPlayerInfo
                    key={crypto.randomUUID()}
                    player={player}
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
