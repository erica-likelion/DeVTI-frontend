import styled from 'styled-components';

export const Container = styled.button<{ $isSelected: boolean; disabled?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'XS', 'XXS', 'XS')}
  justify-content: center;
  align-items: center;
  border: none;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  color: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.secondary.VT700 : theme.colors.grayScale.black};
  background-color: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.grayScale.white : 'transparent'};
  ${({ theme }) => theme.fonts.body.m500};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary.VT100};
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }



`;