export const changelogTypeKeys = {
  ADD: 'ADD',
  FIX: 'FIX',
} as const

interface IChangelogItem {
  date: string

  type: ChangelogTypeUnion

  description: string
}

interface IChangelogItemForAdmin extends IChangelogItem {
  changelogId: number
}

interface IChangelogDateGrouped {
  date: string

  changes: IChangelogItem[]
}

type ChangelogTypeUnion =
  (typeof changelogTypeKeys)[keyof typeof changelogTypeKeys]

export type {
  ChangelogTypeUnion,
  IChangelogDateGrouped,
  IChangelogItemForAdmin,
}
