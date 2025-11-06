import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  border: 0.0625rem solid ${({ theme }) => theme.colors.grayScale.gray300};
  border-radius: ${({ theme }) => theme.borders.sharp};
  ${({ theme }) => theme.fonts.heading.h3};
  
 
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;