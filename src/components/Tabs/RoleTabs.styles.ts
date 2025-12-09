import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  ${({ theme }) => theme.responsive.property.width('max')}
  ${({ theme }) => theme.responsive.property.gap('R')}
  align-items: center;
  padding-bottom: 0.5rem; /* indicator 공간 확보 */
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  ${({ theme }) => theme.responsive.property.paddingComplex('XS', 'R', 'XS', 'R')}
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.heading.h4};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary.VT500};
  }
`;

export const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 0.25rem;
  background: ${({ theme }) => theme.colors.primary.VT500};
  transition: 0.25s ease;
`;
