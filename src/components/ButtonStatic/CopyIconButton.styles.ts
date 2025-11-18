import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean; $isActive?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.padding('XXS')}
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  border: none;
  
  &:hover {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : theme.colors.secondary.VT100};
  }

  &:active {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : theme.colors.secondary.VT100};
  }
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  
  img {
    object-fit: contain;
  }

`;