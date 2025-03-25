'use client'

import { useQuery } from '@tanstack/react-query'
import { Bell } from 'lucide-react'
import { useState } from 'react'

import { fetchRecentChangelog } from '@/api/changelog'
import Loading from '@/components/global/Loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

function ChangelogModal() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const {
    data: changelogData,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['recentChangeLog'],
    queryFn: () => fetchRecentChangelog(),
  })

  return (
    <>
      <Button
        variant={'outline'}
        size="sm"
        className="relative cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <Bell className="h-4 w-4" />
        <span className="hidden sm:inline">업데이트 내역</span>
        <span className="bg-primary absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full" />
      </Button>

      <Dialog
        open={isModalOpen}
        onOpenChange={setModalOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          {/* header */}
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>업데이트 내역</span>
            </DialogTitle>
            <DialogDescription>
              최근 업데이트된 변경사항을 확인하세요
            </DialogDescription>
          </DialogHeader>
          {isLoading && <Loading />}
          {isError && (
            <div className="text-primary text-center">
              <span>최근 업데이트 내역을 가져오는데 실패했어요.</span>
            </div>
          )}
          {/* main contents */}
          {isSuccess && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 pr-4">
                {changelogData.map((changelog) => (
                  <div
                    key={changelog.date}
                    className="space-y-2"
                  >
                    <p className="text-lg font-semibold">{changelog.date}</p>
                    <ul className="mt-2 space-y-2">
                      {changelog.changes.map((change, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2"
                        >
                          <Badge
                            variant={change.type}
                            className="mt-0.5"
                          >
                            {change.type === 'ADD' && '추가'}
                            {change.type === 'FIX' && '수정'}
                          </Badge>
                          <div>
                            <span className="text-sm">
                              {change.description}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* footer */}
          <DialogFooter className="flex sm:justify-between">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a href="/changelog">전체 변경 내역 보기</a>
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => setModalOpen(false)}
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ChangelogModal
