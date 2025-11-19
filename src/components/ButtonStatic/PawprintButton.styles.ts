import styled from 'styled-components';


export const Container = styled.button<{ $disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.padding('XXS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  border: none;
  background: ${({ theme }) => theme.colors.grayScale.white};
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT100};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT100};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Icon = styled.span`
  display: flex;
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

`;