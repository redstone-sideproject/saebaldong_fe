'use client'

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'

import { updateStreamer, fetchStreamerProfile } from '@/api/streamer'
import { StreamerForm } from '@/components/admin/StreamerForm'
import Loading from '@/components/global/Loading'
import { Button } from '@/components/ui/button'
import { TStreamerSchema } from '@/constants/schemas/streamerSchema'

export default function UpdateStreamerPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    data: streamerData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['streamerProfile', params.streamerId],
    queryFn: () => fetchStreamerProfile(parseInt(params.streamerId as string)),
    retry: false,
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateStreamer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streamer'] })
      queryClient.invalidateQueries({
        queryKey: ['streamerProfile', params.streamerId],
      })
      router.push('/admin/streamers')
    },
  })

  const handleSubmit = async (data: TStreamerSchema) => {
    try {
      await mutateAsync({
        streamerId: parseInt(params.streamerId as string),
        payload: data,
      })
    } catch (error) {
      throw error
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          asChild
        >
          <Link href="/admin/streamers">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">뒤로 가기</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">스트리머 정보 수정</h1>
      </div>

      {isSuccess && (
        <StreamerForm
          defaultValues={streamerData}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      )}
      {isError && (
        <div className="text-center">
          <p>해당 스트리머가 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  )
}
