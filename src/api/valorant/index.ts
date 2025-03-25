import publicAPI from '@/api/publicAPI'
import { IValorantMatchDetail } from '@/types/valorant'

async function fetchValorantMatchByTimeline(
  timelineId: number,
): Promise<IValorantMatchDetail[]> {
  const result = await publicAPI.get(`/valorant-match/timeline/${timelineId}`)
  return result.data
}

// async function fetchAllChangelog(): Promise<IValorantMatchDetail[]> {
//   const result = await publicAPI.get(`/changelog/all`)
//   return result.data
// }

export { fetchValorantMatchByTimeline }
