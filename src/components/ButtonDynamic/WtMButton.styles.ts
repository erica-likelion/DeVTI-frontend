import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'S', 'XXS', 'S')}
  justify-content: center;
  align-items: center;
  border: none;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  cursor: pointer;
  ${({ theme }) => theme.fonts.heading.h4};
  
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary.VT100};
    color: ${({ theme }) => theme.colors.grayScale.black};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }

  ${({ $isClicked, theme }) => $isClicked && `
    background-color: ${theme.colors.secondary.VT100};
    color: ${theme.colors.secondary.VT700};
  `}
`;