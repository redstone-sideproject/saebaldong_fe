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
