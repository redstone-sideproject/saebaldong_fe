'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

import { updateChangelog, fetchChangelogForAdmin } from '@/api/changelog'
import { ChangelogForm } from '@/components/admin/ChangelogForm'
import Loading from '@/components/global/Loading'
import { Button } from '@/components/ui/button'
import { TChangelogSchema } from '@/constants/schemas/changelogSchema'

export default function NewStreamerPage() {
  const router = useRouter()
  const params = useParams()
  const queryClient = useQueryClient()

  const {
    data: changelogData,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      'changelog',
      {
        changelogId: params.changelogId,
      },
    ],
    queryFn: () =>
      fetchChangelogForAdmin(parseInt(params.changelogId as string)),
    retry: false,
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateChangelog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['changelog'] })
      router.push('/admin/changelogs')
    },
  })

  const handleSubmit = async (data: TChangelogSchema) => {
    try {
      await mutateAsync({
        changelogId: parseInt(params.changelogId as string),
        payload: data,
      })
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
        <h1 className="text-3xl font-bold">변경사항 수정</h1>
      </div>

      {isLoading && <Loading />}

      {isError && (
        <div className="text-center">
          <p>해당 변경사항이 존재하지 않습니다.</p>
        </div>
      )}

      {isSuccess && (
        <ChangelogForm
          defaultValues={{
            type: changelogData.type,
            description: changelogData.description,
            date: format(parseISO(changelogData.date), 'yyyy-MM-dd'),
          }}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      )}
    </div>
  )
}
