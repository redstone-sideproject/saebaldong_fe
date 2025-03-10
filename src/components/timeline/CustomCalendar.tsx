'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

function CustomCalendar() {
  const [date, setDate] = useState<Date[] | undefined>([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 3)),
    new Date(new Date().setDate(new Date().getDate() + 7)),
    new Date(new Date().setDate(new Date().getDate() - 30)),
  ])

  const handleSelectDay = (dates: Date[] | undefined) => {
    if (!dates) {
      return
    }
    console.log(dates.at(-1))
    console.log('efef')
  }
  console.log(date)
  return (
    <div className="bg-card flex flex-col space-y-1 rounded-2xl p-3">
      <Calendar
        mode="multiple"
        selected={date}
        onSelect={(e) => handleSelectDay(e)}
      />
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-primary hover:text-card mt-3 cursor-pointer text-xs"
        // onClick={() => setDate([])}
      >
        모든 기록 보기
      </Button>
    </div>
  )
}

export default CustomCalendar
