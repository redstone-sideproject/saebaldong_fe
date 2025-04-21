import { z } from 'zod'

export const participantSchema = z.object({
  streamerId: z.number({
    required_error: '스트리머 ID는 필수입니다.',
    invalid_type_error: '스트리머 ID는 숫자여야 합니다.',
  }),
  playHour: z.number({
    required_error: '플레이 시간은 필수입니다.',
    invalid_type_error: '플레이 시간은 숫자여야 합니다.',
  }),
})

export const createTimelineSchema = z.object({
  title: z
    .string({
      invalid_type_error: '제목은 문자열이여야 합니다.',
    })
    .min(1, { message: '제목은 필수입니다.' }),
  description: z.string().optional(),
  date: z
    .string({
      required_error: '날짜는 필수입니다.',
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: '유효한 날짜 형식이어야 합니다.',
    }),
  participants: z
    .array(participantSchema)
    .min(1, { message: '최소 한 명 이상의 참가자가 필요합니다.' }),
})

type TCreateTimelineSchema = z.infer<typeof createTimelineSchema>
type TParticipantSchema = z.infer<typeof participantSchema>

export type { TCreateTimelineSchema, TParticipantSchema }
