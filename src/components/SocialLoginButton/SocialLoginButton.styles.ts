import styled from 'styled-components';

interface ButtonProps {
  $provider: 'kakao' | 'google';
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  width: 20.9375rem;
  height: 3.25rem;
  ${({ theme }) => theme.responsive.property.paddingComplex('none', 'L', 'none', 'L')}
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  color: ${({ theme }) => theme.colors.grayScale.gray700};
  ${({ theme }) => theme.fonts.heading.h4};
  cursor: pointer;
  
  ${({ $provider }) => {
    if ($provider === 'kakao') {
      return `
        background: #FEE500;
        color: rgba(0, 0, 0, 0.85);
      `;
    }
    if ($provider === 'google') {
      return `
        background: #FCFCFF;
        color: rgba(0, 0, 0, 0.54);
      `;
    }
    return '';
  }}
`;

export const Icon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.responsive.gap('L')};
  ${({ theme }) => theme.responsive.property.sourceSize('M')}
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.desktop} {
    left: ${({ theme }) => theme.responsive.gap('L', 'desktop')};
  }

  ${({ theme }) => theme.media.tablet} {
    left: ${({ theme }) => theme.responsive.gap('L', 'tablet')};
  }

  ${({ theme }) => theme.media.mobile} {
    left: ${({ theme }) => theme.responsive.gap('L', 'mobile')};
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;