import privateAPI from '@/api/privateAPI'
import publicAPI from '@/api/publicAPI'
import { TChangelogSchema } from '@/constants/schemas/changelogSchema'
import {
  IChangelogDateGrouped,
  IChangelogItemForAdmin,
} from '@/types/changelog'

async function fetchRecentChangelog(): Promise<IChangelogDateGrouped[]> {
  const result = await publicAPI.get(`/changelog/recent`)
  return result.data
}

async function fetchAllChangelog(): Promise<IChangelogDateGrouped[]> {
  const result = await publicAPI.get(`/changelog/all`)
  return result.data
}

async function fetchAllchangelogForAdmin(): Promise<IChangelogItemForAdmin[]> {
  const result = await privateAPI.get(`/changelog/admin/all`)
  return result.data
}

async function fetchChangelogForAdmin(
  changelogId: number,
): Promise<IChangelogItemForAdmin> {
  const result = await privateAPI.get(`/changelog/admin/${changelogId}`)
  return result.data
}

async function addChangelog(payload: TChangelogSchema): Promise<void> {
  await privateAPI.post(`/changelog`, payload)
}

async function updateChangelog(params: {
  changelogId: number
  payload: TChangelogSchema
}): Promise<void> {
  await privateAPI.patch(`/changelog/${params.changelogId}`, params.payload)
}

async function deleteChangelog(changelogId: number): Promise<void> {
  await privateAPI.delete(`/changelog/${changelogId}`)
}

export {
  fetchRecentChangelog,
  fetchAllChangelog,
  fetchAllchangelogForAdmin,
  fetchChangelogForAdmin,
  addChangelog,
  updateChangelog,
  deleteChangelog,
}
