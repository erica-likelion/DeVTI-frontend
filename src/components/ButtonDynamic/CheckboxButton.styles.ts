import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  padding: 0.5rem 1rem 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: none;
  border-radius: ${theme.borders.sharp};
  background: ${theme.colors.grayScale.white};
  color: ${theme.colors.grayScale.black};
  ${theme.fonts.body.m500}

  
  &:hover:not(:disabled) {
    color: ${theme.colors.grayScale.black};
    background: ${theme.colors.secondary.VT100};
  }

  &:active:not(:disabled) {
    background: ${theme.colors.secondary.VT100};
    color: ${theme.colors.secondary.VT700};
  }

  &:disabled {
    background: ${theme.colors.grayScale.white};
    color: ${theme.colors.grayScale.gray300};
  }

  ${({ $isClicked, theme }) => 
    $isClicked && `
      color: ${theme.colors.grayScale.black};
      background: ${theme.colors.grayScale.white};
      
      &:active:not(:disabled) {
        color: ${theme.colors.secondary.VT700};
      }
    `}
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  
  img {

    object-fit: contain;
  }
`;