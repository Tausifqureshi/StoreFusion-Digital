import React, { useState } from 'react';

export function CustomCalendar({ selectedDate, onChange, isDark }) {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const safeDate = selectedDate || new Date();

  const [currentMonthDate, setCurrentMonthDate] = useState(safeDate);
  const currentMonth = monthNames[currentMonthDate.getMonth()];
  const currentYear = currentMonthDate.getFullYear();
  
  const firstDay = new Date(currentYear, currentMonthDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonthDate.getMonth() + 1, 0).getDate();
  
  const prevMonth = () => setCurrentMonthDate(new Date(currentYear, currentMonthDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonthDate(new Date(currentYear, currentMonthDate.getMonth() + 1, 1));

  // 🔥 NEW CLEAN GRID (NO FOR LOOP)
  const totalCells = 42;

  const grid = Array.from({ length: totalCells }, (_, index) => {
    const day = index - firstDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  return (
    <div className={`p-4 w-64 ${isDark ? 'bg-[#1a1f2e] text-gray-300' : 'bg-white text-gray-800'}`}>
      
      <div className="flex justify-between items-center mb-4 px-2">
        <button onClick={prevMonth} aria-label="Previous Month" className="text-gray-400 hover:text-black dark:hover:text-white font-black cursor-pointer px-2 py-1">&lt;</button>
        
        <div className="font-bold text-sm tracking-wide">
          {currentMonth} {currentYear}
        </div>
        
        <button onClick={nextMonth} aria-label="Next Month" className="text-gray-400 hover:text-black dark:hover:text-white font-black cursor-pointer px-2 py-1">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {days.map(d => (
          <div key={d} className={`text-[10px] font-black uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {d}
          </div>
        ))}
      </div>

      {/* 🔥 SIMPLE GRID RENDER */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {grid.map((day, index) => {
          const isSelected =
            day === safeDate.getDate() &&
            currentMonthDate.getMonth() === safeDate.getMonth() &&
            currentMonthDate.getFullYear() === safeDate.getFullYear();

          return (
            <div key={index} className="h-7 w-7 mx-auto">
              {day && (
                <button
                  onClick={() =>
                    onChange(new Date(currentYear, currentMonthDate.getMonth(), day))
                  }
                  className={`w-full h-full rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all ${
                    isSelected
                      ? "bg-orange-500 text-white shadow-md"
                      : isDark
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
