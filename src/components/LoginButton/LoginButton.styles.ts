import styled from 'styled-components';

export const Container = styled.button`
  display: inline-flex;
  padding: 0.5rem 0.75rem 0.5rem 0.62rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.grayScale.black};
  border-radius: ${({ theme }) => theme.borders.sharp};
  ${({ theme }) => theme.fonts.heading.h4};
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.transparents.BL100};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.transparents.BL200};
  }
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