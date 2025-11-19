import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div<{ $size?: "L" | "M" }>`
  display: flex;
  width: ${({ $size, theme }) => ($size === "M" ? "auto" : theme.responsive.width('medium'))};
  max-width: ${({ $size, theme }) =>
    $size === "M" ? "none" : theme.responsive.width('large')};
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $size, theme }) => ($size === "M" ? "0" : theme.responsive.gap('XS'))};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}

  ${({ theme }) => theme.media.desktop} {
    width: ${({ $size, theme }) => ($size === "M" ? "auto" : theme.responsive.width('medium', 'desktop'))};
    max-width: ${({ $size, theme }) =>
      $size === "M" ? "none" : theme.responsive.width('large', 'desktop')};
    gap: ${({ $size, theme }) => ($size === "M" ? "0" : theme.responsive.gap('XS', 'desktop'))};
  }

  ${({ theme }) => theme.media.tablet} {
    width: ${({ $size, theme }) => ($size === "M" ? "auto" : theme.responsive.width('medium', 'tablet'))};
    max-width: ${({ $size, theme }) =>
      $size === "M" ? "none" : theme.responsive.width('large', 'tablet')};
    gap: ${({ $size, theme }) => ($size === "M" ? "0" : theme.responsive.gap('XS', 'tablet'))};
  }

  ${({ theme }) => theme.media.mobile} {
    width: ${({ $size, theme }) => ($size === "M" ? "auto" : theme.responsive.width('medium', 'mobile'))};
    max-width: ${({ $size, theme }) =>
      $size === "M" ? "none" : theme.responsive.width('large', 'mobile')};
    gap: ${({ $size, theme }) => ($size === "M" ? "0" : theme.responsive.gap('XS', 'mobile'))};
  }
`;

export const DropBoxField = styled.button<{ $size?: "L" | "M"; $disabled?: boolean }>`
  display: ${({ $size }) => ($size === "M" ? "inline-flex" : "flex")};
  align-items: center;
  justify-content: ${({ $size }) => ($size === "M" ? "center" : "flex-start")};
  width: ${({ $size }) => ($size === "M" ? "auto" : "100%")};
  padding: ${({ $size, theme }) =>
    $size === "M"
      ? `${theme.responsive.gap('XS')} ${theme.responsive.gap('XS')} ${theme.responsive.gap('XS')} ${theme.responsive.gap('XXS')}`
      : `${theme.responsive.gap('R')} ${theme.responsive.gap('S')}`};
  border: none;
  border-radius: ${({ $size, theme }) =>
    $size === "M" ? theme.responsive.borderRadius('sharp') : theme.responsive.borderRadius('smooth')};
  background: ${({ $size, $disabled, theme }) =>
    $size === "M" && $disabled
      ? "transparent"
      : theme.colors.grayScale.white};
  box-shadow: ${({ $size }) =>
    $size === "M" ? "none" : "0 0 4px 0 rgba(25, 24, 29, 0.1)"};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  gap: ${({ $size, theme }) => ($size === "M" ? theme.responsive.gap('XS') : theme.responsive.gap('S'))};
  height: ${({ $size, theme }) => ($size === "M" ? "auto" : theme.responsive.width('small'))};
  align-self: ${({ $size }) => ($size === "M" ? "auto" : "stretch")};
  transition: background-color 0.2s ease;

  ${({ theme }) => theme.media.desktop} {
    padding: ${({ $size, theme }) =>
      $size === "M"
        ? `${theme.responsive.gap('XS', 'desktop')} ${theme.responsive.gap('XS', 'desktop')} ${theme.responsive.gap('XS', 'desktop')} ${theme.responsive.gap('XXS', 'desktop')}`
        : `${theme.responsive.gap('R', 'desktop')} ${theme.responsive.gap('S', 'desktop')}`};
    border-radius: ${({ $size, theme }) =>
      $size === "M" ? theme.responsive.borderRadius('sharp', 'desktop') : theme.responsive.borderRadius('smooth', 'desktop')};
    gap: ${({ $size, theme }) => ($size === "M" ? theme.responsive.gap('XS', 'desktop') : theme.responsive.gap('S', 'desktop'))};
    height: ${({ $size, theme }) => ($size === "M" ? "auto" : theme.responsive.width('small', 'desktop'))};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: ${({ $size, theme }) =>
      $size === "M"
        ? `${theme.responsive.gap('XS', 'tablet')} ${theme.responsive.gap('XS', 'tablet')} ${theme.responsive.gap('XS', 'tablet')} ${theme.responsive.gap('XXS', 'tablet')}`
        : `${theme.responsive.gap('R', 'tablet')} ${theme.responsive.gap('S', 'tablet')}`};
    border-radius: ${({ $size, theme }) =>
      $size === "M" ? theme.responsive.borderRadius('sharp', 'tablet') : theme.responsive.borderRadius('smooth', 'tablet')};
    gap: ${({ $size, theme }) => ($size === "M" ? theme.responsive.gap('XS', 'tablet') : theme.responsive.gap('S', 'tablet'))};
    height: ${({ $size, theme }) => ($size === "M" ? "auto" : theme.responsive.width('small', 'tablet'))};
  }

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ $size, theme }) =>
      $size === "M"
        ? `${theme.responsive.gap('XS', 'mobile')} ${theme.responsive.gap('XS', 'mobile')} ${theme.responsive.gap('XS', 'mobile')} ${theme.responsive.gap('XXS', 'mobile')}`
        : `${theme.responsive.gap('R', 'mobile')} ${theme.responsive.gap('S', 'mobile')}`};
    border-radius: ${({ $size, theme }) =>
      $size === "M" ? theme.responsive.borderRadius('sharp', 'mobile') : theme.responsive.borderRadius('smooth', 'mobile')};
    gap: ${({ $size, theme }) => ($size === "M" ? theme.responsive.gap('XS', 'mobile') : theme.responsive.gap('S', 'mobile'))};
    height: ${({ $size, theme }) => ($size === "M" ? "auto" : theme.responsive.width('small', 'mobile'))};
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
  box-shadow: 0 0 4px 0 rgba(25, 24, 29, 0.1);
  background: ${theme.colors.grayScale.white};
  overflow: hidden;
`;

export const DropOption = styled.div<{ $isActive?: boolean; $isSelected?: boolean }>`
  display: flex;
  height: ${({ theme }) => theme.responsive.width('small')};
  ${({ theme }) => theme.responsive.property.paddingComplex('R', 'S', 'R', 'S')}
  align-items: center;
  align-self: stretch;
  background: ${theme.colors.grayScale.white};
  cursor: ${({ $isActive }) => ($isActive ? "default" : "pointer")};
  transition: background-color 0.2s ease;

  ${({ theme }) => theme.media.desktop} {
    height: ${({ theme }) => theme.responsive.width('small', 'desktop')};
  }

  ${({ theme }) => theme.media.tablet} {
    height: ${({ theme }) => theme.responsive.width('small', 'tablet')};
  }

  ${({ theme }) => theme.media.mobile} {
    height: ${({ theme }) => theme.responsive.width('small', 'mobile')};
  }

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

