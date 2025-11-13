import React, { useState, useEffect, useRef } from 'react';
import * as S from './Calendar.styles';
import InputField from '../Input/InputField';
import ArrowLeft from '../../assets/icons/Calendar/ArrowLeft.svg';
import ArrowRight from '../../assets/icons/Calendar/ArrowRight.svg';

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose, onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');
  const calendarRef = useRef<HTMLDivElement>(null);


  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 달력 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // 이전/다음 달로 이동
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // 날짜 선택 핸들러
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    const formattedDate = selectedDate.toLocaleDateString('ko-KR');
    const dateTimeString = `${formattedDate} ${selectedTime}`;
    onDateSelect(dateTimeString);
    onClose();
  };

  // 달력 날짜 생성
  const generateCalendarDays = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const currentMonth = month;
    
    // 첫 번째 주 계산
    const firstWeekStart = new Date(firstDay);
    firstWeekStart.setDate(firstWeekStart.getDate() - firstDay.getDay());
    
    // 마지막 주 계산
    const lastWeekEnd = new Date(lastDay);
    lastWeekEnd.setDate(lastWeekEnd.getDate() + (6 - lastDay.getDay()));
    
    // 시작일부터 끝일까지 날짜 생성
    const currentDate = new Date(firstWeekStart);
    
    while (currentDate <= lastWeekEnd) {
      const isCurrentMonth = currentDate.getMonth() === currentMonth;
      const isToday = currentDate.toDateString() === today.toDateString();
      const isSelected = selectedDate && currentDate.toLocaleDateString('ko-KR') === selectedDate;

      days.push({
        date: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        fullDate: new Date(currentDate)
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  if (!isOpen) return null;

  return (
    <S.CalendarContainer ref={calendarRef}>
      <S.Header>
        <S.MonthYear>{year}. {String(month + 1).padStart(2, '0')}</S.MonthYear>
        <S.NavContainer>
          <S.NavButton onClick={() => navigateMonth('prev')}>
            <img src={ArrowLeft} alt="이전 달" />
          </S.NavButton>
          <S.NavButton onClick={() => navigateMonth('next')}>
            <img src={ArrowRight} alt="다음 달" />
          </S.NavButton>
        </S.NavContainer>
      </S.Header>
      
      
      <S.DaysGrid $rows={Math.ceil(calendarDays.length / 7)}>
        {calendarDays.map((day, index) => (
          <S.DayCell
            key={index}
            $isToday={day.isToday}
            $isSelected={!!day.isSelected}
            onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
          >
            {day.date}
          </S.DayCell>
        ))}
      </S.DaysGrid>
      
      <S.TimeSection>
        <S.TimeLabel>시간</S.TimeLabel>
        <S.TimeInputWrapper>
          <InputField
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            icon={null}
          />
        </S.TimeInputWrapper>
      </S.TimeSection>
    </S.CalendarContainer>
  );
};

export default Calendar;