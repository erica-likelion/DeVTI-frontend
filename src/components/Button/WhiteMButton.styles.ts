import styled from 'styled-components';

export const StyledButton = styled.button`
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

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT100};
  }

  &:focus:not(:disabled), &.clicked {
    background: ${({ theme }) => theme.colors.secondary.VT100};
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;