import styled from 'styled-components';

export const StyledButton = styled.button`
  ${({ theme }) => theme.fonts.heading.h4}
  display: flex;
  padding: ${({ theme }) => theme.responsive.padding('XXS')} 0;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.grayScale.black};
  color: ${({ theme }) => theme.colors.grayScale.white};
  border: none;
  
  ${({ theme }) => theme.responsive.property.width('min')}
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}

  ${({ theme }) => theme.media.mobile} {
    width: auto;
    min-width: ${({ theme }) => theme.responsive.width('min', 'mobile')};
  }

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