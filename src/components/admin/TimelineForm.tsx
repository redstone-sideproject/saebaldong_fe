'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Calendar, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { fetchAllStreamer } from '@/api/streamer'
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
  createTimelineSchema,
  TCreateTimelineSchema,
} from '@/constants/schemas/timelineSchema'

interface ITimelineFormProps {
  defaultValues?: Partial<TCreateTimelineSchema>
  onSubmit: (data: TCreateTimelineSchema) => Promise<void>
  isLoading?: boolean
}

export function TimelineForm({
  defaultValues,
  onSubmit,
  isLoading,
}: ITimelineFormProps) {
  const [newParticipant, setNewParticipant] = useState<{
    streamerId: number
    playHour: number
  }>({
    streamerId: 0,
    playHour: 0.5,
  })

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm<TCreateTimelineSchema>({
    resolver: zodResolver(createTimelineSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'participants',
  })

  const { data: streamerData, isSuccess } = useQuery({
    queryKey: ['AllStreamer'],
    queryFn: fetchAllStreamer,
  })

  const internalSubmit = async (data: TCreateTimelineSchema) => {
    try {
      await onSubmit(data)
      reset()
    } catch (error) {
      const err = error as AxiosError
      setError('root', { message: err.message })
    }
  }

  const handleAddParticipant = () => {
    if (fields.find((el) => el.streamerId === newParticipant.streamerId)) {
      toast.error('이미 추가된 스트리머입니다.')
      return
    }
    append(newParticipant)
  }

  return (
    <form onSubmit={handleSubmit(internalSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>타임라인 정보</CardTitle>
          <CardDescription>타임라인 정보를 입력하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">
                제목 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="타임라인 타이틀"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-destructive text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              placeholder="타임라인 설명"
              {...register('description')}
              rows={4}
            />
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

          {isSuccess && (
            <div className="space-y-4">
              <Label>
                참여자 <span className="text-red-500">*</span>
              </Label>

              <div className="flex flex-col gap-4">
                {/* 참여자 추가 UI */}
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="participantId">참여자 선택</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewParticipant((prev) => ({
                          ...prev,
                          streamerId: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger
                        className="mb-0 w-full"
                        id="participantId"
                      >
                        <SelectValue placeholder="참여자 선택..." />
                      </SelectTrigger>
                      <SelectContent>
                        {streamerData.map((streamer) => (
                          <SelectItem
                            key={streamer.streamerId}
                            value={streamer.streamerId.toString()}
                          >
                            {streamer.nickname}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-32 space-y-2">
                    <Label htmlFor="playhour">플레이 시간(시간)</Label>
                    <Input
                      id="playhour"
                      type="number"
                      min={0.5}
                      step={0.5}
                      value={newParticipant.playHour}
                      onChange={(e) =>
                        setNewParticipant((prev) => ({
                          ...prev,
                          playHour: Number.parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddParticipant}
                  >
                    추가
                  </Button>
                </div>

                {/* 참여자 목록 */}
                {fields.length > 0 ? (
                  <div className="rounded-md border p-4">
                    <h4 className="mb-2 text-sm font-medium">참여자 목록</h4>
                    <div className="space-y-2">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="bg-secondary/50 flex items-center justify-between gap-2 rounded-md p-2"
                        >
                          <div className="text-sm font-medium">
                            {
                              streamerData.find(
                                (el) => el.streamerId === field.streamerId,
                              )?.nickname
                            }
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Label className="text-xs">플레이 시간 :</Label>
                              <Input
                                type="number"
                                min="0.5"
                                step="0.5"
                                {...register(`participants.${index}.playHour`, {
                                  valueAsNumber: true,
                                })}
                                className="h-8 w-20 text-sm"
                              />
                              <span className="text-xs">시간</span>
                            </div>

                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center">
                    참여자가 없습니다. 위에서 참여자를 추가해주세요.
                  </div>
                )}
                {errors.participants && (
                  <p className="text-destructive text-sm">
                    {errors.participants.message}
                  </p>
                )}
              </div>
            </div>
          )}
          {errors.root?.message && (
            <p className="text-destructive text-sm">{errors.root.message}</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            asChild
          >
            <Link href="/admin/timelines">취소</Link>
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                저장 중...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Save className="h-4 w-4" />
                저장하기
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
