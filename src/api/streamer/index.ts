import privateAPI from '@/api/privateAPI'
import publicAPI from '@/api/publicAPI'
import { TStreamerSchema } from '@/constants/schemas/streamerSchema'
import {
  IStreamer,
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

async function updateStreamer(params: {
  streamerId: number
  payload: TStreamerSchema
}): Promise<void> {
  await privateAPI.patch(`/streamer/${params.streamerId}`, params.payload)
}

async function deleteStreamer(streamerId: number): Promise<void> {
  await privateAPI.delete(`/streamer/${streamerId}`)
}

async function fetchAllStreamer(): Promise<IStreamer[]> {
  const result = await privateAPI.get(`/streamer/all`)
  return result.data
}

export {
  fetchStreamersWithStatus,
  fetchStreamerProfile,
  addStreamer,
  updateStreamer,
  deleteStreamer,
  fetchAllStreamer,
}
