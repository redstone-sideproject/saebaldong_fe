'use client'

import { MapPin, Shield } from 'lucide-react'
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
        className="cursor-pointer"
        onClick={() => handleShowDetail()}
      >
        {/* 발로란트 게임 요약 정보 */}
        <div className="2xs:flex-row 2xs:justify-between mt-2 flex flex-col items-center gap-2 text-sm md:text-base">
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
          </div>
          <div className="flex items-center gap-2">
            <div className="text-primary flex flex-col items-center text-xs font-semibold md:text-sm">
              <span>Team A</span>
              <span>{data.blueScore}</span>
            </div>
            <span>:</span>
            <div className="text-destructive flex flex-col items-center text-sm font-semibold">
              <span>Team B</span>
              <span>{data.redScore}</span>
            </div>
          </div>
        </div>
        <Progress
          value={Math.round(
            (data.blueScore / (data.blueScore + data.redScore)) * 100,
          )}
          className="bg-destructive h-1"
          aria-label="match-result"
        />
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
