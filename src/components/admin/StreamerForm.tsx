'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  TStreamerSchema,
  StreamerSchema,
} from '@/constants/schemas/streamerSchema'

interface IStreamerFormProps {
  defaultValues?: Partial<TStreamerSchema>
  onSubmit: (data: TStreamerSchema) => Promise<void>
  isLoading?: boolean
}

export const StreamerForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: IStreamerFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<TStreamerSchema>({
    resolver: zodResolver(StreamerSchema),
    defaultValues,
  })

  const internalSubmit = async (data: TStreamerSchema) => {
    try {
      await onSubmit(data)
      reset()
    } catch (error) {
      const err = error as AxiosError
      setError('root', { message: err.message })
    }
  }

  return (
    <form onSubmit={handleSubmit(internalSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>스트리머 정보</CardTitle>
          <CardDescription>스트리머 정보를 입력하세요.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nickname">닉네임 *</Label>
              <Input
                id="nickname"
                autoComplete="off"
                {...register('nickname')}
              />
              {errors.nickname && (
                <p className="text-destructive text-sm">
                  {errors.nickname.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">역할 *</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="역할 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">회원</SelectItem>
                      <SelectItem value="guest">게스트</SelectItem>
                      <SelectItem value="vice">부회장</SelectItem>
                      <SelectItem value="president">회장</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-destructive text-sm">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hashId">해쉬 ID *</Label>
              <Input
                id="hashId"
                {...register('hashId')}
              />
              {errors.hashId && (
                <p className="text-destructive text-sm">
                  {errors.hashId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImageUrl">프로필 이미지 링크 *</Label>
              <Input
                id="profileImageUrl"
                {...register('profileImageUrl')}
              />
              {errors.profileImageUrl && (
                <p className="text-destructive text-sm">
                  {errors.profileImageUrl.message}
                </p>
              )}
            </div>
          </div>

          {errors.root?.message && (
            <p className="text-destructive text-sm">{errors.root.message}</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
          >
            저장하기
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
