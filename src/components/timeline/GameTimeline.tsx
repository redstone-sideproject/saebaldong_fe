'use client'

import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'

function GameTimeline() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        {/* 날짜 */}
        <h3 className="text-primary mb-4 flex items-center text-lg font-bold">
          <span className="bg-primary mr-2 inline-block h-2 w-2 rounded-full"></span>
          2025년 3월 5일 화요일
        </h3>

        {/* 카드 컴포넌트 */}

        <div className="space-y-4">
          <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
            <CardContent className="px-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-medium">새발동 5인큐</h4>
                  {/* <p className="text-muted-foreground mt-1 text-sm">
                    발로란트 5인큐
                  </p> */}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-muted-foreground mb-2 text-sm">
                  참여 스트리머
                </p>

                <div className="flex flex-wrap gap-2">
                  {/* one */}
                  <div className="flex items-center gap-1.5">
                    <Image
                      className="rounded-full"
                      src={`https://nng-phinf.pstatic.net/MjAyNDEwMThfNzgg/MDAxNzI5MjM1Mjc1NTYy.Qblw8-SDtgX1cgiv-HKFasWbX7Ynr5j-HGPmDyhi9vwg.g5XvfcEXVrIRHCIFt-gU1JjrkXusKOyhE9fb7r7qkJ0g.JPEG/%EB%A8%80%EB%8B%98_%ED%8C%AC%EC%95%84%ED%8A%B8.jpg?type=f120_120_na`}
                      width={24}
                      height={24}
                      alt="실프"
                    />
                    <span className="text-sm">실프</span>
                  </div>

                  {/* two */}
                  <div className="flex items-center gap-1.5">
                    <Image
                      className="rounded-full"
                      src={`https://nng-phinf.pstatic.net/MjAyNDEwMThfNzgg/MDAxNzI5MjM1Mjc1NTYy.Qblw8-SDtgX1cgiv-HKFasWbX7Ynr5j-HGPmDyhi9vwg.g5XvfcEXVrIRHCIFt-gU1JjrkXusKOyhE9fb7r7qkJ0g.JPEG/%EB%A8%80%EB%8B%98_%ED%8C%AC%EC%95%84%ED%8A%B8.jpg?type=f120_120_na`}
                      width={24}
                      height={24}
                      alt="실프"
                    />
                    <span className="text-sm">실프</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default GameTimeline
