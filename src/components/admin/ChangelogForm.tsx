'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Calendar } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import {
  ChangelogSchema,
  TChangelogSchema,
} from '@/constants/schemas/changelogSchema'
import { changelogTypeKeys } from '@/types/changelog'

interface IChangelogFormProps {
  defaultValues?: Partial<TChangelogSchema>
  onSubmit: (data: TChangelogSchema) => Promise<void>
  isLoading?: boolean
}

export const ChangelogForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: IChangelogFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<TChangelogSchema>({
    resolver: zodResolver(ChangelogSchema),
    defaultValues,
  })

  const internalSubmit = async (data: TChangelogSchema) => {
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
          <CardTitle>변경사항 정보</CardTitle>
          <CardDescription>변경사항 정보를 입력하세요.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role">
              타입 <span className="text-red-500">*</span>
            </Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="역할 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(changelogTypeKeys).map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-destructive text-sm">{errors.type.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">
              설명 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="타임라인 설명"
              {...register('description')}
              rows={4}
            />
            {errors.description && (
              <p className="text-destructive text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">
                날짜 <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center">
                <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                <Input
                  id="date"
                  type="date"
                  {...register('date')}
                />
              </div>
              {errors.date && (
                <p className="text-destructive text-sm">
                  {errors.date.message}
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
