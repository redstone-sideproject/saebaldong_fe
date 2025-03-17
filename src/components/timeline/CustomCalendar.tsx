'use client'

import { useQuery } from '@tanstack/react-query'

import { fetchTimelinesDate } from '@/api/timeline'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

interface ICustomCalendarProps {
  onDateSelect: (date: Date | null) => void
}
function CustomCalendar({ onDateSelect }: ICustomCalendarProps) {
  const { data, isSuccess } = useQuery({
    queryKey: ['timelinesDate'],
    queryFn: fetchTimelinesDate,
    staleTime: 1000 * 60,
  })

  const handleSelectDay = (date: Date | undefined) => {
    if (!date || !isSuccess) {
      onDateSelect(null)
      return
    }

    if (!data.some((el) => el.toISOString() === date.toISOString())) {
      onDateSelect(null)
      return
    }

    onDateSelect(date)
    return
  }

  return (
    <div className="bg-card flex flex-col space-y-1 rounded-2xl p-3">
      <Calendar
        mode="multiple"
        selected={isSuccess ? data : undefined}
        onSelect={(_, selectedDay) => handleSelectDay(selectedDay)}
      />
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-primary hover:text-card mt-3 cursor-pointer text-xs"
        onClick={() => onDateSelect(null)}
      >
        모든 기록 보기
      </Button>
    </div>
  )
}

export default CustomCalendar
