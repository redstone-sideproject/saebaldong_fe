import privateAPI from '@/api/privateAPI'
import publicAPI from '@/api/publicAPI'
import { TStreamerSchema } from '@/constants/schemas/streamerSchema'
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

async function addStreamer(payload: TStreamerSchema): Promise<void> {
  await privateAPI.post(`/streamer`, payload)
}

async function updateStreamer(payload: TStreamerSchema): Promise<void> {
  await privateAPI.post(`/streamer`, payload)
}

export {
  fetchStreamersWithStatus,
  fetchStreamerProfile,
  addStreamer,
  updateStreamer,
}
