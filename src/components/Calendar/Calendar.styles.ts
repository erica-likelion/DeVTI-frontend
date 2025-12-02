import styled from 'styled-components';

export const CalendarContainer = styled.div`
  position: fixed;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.grayScale.white};
  ${({ theme }) => theme.responsive.property.borderRadius('soft')}
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS300};
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('M', 'L', 'M', 'L')}
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.responsive.gap('S')};
  width: 100%;

  ${({ theme }) => theme.media.desktop} {
    margin-bottom: ${({ theme }) => theme.responsive.gap('S', 'desktop')};
  }

  ${({ theme }) => theme.media.tablet} {
    margin-bottom: ${({ theme }) => theme.responsive.gap('S', 'tablet')};
  }

  ${({ theme }) => theme.media.mobile} {
    margin-bottom: ${({ theme }) => theme.responsive.gap('S', 'mobile')};
  }
`;

export const NavContainer = styled.div`
  display: flex;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  align-items: center;
`;

export const NavButton = styled.button`
  display: flex;
  ${({ theme }) => theme.responsive.property.padding('XXS')}
  justify-content: center;
  align-items: center;
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


export const TimeSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.responsive.gap('S')};
  gap: ${({ theme }) => theme.responsive.gap('XXS')};

  ${({ theme }) => theme.media.desktop} {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'desktop')};
    gap: ${({ theme }) => theme.responsive.gap('XXS', 'desktop')};
  }

  ${({ theme }) => theme.media.tablet} {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'tablet')};
    gap: ${({ theme }) => theme.responsive.gap('XS', 'tablet')};
  }

  ${({ theme }) => theme.media.mobile} {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'mobile')};
    gap: ${({ theme }) => theme.responsive.gap('XXS', 'mobile')};
  }
`;

export const TimeLabel = styled.label`
  ${({ theme }) => theme.fonts.heading.h3}
  color: ${({ theme }) => theme.colors.grayScale.black};
`;



export const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.responsive.gap('S')};

  ${({ theme }) => theme.media.desktop} {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'desktop')};
  }

  ${({ theme }) => theme.media.tablet} {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'tablet')};
  }

  ${({ theme }) => theme.media.mobile} {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'mobile')};
  }
`;

