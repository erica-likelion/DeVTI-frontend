import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  border-radius: ${({ theme }) => theme.borders.sharp};
  ${({ theme }) => theme.fonts.heading.h4};
  color: ${({ theme }) => theme.colors.grayScale.black};
  
  &:hover {
    color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.black : theme.colors.secondary.VT700};
  }

  &:active {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : theme.colors.secondary.VT100};
    color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.black : theme.colors.grayScale.black};
  }

  ${({ $isClicked, theme }) => $isClicked && `
    background-color: ${theme.colors.secondary.VT100};
    color: ${theme.colors.secondary.VT700};
  `}

`;