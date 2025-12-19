import styled from 'styled-components';


export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXXS', 'XS', 'XXXS', 'XXS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  border: none;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  cursor: pointer;
  ${({ theme }) => theme.fonts.heading.h4};
  color: ${({ theme }) => theme.colors.secondary.VT700};
  box-shadow: none;
  
  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.effects.dropShadows.DS200_VT};
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary.VT500};
    color: ${({ theme }) => theme.colors.grayScale.white};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }

  ${({ $isClicked, theme }) => $isClicked && `
    background-color: ${theme.colors.grayScale.white};
  `}

`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.sourceSize('S')}
  flex-shrink: 0;
  background-image: url('/DefaultIMG_Profile.webp');
  background-size: cover;
  background-position: center;
  
  img {
    object-fit: contain;
  }

`;