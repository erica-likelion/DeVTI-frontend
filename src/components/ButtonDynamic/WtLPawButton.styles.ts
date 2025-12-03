import styled from "styled-components";

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean; $isActive?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XS', 'M', 'XS', 'S')}
  justify-content: flex-start;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XS')}
  border: none;
  border-radius: ${({ theme }) => theme.responsive.property.borderRadius('sharp')};
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  color: ${({ theme }) => theme.colors.grayScale.black};
  cursor: pointer;
  ${({ theme }) => theme.fonts.heading.h4}
  width: 100%;
  height: 3rem;
  
  ${({ theme }) => theme.media.mobile} {
    height: 2rem;
  }
  
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT100};
    color: ${({ theme }) => theme.colors.grayScale.black};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }

  ${({ $isClicked, disabled, theme }) => 
    $isClicked && !disabled && `
      color: ${theme.colors.secondary.VT700};
      background: ${theme.colors.secondary.VT100};
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