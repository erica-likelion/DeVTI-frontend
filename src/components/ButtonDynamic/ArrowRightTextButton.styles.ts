import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean }>`
  display: inline-flex;
  padding: 0.5rem 0.75rem 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: none;
  border-radius: ${theme.borders.sharp};
  background: none;
  color: ${theme.colors.grayScale.black};
  ${theme.fonts.body.m500}

  
  &:hover:not(:disabled) {
    color: ${theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    background: ${theme.colors.secondary.VT100};
  }

  &:disabled {
    color: ${theme.colors.grayScale.gray300};
  }

  ${({ $isClicked, theme }) => 
    $isClicked && `
      color: ${theme.colors.secondary.VT700};
      background: ${theme.colors.grayScale.white};
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