import styled from 'styled-components';

export const StyledButton = styled.button`
  ${({ theme }) => theme.fonts.heading.h3}
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.grayScale.black};
  color: ${({ theme }) => theme.colors.grayScale.white};
  border: none;
  
  ${({ theme }) => theme.responsive.property.width('medium')}
  ${({ theme }) => theme.responsive.property.padding('XS')}
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}

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
`;