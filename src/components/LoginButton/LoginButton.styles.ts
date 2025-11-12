import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.grayScale.black};
  border-radius: ${({ theme }) => theme.borders.sharp};
  ${({ theme }) => theme.fonts.heading.h3};
  
 
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;