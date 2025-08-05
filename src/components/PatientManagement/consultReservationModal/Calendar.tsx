import React, { useState, useRef } from 'react';
import dayjs from 'dayjs';
import GoIcon from '/src/assets/Calendar/go-calc.svg';
import BackCalcIcon from '/src/assets/Calendar/back-calc.svg';

interface CalendarProps {
  selectedDate: dayjs.Dayjs | null;
  onDateSelect: (date: dayjs.Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const calendarDays: dayjs.Dayjs[] = [];
  let day = startDate;
  while (day.isBefore(endDate) || day.isSame(endDate)) {
    calendarDays.push(day);
    day = day.add(1, 'day');
  }

  const handlePrevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, 'month'));
  };

  const handleYearClick = () => {
    setShowYearSelect((prev) => !prev);
    setShowMonthSelect(false);
  };

  const handleMonthClick = () => {
    setShowMonthSelect((prev) => !prev);
    setShowYearSelect(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(currentDate.year(year));
    setShowYearSelect(false);
  };

  const handleMonthSelect = (month: number) => {
    setCurrentDate(currentDate.month(month));
    setShowMonthSelect(false);
  };

  const handleDateClick = (day: dayjs.Dayjs) => {
    onDateSelect(day); // 부모로 날짜 전달
  };

  const years = Array.from({ length: 10 }, (_, i) => currentDate.year() - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i);

  const isToday = (date: dayjs.Dayjs) => date.isSame(today, 'day');
  const isSelected = (date: dayjs.Dayjs) => selectedDate?.isSame(date, 'day');
  const isCurrentMonth = (date: dayjs.Dayjs) => date.month() === currentDate.month();

  return (
    <div className='w-[740px] h-[441px] relative mt-[-20px]'>
      <div className='flex justify-center items-center gap-[28px] mb-[24px]'>
        <button onClick={handlePrevMonth}>
          <img src={BackCalcIcon} className='w-[34px] h-[29px]' />
        </button>

        <div className='inline-flex px-[10px] gap-[10px] items-center text-[#121218] text-[14px] font-light leading-[22px] tracking-[-0.42px] relative'>
          <div onClick={handleYearClick} className='cursor-pointer relative' ref={yearRef}>
            {currentDate.year()}년
            {showYearSelect && (
              <div className='absolute bottom-0 left-0 translate-y-full inline-flex h-[308px] p-[8px_10px] flex-col justify-between bg-white z-10 rounded shadow-md'>
                {years.map((year) => (
                  <div
                    key={year}
                    className='flex w-[32px] h-[22px] justify-center items-center cursor-pointer hover:font-bold'
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            onClick={handleMonthClick}
            className='w-[40px] h-[24px] flex items-center justify-center text-[20px] font-medium cursor-pointer relative'
            ref={monthRef}
          >
            {currentDate.month() + 1}월
            {showMonthSelect && (
              <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full flex w-[68px] p-[8px] flex-col items-center text-[16px] gap-[4px] bg-white z-10 rounded shadow-md'>
                {months.map((month) => (
                  <div
                    key={month}
                    className='flex w-[34px] h-[24px] justify-center items-center cursor-pointer hover:font-bold'
                    onClick={() => handleMonthSelect(month)}
                  >
                    {month + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button onClick={handleNextMonth}>
          <img src={GoIcon} className='w-[34px] h-[29px]' />
        </button>
      </div>

      <div className='flex flex-col w-[376px] h-[317px] mx-auto justify-start items-start gap-[16px]'>
        <div className='flex w-full justify-between items-center gap-[16px]'>
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => (
            <div
              key={i}
              className='text-[#75787B] text-[14px] font-medium leading-[24px] tracking-[-0.42px] w-[34px] text-center'
            >
              {day}
            </div>
          ))}
        </div>

        <div className='flex flex-col w-full justify-start items-start gap-[16px]'>
          {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, rowIndex) => (
            <div key={rowIndex} className='flex w-full justify-between items-center gap-[16px]'>
              {calendarDays.slice(rowIndex * 7, rowIndex * 7 + 7).map((date, i) => {
                const isTodayDate = isToday(date);
                return (
                  <div
                    key={i}
                    className={`flex w-[40px] h-[40px] p-[10px] justify-center items-center text-[16px] font-light tracking-[-0.48px] cursor-pointer
                      ${isSelected(date) ? 'bg-black text-white rounded-full' : ''}
                      ${isTodayDate ? 'border border-[#1D68FF] bg-white rounded-[60px]' : ''}
                      ${!isCurrentMonth(date) ? 'text-[#C5C8CB]' : 'text-[#121218]'}
                    `}
                    onClick={() => handleDateClick(date)}
                  >
                    {date.date()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
