'use client'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import { TimelineForm } from '@/components/admin/TimelineForm'
import Loading from '@/components/global/Loading'
import { Button } from '@/components/ui/button'

import { updateTimeline, fetchTimelineById } from '@/api/timeline'
import { TCreateTimelineSchema } from '@/constants/schemas/timelineSchema'

function UpdateTimelinePage() {
  const queryClient = useQueryClient()
  const params = useParams()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateTimeline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline'] })
      router.push('/admin/timelines')
    },
  })

  const {
    data: timelineData,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      'timeline',
      {
        timelineId: params.timelineId,
      },
    ],
    queryFn: () => fetchTimelineById(parseInt(params.timelineId as string)),
    retry: false,
  })

  const handleSubmit = async (data: TCreateTimelineSchema) => {
    try {
      await mutateAsync({
        timelineId: parseInt(params.timelineId as string),
        payload: data,
      })
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
          <h1 className="text-3xl font-bold">타임라인 수정</h1>
        </div>
      </div>

      {isLoading && <Loading />}
      {isError && (
        <div className="text-center">
          <p>해당 타임라인이 존재하지 않습니다.</p>
        </div>
      )}
      {isSuccess && (
        <TimelineForm
          defaultValues={{
            title: timelineData.title,
            description: timelineData.description,
            date: format(parseISO(timelineData.date), 'yyyy-MM-dd'),
            participants: timelineData.participations.map((el) => ({
              streamerId: el.streamer.streamerId,
              playHour: el.playHour,
            })),
          }}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      )}
    </div>
  )
}

export default UpdateTimelinePage
