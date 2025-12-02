import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div<{ $size?: "L" | "M" }>`
  display: flex;
  width: ${({ $size }) => ($size === "M" ? "auto" : "100%")};
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
`;


export const DropBoxField = styled.button<{ $size?: "L" | "M"; $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: ${({ $size }) => ($size === "M" ? "center" : "flex-start")};
  width: 100%;
  ${({ $size, theme }) =>
    $size === "M"
      ? theme.responsive.property.paddingComplex('S', 'M', 'S', 'M') // InputField와 같은 padding
      : theme.responsive.property.paddingComplex('S', 'M', 'S', 'M')};
  border: none;
  border-radius: ${({ $size, theme }) =>
    $size === "M" ? theme.borders.sharp.wide : theme.borders.smooth.wide};
  
  ${({ theme }) => theme.media.desktop} {
    border-radius: ${({ $size, theme }) =>
      $size === "M" ? theme.borders.sharp.desktop : theme.borders.smooth.desktop};
  }

  ${({ theme }) => theme.media.tablet} {
    border-radius: ${({ $size, theme }) =>
      $size === "M" ? theme.borders.sharp.tablet : theme.borders.smooth.tablet};
  }

  ${({ theme }) => theme.media.mobile} {
    border-radius: ${({ $size, theme }) =>
      $size === "M" ? theme.borders.sharp.mobile : theme.borders.smooth.mobile};
  }
  
  background: ${({ $size, $disabled, theme }) =>
    $size === "M" && $disabled
      ? "transparent"
      : theme.colors.grayScale.white};
  box-shadow: ${({ $size, theme }) =>
    $size === "M" ? "none" : theme.effects.dropShadows.DS100};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  gap: ${({ $size, theme }) => ($size === "M" ? theme.responsive.gap('XXS') : theme.responsive.gap('S'))};
  height: auto;
  align-self: stretch;
  transition: background-color 0.2s ease;
  
  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => `${theme.responsive.gap('S', 'mobile')} ${theme.responsive.gap('S', 'mobile')} ${theme.responsive.gap('S', 'mobile')} ${theme.responsive.gap('R', 'mobile')}`};
    gap: ${({ theme }) => theme.responsive.gap('S', 'mobile')};
  }



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
  ${({ theme }) => theme.responsive.property.sourceSize('S')}
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
  ${({ theme }) => theme.responsive.property.borderRadius('smooth')}
  box-shadow: ${theme.effects.dropShadows.DS100};
  background: ${theme.colors.grayScale.white};
  overflow: hidden;
`;

export const DropOption = styled.div<{ $size?: "L" | "M"; $isActive?: boolean; $isSelected?: boolean }>`
  display: flex;
  height: 3.5rem;
  align-items: center;
  align-self: stretch;
  padding: ${({ $size, theme }) =>
    $size === "M"
      ? `${theme.responsive.gap('XXS')} ${theme.responsive.gap('XXS')} ${theme.responsive.gap('XXS')} ${theme.responsive.gap('XS')}`
      : `${theme.responsive.gap('S')} ${theme.responsive.gap('M')} ${theme.responsive.gap('S')} ${theme.responsive.gap('M')}`};
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

