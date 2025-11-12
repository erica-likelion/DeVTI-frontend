import styled from 'styled-components';

interface ButtonProps {
  $provider: 'kakao';
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0rem;
  gap: 0.75rem;
  border: 0.0625rem solid ${({ theme }) => theme.colors.grayScale.gray300};
  border-radius: ${({ theme }) => theme.borders.sharp};
  background: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.gray700};
  ${({ theme }) => theme.fonts.heading.h3};
  cursor: pointer;
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    width: 11.375rem;
    justify-content: center;
    align-items: center;
  }
  
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    width: 20rem;
    justify-content: center;
    align-items: center;
  }
  
  ${({ theme }) => theme.media.desktop} {
    display: flex;
    width: 28rem;
    justify-content: center;
    align-items: center;
  }
  
  ${({ theme }) => theme.media.wide} {
    display: flex;
    width: 28rem;
    justify-content: center;
    align-items: center;
  }
  
  background: #FEE500;
  border-color: #FEE500;
  color: #000000;
  
  &:hover {
    background: #FDD835;
    border-color: #FDD835;
  }
`;

export const Icon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;