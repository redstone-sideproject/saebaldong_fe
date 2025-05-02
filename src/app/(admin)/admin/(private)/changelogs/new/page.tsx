'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { addChangelog } from '@/api/changelog'
import { ChangelogForm } from '@/components/admin/ChangelogForm'
import { Button } from '@/components/ui/button'
import { TChangelogSchema } from '@/constants/schemas/changelogSchema'

export default function NewStreamerPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addChangelog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changelog'] })
      router.push('/admin/changelogs')
    },
  })

  const handleSubmit = async (data: TChangelogSchema) => {
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
          <Link href="/admin/changelogs">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">뒤로 가기</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">새 변경사항 등록</h1>
      </div>

      <ChangelogForm
        onSubmit={handleSubmit}
        isLoading={isPending}
      />
    </div>
  )
}
