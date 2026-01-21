'use client'

import React, { useState } from 'react'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface BottomSheetDatePickerProps {
  selectedDay: number
  selectedMonth: number
  selectedYear: number
  onSelectDay: (day: number) => void
  onClose: () => void
  onMonthChange: (delta: number) => void
}

const BottomSheetDatePicker: React.FC<BottomSheetDatePickerProps> = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  onSelectDay,
  onClose,
  onMonthChange,
}) => {
  const totalDays = new Date(selectedYear, selectedMonth + 1, 0).getDate()
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay()
  const daysArray: (number | null)[] = Array(firstDayOfWeek).fill(null)
  for (let i = 1; i <= totalDays; i++) daysArray.push(i)

  return (
    <div className="px-4 pb-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => onMonthChange(-1)}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        <p className="text-lg font-bold text-gray-900 dark:text-white">
          {monthNames[selectedMonth]} {selectedYear}
        </p>

        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => onMonthChange(1)}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Week Header */}
      <div className="grid grid-cols-7 mb-2 text-center text-xs font-bold text-gray-400 dark:text-gray-500">
        {weekNames.map((d, idx) => (
          <div key={`${d}-${idx}`} className="h-10 flex items-center justify-center">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-1">
        {daysArray.map((day, idx) => {
          if (day === null) return <div key={`empty-${idx}`} />
          const isSelected = day === selectedDay
          return (
            <button
              key={day}
              className="h-11 flex items-center justify-center text-sm"
              onClick={() => onSelectDay(day)}
            >
              {isSelected ? (
                <div className="size-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                  {day}
                </div>
              ) : (
                <span className="text-gray-900 dark:text-white">{day}</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-4 flex gap-3">
        <button
          className="flex-1 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="flex-1 h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20"
          onClick={onClose}
        >
          Apply
        </button>
      </div>
    </div>
  )
}

const DatePicker: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState(22)
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [selectedYear, setSelectedYear] = useState(2026)

  const formatDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day)
    const weekday = weekNames[date.getDay()]
    return `${year}/${(month + 1).toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')} (${weekday})`
  }

  const handleMonthChange = (delta: number) => {
    let newMonth = selectedMonth + delta
    let newYear = selectedYear

    if (newMonth < 0) {
      newMonth = 11
      newYear -= 1
    } else if (newMonth > 11) {
      newMonth = 0
      newYear += 1
    }

    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
    setSelectedDay(1)
  }

  return (
    <div className="relative p-4">
      {/* 日付クリック部分 */}
      <div
        className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
          open ? '' : 'h-8'
        }`}
        onClick={() => setOpen(true)}
      >
        <span className="text-black dark:text-white text-xl">
          {formatDate(selectedDay, selectedMonth, selectedYear)}　　v
        </span>
        {!open && <div className="self-stretch bg-[#AEAEB2] h-[1px]" />}
      </div>

      {/* BottomSheet 表示 */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)] animate-slideUp">
            <BottomSheetDatePicker
              selectedDay={selectedDay}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onSelectDay={(day) => setSelectedDay(day)}
              onClose={() => setOpen(false)}
              onMonthChange={handleMonthChange}
            />
          </div>
        </>
      )}

      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
        `}
      </style>
    </div>
  )
}

export default DatePicker

