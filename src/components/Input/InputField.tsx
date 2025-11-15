import React, { forwardRef, useState } from 'react';
import * as S from './InputField.styles';
import CalendarBlack from '../../assets/icons/Calendar/CalendarBlack.svg';
import Calendar from '../Calendar/Calendar';

interface InputFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'date' | 'time';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  icon?: React.ReactNode | null;
  onIconClick?: () => void;
  showCalendar?: boolean;
  onDateSelect?: (date: string) => void;
  maxLength?: number;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type = 'text',
      placeholder,
      value, //제어용 컴포넌트 값
      defaultValue, //비제어 컴포넌트용 값
      onChange,
      disabled = false,
      readOnly = false, // 읽기 전용 상태 (불필요시 삭제 -> 이후 텍스트 버튼에 쓸지 고민)
      required = false,
      name,
      id,
      icon = <img src={CalendarBlack} alt="calendar" />,
      onIconClick,
      showCalendar = false,
      onDateSelect,
      maxLength,
      ...rest // 확장성 확보용 props
    },
    ref
  ) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    
    const handleIconClick = () => {
      if (showCalendar) {
        setIsCalendarOpen(true);
      }
      onIconClick?.();
    };
    
    const handleDateSelect = (date: string) => {
      onDateSelect?.(date);
      setIsCalendarOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };
    return (
      <S.Container>
        <S.InputWrapper $hasIcon={icon !== null && icon !== undefined}>
          <S.StyledInput
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value} 
            defaultValue={defaultValue} 
            onChange={handleChange}
            disabled={disabled} 
            readOnly={readOnly}
            required={required}
            name={name}
            id={id}
            maxLength={maxLength}
            $hasIcon={icon !== null && icon !== undefined}
            {...rest}
          />
          {icon !== null && icon !== undefined && (
            <S.IconContainer 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleIconClick();
              }}
              style={{ cursor: (onIconClick || showCalendar) ? 'pointer' : 'default' }}
            >
              {icon}
            </S.IconContainer>
          )}
          {showCalendar && (
            <Calendar
              isOpen={isCalendarOpen}
              onClose={() => setIsCalendarOpen(false)}
              onDateSelect={handleDateSelect}
              selectedDate={value}
            />
          )}
        </S.InputWrapper>
      </S.Container>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;