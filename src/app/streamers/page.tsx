'use client'

import { useQuery } from '@tanstack/react-query'
import { Home, Search, SortAsc, SortDesc, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { fetchStreamersWithStatus } from '@/api/streamer'
import BottomNav from '@/components/global/BottomNav'
import StreamerList from '@/components/streamer/StreamerList'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useDebounce from '@/hooks/useDebounce'
import { GAPageView } from '@/hooks/useGAPageView'
import { SortFieldUnion, SortOrderUnion } from '@/types/streamer'

export default function StreamersPage() {
  const [searchNickname, setSearchNickname] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<SortOrderUnion>('DESC')
  const [sortBy, setSortBy] = useState<SortFieldUnion>('totalParticipations')
  const debounceValue = useDebounce(searchNickname)

  const handleSortChange = (value: SortFieldUnion) => {
    setSortBy(value)
  }

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
    setSortOrder(newOrder)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value
    setSearchNickname(nickname)
  }

  const {
    data: streamerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['streamer', { sortOrder, sortBy, nickname: debounceValue }],
    queryFn: () =>
      fetchStreamersWithStatus({
        nickname: debounceValue,
        sortField: sortBy,
        sortOrder: sortOrder,
      }),
    staleTime: 1000 * 5,
    retry: 1,
  })

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-1 py-8 pb-24">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">스트리머</h1>
            <p className="text-muted-foreground mt-1">
              게임에 참여한 스트리머들의 통계를 확인하세요.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 md:mt-0">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="스트리머 검색..."
                className="bg-card border-border/50 w-[200px] pl-8"
                value={searchNickname}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        <Card className="border-border/50 bg-card mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <span>스트리머 목록</span>
              <div className="flex items-center gap-2">
                <Select
                  value={sortBy}
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger
                    className="bg-secondary border-border/50 h-8 w-[140px] text-xs"
                    aria-label="select sort button"
                  >
                    <SelectValue placeholder="정렬 기준" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nickname">이름</SelectItem>
                    <SelectItem value="totalParticipationTime">
                      총 참여 시간
                    </SelectItem>
                    <SelectItem value="totalParticipations">
                      참여 횟수
                    </SelectItem>
                    <SelectItem value="participationRatio">
                      참여도 (%)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleSortOrder}
                  aria-label="ASC / DESC"
                >
                  {sortOrder === 'ASC' ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StreamerList
              data={streamerData || null}
              isLoading={isLoading}
              isError={isError}
            />
          </CardContent>
        </Card>
      </main>

      {/* 하단 고정 nav */}
      <BottomNav>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-1"
          aria-label="Move streamer page"
        >
          <Link
            href="/"
            className="flex gap-2"
          >
            <Home className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">홈으로</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-1"
          aria-label="Move streamer page"
        >
          <Link
            href="/timeline"
            className="flex gap-2"
          >
            <Calendar className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">타임라인</span>
          </Link>
        </Button>
      </BottomNav>
      <GAPageView />
    </div>
  )
}
