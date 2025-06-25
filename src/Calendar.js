import React, { useState } from "react";
import dayjs from "dayjs";
import "./Calendar.css";

const Calendar = () => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today.startOf("month"));

  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").day(); // 0 (Sunday) to 6 (Saturday)

  const generateCalendarDays = () => {
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    // Current month dates
    for (let d = 1; d <= daysInMonth; d++) {
      const thisDay = currentMonth.date(d);
      const isToday = thisDay.isSame(today, "day");
      days.push(
        <div
          key={d}
          className={`calendar-cell ${isToday ? "today" : ""}`}
        >
          {d}
        </div>
      );
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>

      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-cell weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
