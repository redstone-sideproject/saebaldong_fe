import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  const getPageRange = (): (number | '...')[] => {
    const totalNumbers = 10
    const pages: (number | '...')[] = []

    if (totalPages <= totalNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const showLeftDots = currentPage > 5
    const showRightDots = currentPage < totalPages - 4

    pages.push(1)

    if (showLeftDots && !showRightDots) {
      pages.push('...')

      const start = totalPages - 8
      for (let i = start; i < totalPages; i++) {
        pages.push(i)
      }
    } else if (!showLeftDots && showRightDots) {
      for (let i = 2; i <= 8; i++) {
        pages.push(i)
      }
      pages.push('...')
    } else if (showLeftDots && showRightDots) {
      pages.push('...')
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i)
      }
      pages.push('...')
    }

    // 마지막 페이지는 항상 포함
    pages.push(totalPages)

    return pages
  }

  const pageItems = getPageRange()
  return (
    <Pagination>
      <PaginationContent className="justify-center">
        {currentPage > 1 ? (
          <PaginationItem>
            <ChevronLeftIcon
              className="hover:text-primary cursor-pointer"
              onClick={() => goToPage(currentPage - 1)}
            />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <ChevronLeftIcon className="text-border" />
          </PaginationItem>
        )}

        {pageItems.map((item, i) =>
          item === '...' ? (
            <PaginationItem
              key={`ellipsis-${i}`}
              className="px-2 text-gray-400"
            >
              ...
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <Button
                variant={item === currentPage ? 'default' : 'ghost'}
                className={cn(
                  'h-8 w-8 cursor-pointer p-0 text-sm',
                  item === currentPage && 'font-bold',
                )}
                onClick={() => goToPage(item)}
              >
                {item}
              </Button>
            </PaginationItem>
          ),
        )}

        {currentPage < totalPages ? (
          <PaginationItem>
            <ChevronRightIcon
              className="hover:text-primary cursor-pointer"
              onClick={() => goToPage(currentPage + 1)}
            />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <ChevronRightIcon className="text-border" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationControls
