import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'XS', 'XXS', 'XXS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  border: none;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  background: none;
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.heading.h4};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.transparents.BL100};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.transparents.BL200};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }


`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`;