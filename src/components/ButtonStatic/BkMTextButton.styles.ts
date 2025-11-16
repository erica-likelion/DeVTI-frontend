import styled from 'styled-components';

export const StyledButton = styled.button`
  ${({ theme }) => theme.fonts.heading.h4}
  display: flex;
  width: 8.25rem;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.grayScale.black};
  color: ${({ theme }) => theme.colors.grayScale.white};
  border: none;
  border-radius: ${({ theme }) => theme.borders.sharp};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.VT500};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:focus:not(:disabled), &.clicked {
    background: ${({ theme }) => theme.colors.grayScale.black};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }

  ${({ theme }) => theme.media.mobile} {
    width: auto;
    min-width: 8.25rem;
  }
`;