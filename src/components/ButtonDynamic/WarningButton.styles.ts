import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  height: auto;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXXS', 'XXS', 'XXXS', 'XS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  background-color: ${({ theme }) => theme.colors.systems.warning};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  ${({ theme }) => theme.fonts.heading.h4};
  border: none;

  &:hover {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.gray300 : theme.colors.systems.warning};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayScale.gray300};
    color: ${({ theme }) => theme.colors.grayScale.white};
  }

  &:active {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.gray300 : theme.colors.systems.error};
  }
  
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.sourceSize('S')}
  ${({ theme }) => theme.responsive.property.padding('XXXS')}
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
  }
`;