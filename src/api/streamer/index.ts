import publicAPI from '@/api/publicAPI'
import {
  IStreamerWithStatus,
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

export { fetchStreamersWithStatus }
