import styled from 'styled-components';

export const StyledButton = styled.button<{ $isClicked?: boolean }>`
  ${({ theme }) => theme.fonts.heading.h4}
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  border: none;
  border-radius: ${({ theme }) => theme.borders.sharp};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};

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