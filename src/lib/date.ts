import { IValorantMatchDetail } from '@/types/valorant'

export function transDateFormat(value: string) {
  const date = new Date(value)

  const weekdayNames = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ]
  const dayOfWeek = weekdayNames[date.getDay()]

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const formattedDate = ` ${year}년 ${month}월 ${day}일 ${dayOfWeek}`

  return formattedDate
}

export function groupMatchesByDate(matches: IValorantMatchDetail[]) {
  return matches.reduce<Record<string, IValorantMatchDetail[]>>(
    (acc, match) => {
      const date = new Date(match.date)
      const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000)
      const dateKey = kstDate.toISOString().split('T')[0] // YYYY-MM-DD
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(match)
      return acc
    },
    {},
  )
}
