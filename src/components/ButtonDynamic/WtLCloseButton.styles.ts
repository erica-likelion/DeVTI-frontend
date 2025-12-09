import styled from "styled-components";

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XS', 'S', 'XS', 'M')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XS')}
  border: none;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  color: ${({ theme }) => theme.colors.grayScale.black};
  cursor: pointer;
  ${({ theme }) => theme.fonts.heading.h4}
  
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

  ${({ $isClicked, theme }) => 
    $isClicked && `
      color: ${theme.colors.secondary.VT700};
      background: ${theme.colors.secondary.VT100};
    `}

`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.sourceSize('M')}
  
  img {
    object-fit: contain;
  }
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    width: ${({ theme }) => theme.gaps.M.mobile}; /* var(--Gap-M, 0.75rem) */
    height: 0.75rem;
    padding: 0.11719rem;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
    
    img {
      width: 100%;
      height: 100%;
    }
  }
`;