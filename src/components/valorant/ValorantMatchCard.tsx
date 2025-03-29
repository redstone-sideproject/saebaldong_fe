'use client'

import { MapPin, Shield, Clock } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import ValorantMatchInfoTable from '@/components/valorant/ValorantMatchInfoTable'
import { cn } from '@/lib/utils'
import { convertMatchType, convertValorantMap } from '@/lib/valorant'
import { IValorantMatchDetail } from '@/types/valorant'

interface IValorantMatchCardProps {
  data: IValorantMatchDetail
}

function ValorantMatchCard({ data }: IValorantMatchCardProps) {
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false)

  const handleShowDetail = () => {
    setIsShowDetail(!isShowDetail)
  }

  return (
    <Card className="hover:border-primary border py-3">
      <CardHeader
        className="bg cursor-pointer bg-no-repeat"
        // style={{ backgroundImage: `url('/valorant/map/${data.map}.png')` }}
        onClick={() => handleShowDetail()}
      >
        {/* 발로란트 게임 요약 정보 */}
        <div className="mt-2 flex flex-col items-center gap-2 text-xs md:flex-row md:justify-between md:text-sm">
          <div className="flex w-full flex-col gap-1 md:w-1/2">
            <div className="flex items-center gap-2">
              <MapPin className="text-muted-foreground h-4 w-4" />
              {/* 맵 */}
              <span>{convertValorantMap(data.map)}</span>
              <span className="text-muted-foreground">•</span>

              {/* 매치 타입 */}
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span>{convertMatchType(data.matchType)}</span>
              </div>
              {data.matchDuration && (
                <>
                  {/* 소요시간  */}
                  <span className="text-muted-foreground">•</span>
                  <Clock className="h-4 w-4" />
                  <span>{data.matchDuration}분</span>
                </>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 text-xs font-semibold md:text-sm">
              <div className="text-primary flex flex-col items-center">
                <span>Team A</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">{data.blueScore}</span>
                <span>:</span>
                <span className="text-destructive">{data.redScore}</span>
              </div>
              <div className="text-destructive flex flex-col items-center text-sm font-semibold">
                <span>Team B</span>
              </div>
            </div>
            <Progress
              value={Math.round(
                (data.blueScore / (data.blueScore + data.redScore)) * 100,
              )}
              className="bg-destructive h-1"
              aria-label="match-result"
            />
          </div>

          {/* 파티 플레이어배지 */}
          {data.matchType === 'PARTY' && (
            <div className="flex flex-wrap justify-center">
              {data.players
                .filter((player) => player.team === 'BLUE')
                .map((player) => (
                  <div
                    key={crypto.randomUUID()}
                    className="flex items-center gap-1.5 rounded-full border px-2 py-1"
                  >
                    {player.streamer && (
                      <>
                        <Image
                          className="rounded-full"
                          src={player.streamer.profileImageUrl}
                          width={16}
                          height={16}
                          alt={player.streamer.nickname}
                        />
                        <span className="text-xs">
                          {player.streamer.nickname}
                        </span>
                      </>
                    )}
                  </div>
                ))}
            </div>
          )}
          {/* 내전 플레이어배지 */}
          {data.matchType === 'CUSTOM' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap justify-center">
                {data.players
                  .filter((player) => player.team === 'BLUE')
                  .map((player) => (
                    <div
                      key={crypto.randomUUID()}
                      className="flex items-center gap-1.5 rounded-full border px-2 py-1"
                    >
                      {player.streamer && (
                        <>
                          <Image
                            className="rounded-full"
                            src={player.streamer.profileImageUrl}
                            width={16}
                            height={16}
                            alt={player.streamer.nickname}
                          />
                          <span className="text-xs">
                            {player.streamer.nickname}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
              </div>
              <span className="text-muted-foreground text-center">VS</span>
              <div className="flex flex-wrap justify-center">
                {data.players
                  .filter((player) => player.team === 'RED')
                  .map((player) => (
                    <div
                      key={crypto.randomUUID()}
                      className="flex items-center gap-1.5 rounded-full border px-2 py-1"
                    >
                      {player.streamer && (
                        <>
                          <Image
                            className="rounded-full"
                            src={player.streamer.profileImageUrl}
                            width={16}
                            height={16}
                            alt={player.streamer.nickname}
                          />
                          <span className="text-xs">
                            {player.streamer.nickname}
                          </span>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent
        className={cn(
          'space-y-4 p-4 pt-0 transition-all',
          isShowDetail ? 'block' : 'hidden',
        )}
      >
        <ValorantMatchInfoTable data={data} />
      </CardContent>
    </Card>
  )
}

export default ValorantMatchCard
