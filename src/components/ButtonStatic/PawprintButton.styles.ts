import styled from 'styled-components';

export const Container = styled.button<{ $disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borders.sharp};
  border: none;
  background: ${({ theme }) => theme.colors.grayScale.white};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT100};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary.VT100};
  }
`;

export const Icon = styled.span`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  
  img {
    object-fit: contain;
  }
`;