import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputWrapper = styled.div<{ 
  $hasIcon?: boolean; 
}>`
  ${({ theme, $hasIcon }) => $hasIcon 
    ? theme.responsive.property.paddingComplex('S', 'S', 'S', 'S')
    : theme.responsive.property.paddingComplex('S', 'M', 'S', 'M')}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ $hasIcon }) => $hasIcon ? 'space-between' : 'center'};
  width: 100%;
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  border-radius: ${({ theme }) => theme.borders.smooth.wide};
  
  ${({ theme }) => theme.media.desktop} {
    border-radius: ${({ theme }) => theme.borders.smooth.desktop};
  }

  ${({ theme }) => theme.media.tablet} {
    border-radius: ${({ theme }) => theme.borders.smooth.tablet};
  }

  ${({ theme }) => theme.media.mobile} {
    border-radius: ${({ theme }) => theme.borders.smooth.mobile};
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  
  svg, img {
    width: 100%;
    height: 100%;
  }
`;



const InputStyles = css<{
  $hasIcon?: boolean;
  $isActive?: boolean;
  $readOnly?: boolean;
  $variant?: 'input' | 'output';
}>`
  ${({ theme }) => theme.fonts.body.l500}
  height: auto;
  color: ${({ theme }) => theme.colors.grayScale.black};
  background: transparent;
  width: 100%;
  border: none;
  outline: none;
  
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

export const StyledInput = styled.input<{ 
  $hasIcon?: boolean;
  $isActive?: boolean;
  $readOnly?: boolean;
  $variant?: 'input' | 'output';
}>`
  ${InputStyles}
`;

export const StyledTextarea = styled.textarea<{
  $hasIcon?: boolean;
  $isActive?: boolean;
  $readOnly?: boolean;
  $variant?: 'input' | 'output';
}>`
  ${InputStyles}
  resize: none;
  overflow: hidden;
  min-height: auto;
`;