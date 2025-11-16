import styled from 'styled-components';

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  height: auto;
  padding: 0.25rem 0.5rem 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.systems.warning};
  border-radius: ${({ theme }) => theme.borders.sharp};
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
  width: 1.25rem;
  height: 1.25rem;
  padding: 0.2rem;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
  }
`;