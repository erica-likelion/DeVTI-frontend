import React, { useState } from 'react';
import * as S from './Calendar.styles';
import InputField from '../Input/InputField';
import ArrowLeft from '../../assets/icons/Calendar/ArrowLeft.svg';
import ArrowRight from '../../assets/icons/Calendar/ArrowRight.svg';
import { processTimeInput } from '../../utils/timeValidation';
import NumButton from '../ButtonStatic/NumButton';
import BkMTextButton from '../ButtonStatic/BkMTextButton';

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose, onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);


  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();


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

  // 날짜 선택 핸들러 (달력 닫지 않음)
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 제거하여 날짜만 비교
    selectedDate.setHours(0, 0, 0, 0);
    
    // 오늘 이전 날짜는 선택 불가
    if (selectedDate < today) {
      return;
    }
    
    setTempSelectedDate(selectedDate);
    // 날짜만 선택했을 때는 업데이트하지 않음
  };

  // 시간 변경 핸들러
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    
    // 숫자와 : 만 입력허용
    const filteredTime = newTime.replace(/[^\d:]/g, '');
    
    // 최대 길이 5자리(HH:MM)로 제한
    if (filteredTime.length > 5) {
      return;
    }
    
    let formattedTime = filteredTime;
    
    // 4자리 연속 숫자가 입력된 경우에만 자동 포맷팅
    if (/^\d{4}$/.test(filteredTime)) {
      // 1434 -> 14:34 
      const hour = filteredTime.slice(0, 2);
      const minute = filteredTime.slice(2, 4);
      const tempTime = `${hour}:${minute}`;
      const result = processTimeInput(tempTime);
      formattedTime = result.isValid ? result.formattedTime : tempTime;
    } else {
      
      formattedTime = filteredTime;
    }
    
    setSelectedTime(formattedTime);
  };



  const updateDateTime = (date: Date, time: string) => {
    const formattedDate = date.toLocaleDateString('ko-KR');
    const result = processTimeInput(time);
    const finalTime = result.isValid ? result.formattedTime : time;
    const dateTimeString = `${formattedDate} ${finalTime}`;
    onDateSelect(dateTimeString);
  };

  // 달력 날짜 생성
  const generateCalendarDays = (): Array<{
    date: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isPastDate: boolean;
    isSelected: boolean;
    fullDate: Date;
  }> => {
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
      
      // 오늘 날짜와 정확히 비교하기 위해 시간을 제거 (오늘 날짜가 비활성화 되는 문제 해결)
      const currentDateOnly = new Date(currentDate);
      const todayOnly = new Date(today);
      currentDateOnly.setHours(0, 0, 0, 0);
      todayOnly.setHours(0, 0, 0, 0);
      
      const isPastDate = currentDateOnly < todayOnly;
      const isSelected = !!(selectedDate && currentDate.toLocaleDateString('ko-KR') === selectedDate.split(' ')[0]) ||
                        !!(tempSelectedDate && currentDate.toDateString() === tempSelectedDate.toDateString());

      days.push({
        date: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isPastDate,
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
    <S.CalendarContainer>
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
          <NumButton
            key={index}
            onClick={() => day.isCurrentMonth && !day.isPastDate && handleDateClick(day.date)}
            disabled={!day.isCurrentMonth || day.isPastDate}
            isSelected={day.isSelected}
          >
            {day.date}
          </NumButton>
        ))}
      </S.DaysGrid>
      
      <S.TimeSection>
        <S.TimeLabel>시각</S.TimeLabel>
        <InputField
          type="text"
          value={selectedTime}
          onChange={handleTimeChange}
          placeholder="23:59"
          icon={null}
          maxLength={5}
        />
      </S.TimeSection>

      <S.ButtonSection>
        <BkMTextButton 
          onClick={() => {
            if (tempSelectedDate && selectedTime) {
              updateDateTime(tempSelectedDate, selectedTime);
              onClose();
            }
          }}
          disabled={!tempSelectedDate || !selectedTime}
        >
          저장
        </BkMTextButton>
      </S.ButtonSection>

    </S.CalendarContainer>
  );
};

export default Calendar;