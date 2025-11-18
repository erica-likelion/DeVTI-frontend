import styled from "styled-components";

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'S', 'XXS', 'XS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  border: none;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  background: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.m500}


  
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.grayScale.black};
    background: ${({ theme }) => theme.colors.secondary.VT100};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT100};
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.grayScale.white};
    color: ${({ theme }) => theme.colors.grayScale.gray300};
  }

  ${({ $isClicked, theme }) => 
    $isClicked && `
      color: ${theme.colors.grayScale.black};
      background: ${theme.colors.grayScale.white};
      
      &:active:not(:disabled) {
        color: ${theme.colors.secondary.VT700};
      }
    `}
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.sourceSize('R')}

  
  img {
    object-fit: contain;
  }
`;