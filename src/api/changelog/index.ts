import publicAPI from '@/api/publicAPI'
import { IChangelogDateGrouped } from '@/types/changelog'

async function fetchRecentChangelog(): Promise<IChangelogDateGrouped[]> {
  const result = await publicAPI.get(`/changelog/recent`)
  return result.data
}

async function fetchAllChangelog(): Promise<IChangelogDateGrouped[]> {
  const result = await publicAPI.get(`/changelog/all`)
  return result.data
}

export { fetchRecentChangelog, fetchAllChangelog }
