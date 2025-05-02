import { z } from 'zod'

import { changelogTypeKeys } from '@/types/changelog'

export const ChangelogSchema = z.object({
  type: z.enum(
    Object.values(changelogTypeKeys) as [
      (typeof changelogTypeKeys)[keyof typeof changelogTypeKeys],
    ],
    {
      errorMap: () => ({
        message: '유효한 타입을 선택해주세요.',
      }),
    },
  ),
  description: z.string().min(1, '변경사항을 입력해주세요.'),
  date: z
    .string({
      required_error: '날짜는 필수입니다.',
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: '유효한 날짜 형식이어야 합니다.',
    }),
})

type TChangelogSchema = z.infer<typeof ChangelogSchema>

export type { TChangelogSchema }
