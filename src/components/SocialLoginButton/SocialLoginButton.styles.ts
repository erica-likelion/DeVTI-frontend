import styled from 'styled-components';

interface ButtonProps {
  $provider: 'kakao' | 'google';
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  width: 20.9375rem;
  height: 3.25rem;
  padding: 0 1.5rem;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: ${({ theme }) => theme.borders.sharp};
  color: ${({ theme }) => theme.colors.grayScale.gray700};
  ${({ theme }) => theme.fonts.heading.h4};
  
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
  left: 1.5rem;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;