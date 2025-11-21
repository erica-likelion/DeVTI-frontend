import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  padding: ${({ theme }) => theme.responsive.padding('XXS')} 0;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  border: none;
  ${({ theme }) => theme.fonts.body.m400};
  color: ${({ theme, disabled }) => 
    disabled ? theme.colors.grayScale.gray300 : theme.colors.grayScale.black};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.gray300 : theme.colors.secondary.VT700};
  }

  &:active {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : theme.colors.secondary.VT100};
    color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.gray300 : theme.colors.grayScale.black};
  }

  ${({ $isClicked, theme, disabled }) => $isClicked && `
    background-color: ${theme.colors.secondary.VT100};
    color: ${disabled ? theme.colors.grayScale.gray300 : theme.colors.secondary.VT700};
  `}
`;