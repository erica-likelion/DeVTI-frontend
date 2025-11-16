import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean }>`
  display: inline-flex;
  padding: 0.5rem 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borders.sharp};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.transparents.BL100};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.transparents.BL200};
  }

  &:disabled {
  }
`;

export const Icon = styled.span`
  display: flex;
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