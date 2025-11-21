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
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  icon?: React.ReactNode | null;
  hasIcon?: boolean; // 아이콘 유무에 따른 패딩 조절용
  onIconClick?: () => void;
  showCalendar?: boolean;
  onDateSelect?: (date: string) => void;
  maxLength?: number;
  variant?: 'input' | 'output'; // input: 인터랙티브 모드, output: 읽기 전용 출력 모드
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
      required = false,
      name,
      id,
      icon,
      hasIcon = false,
      onIconClick,
      showCalendar = false,
      onDateSelect,
      maxLength,
      variant = 'input', // 기본값은 input 모드
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

    // hasIcon이 true이면 기본 아이콘 사용, 커스텀 아이콘이 있으면 그것 사용
    const defaultIcon = <img src={CalendarBlack} alt="calendar" />;
    const displayIcon = hasIcon ? (icon || defaultIcon) : null;
    const showIcon = hasIcon;
    const hasValue = Boolean(value || defaultValue);
    const isOutput = variant === 'output';
    const isActive = hasValue || !isOutput;
    
    return (
      <S.Container>
        <S.InputWrapper $hasIcon={hasIcon}>
          <S.ContentWrapper>
            <S.StyledInput
              ref={ref}
              type={type}
              placeholder={isOutput ? undefined : placeholder} // output 모드에서는 placeholder 제거
              value={value} 
              defaultValue={defaultValue} 
              onChange={isOutput ? undefined : handleChange} // output 모드에서는 onChange 제거
              disabled={disabled} 
              readOnly={isOutput}
              required={isOutput ? false : required} // output 모드에서는 required 제거
              name={name}
              id={id}
              maxLength={maxLength}
              $hasIcon={hasIcon}
              $isActive={isActive}
              $readOnly={isOutput}
              $variant={variant}
              {...rest}
            />
          </S.ContentWrapper>
          {showIcon && (
            <S.IconContainer 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleIconClick();
              }}
              style={{ cursor: (onIconClick || showCalendar) ? 'pointer' : 'default' }}
            >
              {displayIcon}
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