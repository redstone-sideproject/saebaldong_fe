interface IStreamer {
  streamerId: number
  hashId: string
  nickname: string
  role: StreamerRoleUnion
  profileImageUrl: string
  createdAt: string
  updatedAt: string
}

interface IStreamerWithStatus extends IStreamer {
  totalParticipations: number
  totalParticipationTime: number
  totalGames: number
  participationRatio: number
}

export const sortFieldKeys = {
  nickname: 'nickname',
  totalParticipations: 'totalParticipations',
  totalParticipationTime: 'totalParticipationTime',
  participationRatio: 'participationRatio',
} as const

export const sortOrderKeys = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const

export const streamerRoleKeys = {
  member: 'member',
  president: 'president',
  vice: 'vice',
  guest: 'guest',
} as const

export const streamerRoleKeyToValue = {
  member: '회원',
  president: '회장',
  vice: '부회장',
  guest: '게스트',
} as const

type SortFieldUnion = (typeof sortFieldKeys)[keyof typeof sortFieldKeys]
type SortOrderUnion = (typeof sortOrderKeys)[keyof typeof sortOrderKeys]
type StreamerRoleUnion =
  (typeof streamerRoleKeys)[keyof typeof streamerRoleKeys]

export type {
  IStreamer,
  IStreamerWithStatus,
  SortFieldUnion,
  SortOrderUnion,
  StreamerRoleUnion,
}
