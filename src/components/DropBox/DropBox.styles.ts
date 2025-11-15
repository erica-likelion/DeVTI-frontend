import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div<{ $size?: "L" | "M" }>`
  display: flex;
  width: ${({ $size }) => ($size === "M" ? "auto" : "33.25rem")};
  max-width: ${({ $size }) =>
    $size === "M" ? "none" : "var(--Component-Width-Large, 42.5rem)"};
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $size }) => ($size === "M" ? "0" : "0.5rem")};
  border-radius: ${theme.borders.sharp};
`;

export const DropBoxField = styled.button<{ $size?: "L" | "M"; $disabled?: boolean }>`
  display: ${({ $size }) => ($size === "M" ? "inline-flex" : "flex")};
  align-items: center;
  justify-content: ${({ $size }) => ($size === "M" ? "center" : "flex-start")};
  width: ${({ $size }) => ($size === "M" ? "auto" : "100%")};
  padding: ${({ $size }) =>
    $size === "M"
      ? "0.5rem 0.5rem 0.5rem 0.75rem"
      : "1rem 1.25rem 1rem 1.25rem"};
  border: none;
  border-radius: ${({ $size }) =>
    $size === "M" ? theme.borders.sharp : theme.borders.smooth};
  background: ${({ $size, $disabled, theme }) =>
    $size === "M" && $disabled
      ? "transparent"
      : theme.colors.grayScale.white};
  box-shadow: ${({ $size }) =>
    $size === "M" ? "none" : "0 0 4px 0 rgba(25, 24, 29, 0.1)"};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  gap: ${({ $size }) => ($size === "M" ? "0.5rem" : "1.25rem")};
  height: ${({ $size }) => ($size === "M" ? "auto" : "3.5rem")};
  align-self: ${({ $size }) => ($size === "M" ? "auto" : "stretch")};
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ $size, $disabled, theme }) =>
      $size === "M" && $disabled
        ? "transparent"
        : theme.colors.grayScale.gray50};
  }

  &:active:not(:disabled) {
    background: ${({ $size, $disabled, theme }) =>
      $size === "M" && $disabled
        ? "transparent"
        : theme.colors.grayScale.gray100};
    transition: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const OptionText = styled.span<{ $size?: "L" | "M" }>`
  flex: ${({ $size }) => ($size === "M" ? "none" : "1 0 0")};
  ${theme.fonts.body.m500}
  color: ${theme.colors.grayScale.black};
  text-align: left;
`;

export const ArrowIcon = styled.span<{ $isOpen: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: ${theme.borders.smooth};
  box-shadow: 0 0 4px 0 rgba(25, 24, 29, 0.1);
  background: ${theme.colors.grayScale.white};
  overflow: hidden;
`;

export const DropOption = styled.div<{ $isActive?: boolean; $isSelected?: boolean }>`
  display: flex;
  height: 3.5rem;
  padding: 1rem 1.25rem;
  align-items: center;
  align-self: stretch;
  background: ${theme.colors.grayScale.white};
  cursor: ${({ $isActive }) => ($isActive ? "default" : "pointer")};
  transition: background-color 0.2s ease;

  /* Default 상태: 배경 흰색, 글씨 검은색 (이미 적용됨) */

  /* Hovering 상태 - DActv가 아닐 때만 */
  &:hover:not([data-disabled="true"]) {
    background: ${theme.colors.grayScale.gray50};
  }

  /* Pressing (active) 상태 */
  &:active:not([data-disabled="true"]) {
    background: ${theme.colors.grayScale.gray100};
    transition: none;
  }

  /* Clicked (선택된 상태) - Default와 동일 */
  ${({ $isSelected }) =>
    $isSelected &&
    `
    background: ${theme.colors.grayScale.white};
  `}
`;

export const OptionLabel = styled.span<{ $isActive?: boolean }>`
  flex: 1 0 0;
  ${theme.fonts.body.m500}
  color: ${({ $isActive, theme }) =>
    $isActive
      ? theme.colors.grayScale.gray300
      : theme.colors.grayScale.black};
  transition: color 0.2s ease;
`;

