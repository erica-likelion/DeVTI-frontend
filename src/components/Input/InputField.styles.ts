import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

export const InputWrapper = styled.div<{ 
  $hasIcon?: boolean; 
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  right: 1rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;



export const StyledInput = styled.input<{ 
  $hasIcon?: boolean;
  $isActive?: boolean;
  $readOnly?: boolean;
}>`
  ${({ theme }) => theme.fonts.body.l500}
  height: auto;
  padding: 1rem ${({ $hasIcon }) => 
    $hasIcon ? '1rem' : '1.5rem'};
  color: ${({ theme }) => theme.colors.grayScale.black};
  border-radius: ${({ theme }) => theme.borders.smooth};
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  width: 100%;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray700};
  }
  
  

  ${({ $hasIcon, $isActive, $readOnly }) => ($hasIcon || $isActive) && !$readOnly && css`
    
    
    &:focus {
      ${({ theme }) => theme.fonts.heading.h3}
      background: ${({ theme }) => theme.colors.grayScale.white};

      &::placeholder {
        ${({ theme }) => theme.fonts.body.l500}
        color: ${({ theme }) => theme.colors.grayScale.gray700};
      }
    }
  `}
`;