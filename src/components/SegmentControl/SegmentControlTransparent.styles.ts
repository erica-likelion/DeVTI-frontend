import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div<{ $isJoinRoomPr?: boolean }>`
  display: flex;
  flex: 1 0 0;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS','XXS','XXS','XXS')}
  ${({ theme, $isJoinRoomPr }) => !$isJoinRoomPr ? theme.responsive.property.width('large') : ''};
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXXS')}
  ${({ theme }) => theme.responsive.property.borderRadius('smooth')}
  background: ${theme.colors.transparents.WH300};
  box-shadow: ${theme.effects.dropShadows.DS100};
`;

export const ButtonWrapper = styled.div<{ $isSelected?: boolean }>`
  flex: 1 1 0; /* 동일한 너비로 분배 */
  button {
    width: 100%;
  }

  button:not(.selected) {
    background: transparent !important;
    color: ${theme.colors.grayScale.black} !important;
  }
 
  button:not(.selected):hover {
    color: ${theme.colors.secondary.VT700} !important;
  }

  button:not(.selected):active {
    background: ${theme.colors.secondary.VT100} !important;
    color: ${theme.colors.secondary.VT700} !important;
  }

  & button.selected {
    background: ${theme.colors.grayScale.white} !important;
    color: ${theme.colors.secondary.VT700} !important;
  }

  & button.selected:hover {
    background: ${theme.colors.grayScale.white} !important;
    color: ${theme.colors.secondary.VT700} !important;
  }

  & button.selected:active {
    background: ${theme.colors.grayScale.white} !important;
    color: ${theme.colors.secondary.VT700} !important;
  }
`;

export const Divider = styled.div`
  width: 0.05rem;
  height: 2rem;
  background: ${theme.colors.grayScale.gray300};
  border-radius: 0.03125rem;
  margin: 0.125rem 0.25rem;
`;
