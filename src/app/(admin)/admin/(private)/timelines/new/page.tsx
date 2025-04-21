'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { addTimeline } from '@/api/timeline'
import { TimelineForm } from '@/components/admin/TimelineForm'
import { Button } from '@/components/ui/button'
import { TCreateTimelineSchema } from '@/constants/schemas/timelineSchema'

function AddTimelinePage() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addTimeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline'] })
      router.push('/admin/timelines')
    },
  })

  const handleSubmit = async (data: TCreateTimelineSchema) => {
    try {
      await mutateAsync(data)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/admin/timelines">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">뒤로 가기</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">타임라인 추가</h1>
        </div>
      </div>
      <TimelineForm
        onSubmit={handleSubmit}
        isLoading={isPending}
      />
    </div>
  )
}

export default AddTimelinePage
