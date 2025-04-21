import privateAPI from '@/api/privateAPI'
import publicAPI from '@/api/publicAPI'
import { TCreateTimelineSchema } from '@/constants/schemas/timelineSchema'
import { TimelinePagination, TimelineDate, Timeline } from '@/types/timeline'

async function fetchTimelines(params: {
  page: number
}): Promise<TimelinePagination> {
  const result = await publicAPI.get(`/timeline`, {
    params,
  })
  return result.data
}

async function fetchTimelinesDate(): Promise<Date[]> {
  const result = await publicAPI.get(`/timeline/date`)

  const transResult = result.data.map((data: TimelineDate) => {
    const date = new Date(data.date)
    date.setHours(0, 0, 0, 0)
    return date
  })

  return transResult
}

async function fetchTimelineByDate(date: Date): Promise<Timeline[]> {
  date.setHours(9, 0, 0, 0)
  const parsedDate = date.toISOString().split('T')

  const result = await publicAPI.get(`/timeline/${parsedDate[0]}`)
  return result.data
}

async function fetchTimelineById(timelineId: number): Promise<Timeline> {
  const result = await publicAPI.get(`/timeline/${timelineId}`)
  return result.data
}

async function addTimeline(payload: TCreateTimelineSchema): Promise<void> {
  await privateAPI.post(`/timeline`, payload)
}
async function updateTimeline(params: {
  timelineId: number
  payload: TCreateTimelineSchema
}): Promise<void> {
  await privateAPI.patch(`/timeline/${params.timelineId}`, params.payload)
}

export {
  fetchTimelines,
  fetchTimelinesDate,
  fetchTimelineByDate,
  addTimeline,
  updateTimeline,
  fetchTimelineById,
}
