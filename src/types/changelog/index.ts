export const changelogTypeKeys = {
  ADD: 'ADD',
  FIX: 'FIX',
} as const

interface IChangelogItem {
  date: string

  type: ChangelogTypeUnion

  description: string
}

interface IChangelogDateGrouped {
  date: string

  changes: IChangelogItem[]
}

type ChangelogTypeUnion =
  (typeof changelogTypeKeys)[keyof typeof changelogTypeKeys]

export type { ChangelogTypeUnion, IChangelogDateGrouped }
