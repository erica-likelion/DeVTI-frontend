import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  padding: 0.25rem 0.75rem 0.25rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  border-radius: ${({ theme }) => theme.borders.sharp};
  ${({ theme }) => theme.fonts.heading.h4};
  color: ${({ theme }) => theme.colors.secondary.VT700};
  border: none;
  box-shadow: none;
  
  &:hover {
    box-shadow: ${({ theme, disabled }) => 
      disabled ? 'none' : theme.effects.dropShadows.DS200_VT};
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : theme.colors.grayScale.white};
    color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.gray300 : theme.colors.secondary.VT700};
  }

  &:active {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : theme.colors.secondary.VT500};
    color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.gray300 : theme.colors.grayScale.white};
  }

  &:disabled {
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
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  background-image: url('/DefaultIMG_Profile.webp');
  background-size: cover;
  background-position: center;
  
  img {
    width: 100%;
    height: 100%;
  }
`;