import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.button<{ disabled?: boolean; $isClicked?: boolean; $isActive?: boolean }>`
  display: inline-flex;
  padding: 0.75rem 1.25rem 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  border: none;
  border-radius: ${theme.borders.sharp};
  background: ${theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  color: ${theme.colors.grayScale.black};
  ${theme.fonts.heading.h4}

  
  &:hover:not(:disabled) {
    color: ${theme.colors.secondary.VT700};
  }

  &:active:not(:disabled) {
    background: ${theme.colors.secondary.VT100};
    color: ${theme.colors.grayScale.black};
  }

  &:disabled {
    color: ${theme.colors.grayScale.gray300};
  }

  ${({ $isClicked, theme }) => 
    $isClicked && `
      color: ${theme.colors.secondary.VT700};
      background: ${theme.colors.secondary.VT100};
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