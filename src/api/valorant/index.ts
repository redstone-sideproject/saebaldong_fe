import publicAPI from '@/api/publicAPI'
import {
  IValorantMatchDetail,
  IValorantMatchPage,
  MatchTypeUnion,
} from '@/types/valorant'

async function fetchValorantMatchByTimeline(
  timelineId: number,
): Promise<IValorantMatchDetail[]> {
  const result = await publicAPI.get(`/valorant-match/timeline/${timelineId}`)
  return result.data
}

async function fetchValorantMatchByQuery(params: {
  page: number
  matchType: MatchTypeUnion | null
}): Promise<IValorantMatchPage> {
  const result = await publicAPI.get(`/valorant-match/record/`, { params })
  return result.data
}

export { fetchValorantMatchByTimeline, fetchValorantMatchByQuery }
