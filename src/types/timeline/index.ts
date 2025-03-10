interface Streamer {
  streamerId: number
  hashId: string
  nickname: string
  role: string
  profileImageUrl: string
  createdAt: string
  updatedAt: string
}

interface Participation {
  participationId: number
  playHour: number
  streamer: Streamer
}

interface Timeline {
  timelineId: number
  title: string
  description: string
  date: string
  createdAt: string
  updatedAt: string
  participations: Participation[]
}

interface TimelinePagination {
  totoalData: number
  currentPage: number
  totalPage: number
  data: Timeline[]
}

interface TimelineDate {
  timelineId: number
  date: string
}

export type { TimelinePagination, Timeline, TimelineDate }
