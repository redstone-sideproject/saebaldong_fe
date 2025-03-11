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
