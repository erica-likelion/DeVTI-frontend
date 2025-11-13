import styled from 'styled-components';

export const CalendarContainer = styled.div`
  position: fixed;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.grayScale.white};
  border-radius: ${({ theme }) => theme.borders.soft};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS300};
  display: inline-flex;
  padding: 1.25rem 1.75rem;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const NavContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const NavButton = styled.button`
  display: flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  
  img {
    padding: 0.27rem 0.52rem;
  }

`;

export const MonthYear = styled.div`
  ${({ theme }) => theme.fonts.heading.h3}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const DaysGrid = styled.div<{ $rows: number }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(${({ $rows }) => $rows}, 1fr);
`;

export const DayCell = styled.div<{
  $isToday: boolean;
  $isSelected: boolean;
  $isCurrentMonth: boolean;
  $isPastDate?: boolean;
}>`
  ${({ theme }) => theme.fonts.body.m400}
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: ${({ $isCurrentMonth, $isPastDate }) => 
    $isCurrentMonth && !$isPastDate ? 'pointer' : 'not-allowed'};
  
  /* 기본 색상 */
  color: ${({ theme, $isCurrentMonth, $isPastDate }) => {
    if ($isPastDate) return theme.colors.grayScale.gray200;
    return $isCurrentMonth ? theme.colors.grayScale.black : theme.colors.grayScale.gray300;
  }};



  /* 선택된 날짜 스타일 */
  ${({ $isSelected, $isToday, theme }) => $isSelected && !$isToday && `
    background-color: ${theme.colors.secondary.VT100};
    color: ${theme.colors.grayScale.black};
    box-shadow: ${theme.effects.dropShadows.DS200_VT};
  `}

  /* 오늘 날짜가 선택된 경우 */
  ${({ $isSelected, $isToday, theme }) => $isSelected && $isToday && `
    background-color: ${theme.colors.secondary.VT100};
    color: ${theme.colors.grayScale.black};
    box-shadow: ${theme.effects.dropShadows.DS200_VT};
  `}
  }`;

export const TimeSection = styled.div`
  display: flex;
  width:100%;
  flex-direction: column;
  margin-top:1rem;
  gap: 0.5rem;
`;

export const TimeLabel = styled.label`
  ${({ theme }) => theme.fonts.heading.h3}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const TimeInputWrapper = styled.div`
  input::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray700};
  }
`;

