import publicAPI from '@/api/publicAPI'
import {
  IStreamerWithStatus,
  IStreamerProfile,
  SortFieldUnion,
  SortOrderUnion,
} from '@/types/streamer'

async function fetchStreamersWithStatus(params: {
  nickname?: string
  sortField?: SortFieldUnion
  sortOrder?: SortOrderUnion
}): Promise<IStreamerWithStatus[]> {
  if (params.sortField === 'participationRatio') {
    const result = await publicAPI.get(`/streamer`)
    const sortByParticipationRatio: IStreamerWithStatus[] = result.data

    return params.sortOrder === 'DESC'
      ? sortByParticipationRatio.toSorted(
          (a, b) => b.participationRatio - a.participationRatio,
        )
      : sortByParticipationRatio.toSorted(
          (a, b) => a.participationRatio - b.participationRatio,
        )
  }

  const result = await publicAPI.get(`/streamer`, { params })

  return result.data
}

async function fetchStreamerProfile(
  streamerId: number,
): Promise<IStreamerProfile> {
  const result = await publicAPI.get(`/streamer/${streamerId}`)

  return result.data
}

export { fetchStreamersWithStatus, fetchStreamerProfile }
