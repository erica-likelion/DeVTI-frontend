import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StarContainer = styled.div`
  display: inline-flex;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
`;

export const StarButton = styled.button<{ $isFilled?: boolean; $disabled?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.padding('XXS')}
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  background: ${theme.colors.grayScale.white};
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  flex-shrink: 0;
  transition: background-color 0.2s ease;

  img {
    ${({ theme }) => theme.responsive.property.sourceSize('R')}
    object-fit: contain;
  }

  &:disabled {
    background: ${theme.colors.grayScale.white};
    cursor: not-allowed;
  }

  &:hover:not(:active):not(:disabled) {
    background: ${theme.colors.secondary.VT100};
  }

  &:active:not(:disabled) {
    background: ${theme.colors.secondary.VT100};
    transition: none;
  }

  ${({ $isFilled }) =>
    $isFilled &&
    `
    background: ${theme.colors.grayScale.white};

    &:hover:not(:active):not(:disabled) {
      background: ${theme.colors.secondary.VT100};
    }

    &:active:not(:disabled) {
      background: ${theme.colors.secondary.VT100};
      transition: none;
    }
  `}
`;

