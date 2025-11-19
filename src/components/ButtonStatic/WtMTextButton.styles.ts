import styled from 'styled-components';

export const StyledButton = styled.button<{ $isClicked?: boolean }>`
  ${({ theme }) => theme.fonts.heading.h4}
  display: flex;
  padding: ${({ theme }) => theme.responsive.padding('XXS')} 0;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  border: none;
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  
  ${({ theme }) => theme.responsive.property.width('min')}
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT100};
    color: ${({ theme }) => theme.colors.grayScale.black};
  }

  ${({ $isClicked, theme }) => 
    $isClicked && `
      background: ${theme.colors.secondary.VT100};
      color: ${theme.colors.secondary.VT700};
    `}

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    background: ${({ theme }) => theme.colors.grayScale.white};
    cursor: not-allowed;
  }
`;