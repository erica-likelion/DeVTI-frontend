import styled from 'styled-components';

export const Container = styled.button<{ $isSelected: boolean; disabled?: boolean }>`
  display: inline-flex;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  color: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.secondary.VT700 : theme.colors.grayScale.black};
  background-color: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.grayScale.white : 'transparent'};
  border-radius: ${({ theme }) => theme.borders.sharp};
  ${({ theme }) => theme.fonts.body.m500};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  /* 누르는 순간의 스타일 (더 진한 배경) */
  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary.VT100};
    color: ${({ theme }) => theme.colors.secondary.VT700};
  }

  &:disabled {
  }
`;