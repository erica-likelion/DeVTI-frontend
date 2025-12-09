import React, { forwardRef, useState, useEffect, useRef } from 'react';
import * as S from './InputField.styles';
import CalendarBlack from '../../assets/icons/Calendar/CalendarBlack.svg';
import Calendar from '../Calendar/Calendar';

interface InputFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'date' | 'time';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  multiline?: boolean; // 줄바꿈 허용 여부
  rows?: number; // textarea의 초기 행 수 (multiline이 true일 때만 적용)
}

const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFieldProps>(
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
      multiline = false,
      rows = 1,
      ...rest // 확장성 확보용 props
    },
    ref
  ) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const handleIconClick = () => {
      if (showCalendar) {
        setIsCalendarOpen(true);
      }
      onIconClick?.();
    };
    
    const adjustTextareaHeight = () => {
      const textarea = textareaRef.current;
      if (textarea && multiline) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };
    
    useEffect(() => {
      if (multiline) {
        adjustTextareaHeight();
      }
    }, [value, multiline]);
    
    const handleDateSelect = (date: string) => {
      onDateSelect?.(date);
      setIsCalendarOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange?.(e);
      if (multiline) {
        setTimeout(adjustTextareaHeight, 0);
      }
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
            {multiline ? (
              <S.StyledTextarea
                ref={(el) => {
                  textareaRef.current = el;
                  if (typeof ref === 'function') {
                    ref(el);
                  } else if (ref) {
                    (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                  }
                }}
                placeholder={isOutput ? undefined : placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={isOutput ? undefined : handleChange}
                disabled={disabled}
                readOnly={isOutput}
                required={isOutput ? false : required}
                name={name}
                id={id}
                maxLength={maxLength}
                rows={rows}
                $hasIcon={hasIcon}
                $isActive={isActive}
                $readOnly={isOutput}
                $variant={variant}
                {...rest}
              />
            ) : (
              <S.StyledInput
                ref={ref as React.ForwardedRef<HTMLInputElement>}
                type={type}
                placeholder={isOutput ? undefined : placeholder}
                value={value} 
                defaultValue={defaultValue} 
                onChange={isOutput ? undefined : handleChange}
                disabled={disabled} 
                readOnly={isOutput}
                required={isOutput ? false : required}
                name={name}
                id={id}
                maxLength={maxLength}
                $hasIcon={hasIcon}
                $isActive={isActive}
                $readOnly={isOutput}
                $variant={variant}
                {...rest}
              />
            )}
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