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
  participationRatio: number
}

interface ICoPlayer {
  nickname: string
  count: number
}

interface IMonthlyParticipation {
  yearMonth: string
  count: number
}

interface IStreamerProfile extends IStreamerWithStatus {
  timelines: {
    timelineId: number
    title: string
    description: string
    date: string
    participants: string[]
  }[]
  coPlayers: ICoPlayer[]
  monthlyParticipation: IMonthlyParticipation[]
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
  IStreamerProfile,
  IMonthlyParticipation,
  SortFieldUnion,
  SortOrderUnion,
  StreamerRoleUnion,
}
