import styled from "styled-components";

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'XS', 'XXS', 'S')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  border: none;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  background: none;
  color: ${({ theme }) => theme.colors.grayScale.black};
  cursor: pointer;
  ${({ theme }) => theme.fonts.body.m500}

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT100};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }

  ${({ $isClicked, theme }) => 
    $isClicked && `
      color: ${theme.colors.secondary.VT700};
      background: ${theme.colors.grayScale.white};
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