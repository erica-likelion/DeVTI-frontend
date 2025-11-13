import styled from 'styled-components';

export const StyledButton = styled.button`
  ${({ theme }) => theme.fonts.heading.h4}
  display: flex;
  width: 8.25rem;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: ${({ theme }) => theme.borders.sharp};
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  color: ${({ theme }) => theme.colors.grayScale.black};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    border-radius: ${({ theme }) => theme.borders.sharp};
    background: ${({ theme }) => theme.colors.secondary.VT100};
  }

  &:focus:not(:disabled), &.clicked {
    background: ${({ theme }) => theme.colors.secondary.VT100};
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${({ theme }) => theme.media.mobile} {
    width: auto;
    min-width: 8.25rem;
  }
`;