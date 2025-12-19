import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XS', 'M', 'XS', 'R')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('S')}
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  ${({ theme }) => theme.fonts.heading.h3};
  color: ${({ theme }) => theme.colors.secondary.VT700};
  border: none;
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS200_VT};

  
  &:hover {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : theme.colors.secondary.VT500};
    color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.gray300 : theme.colors.grayScale.white};
  }

  &:active {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : theme.colors.secondary.VT700};
    color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.gray300 : theme.colors.grayScale.white};
  }

  &:disabled {
    box-shadow: none;
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    
  }

  ${({ $isClicked, theme }) => $isClicked && `
    background-color: ${theme.colors.grayScale.white};
  `}
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.sourceSize('M')}
  flex-shrink: 0;
  background-image: url('/DefaultIMG_Profile.webp');
  background-size: cover;
  background-position: center;

`;