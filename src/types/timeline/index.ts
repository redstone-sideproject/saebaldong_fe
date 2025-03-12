import { IStreamer } from '@/types/streamer'

interface Participation {
  participationId: number
  playHour: number
  streamer: IStreamer
}

interface Timeline {
  timelineId: number
  title: string
  description: string
  date: string
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
