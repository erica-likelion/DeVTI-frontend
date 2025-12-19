import styled from 'styled-components';

export const Container = styled.button`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'XS', 'XXS', 'XXS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
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
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;