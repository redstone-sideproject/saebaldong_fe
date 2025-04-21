import { z } from 'zod'

export const StreamerSchema = z.object({
  hashId: z.string().min(1, '해쉬아이디를 입력해주세요'),
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
  role: z.string().min(1, '역할을 선택해주세요.'),
  profileImageUrl: z.string().min(1, '프로필 이미지 주소를 입력해주세요.'),
})

type TStreamerSchema = z.infer<typeof StreamerSchema>

export type { TStreamerSchema }
