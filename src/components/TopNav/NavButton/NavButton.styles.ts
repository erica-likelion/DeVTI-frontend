import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 0.0625rem solid ${({ theme }) => theme.colors.grayScale.gray300};
  border-radius: ${({ theme }) => theme.borders.sharp};
  padding: 0.5rem 1rem;
  ${({ theme }) => theme.fonts.heading.h3};
  color: ${({ theme }) => theme.colors.grayScale.black};
  white-space: nowrap;
  
  
  ${({ theme }) => theme.media.mobile} {
    padding: 0.5rem 1rem;
    ${({ theme }) => theme.fonts.heading.h3};
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width:1.5rem;
  height: 1.5rem;
`;

