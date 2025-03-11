import publicAPI from '@/api/publicAPI'
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
  console.log(date)
  const parsedDate = date.toISOString().split('T')
  console.log(parsedDate)

  const result = await publicAPI.get(`/timeline/${parsedDate[0]}`)
  return result.data
}

export { fetchTimelines, fetchTimelinesDate, fetchTimelineByDate }
