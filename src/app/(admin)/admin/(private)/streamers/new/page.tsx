'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { addStreamer } from '@/api/streamer'
import { StreamerForm } from '@/components/admin/StreamerForm'
import { Button } from '@/components/ui/button'
import { TStreamerSchema } from '@/constants/schemas/streamerSchema'

export default function NewStreamerPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addStreamer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streamer'] })
      router.push('/admin/streamers')
    },
  })

  const handleSubmit = async (data: TStreamerSchema) => {
    try {
      await mutateAsync(data)
    } catch (error) {
      throw error
    }
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
        <h1 className="text-3xl font-bold">새 스트리머 등록</h1>
      </div>

      <StreamerForm
        onSubmit={handleSubmit}
        isLoading={isPending}
      />
    </div>
  )
}
