import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean }>`
  display: inline-flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  border-radius: ${({ theme }) => theme.borders.sharp};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : 'transparent'};
  }

  &:active {
    background-color: ${({ theme, disabled }) => 
      disabled ? theme.colors.grayScale.white : theme.colors.grayScale.gray100};
  }

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