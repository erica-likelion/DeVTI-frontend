// WtLMemberList.styles.ts
import styled, { css } from "styled-components";

export const Container = styled.div<{ clicked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  ${({ theme }) => theme.responsive.property.width('large')};
  ${({ theme }) => theme.responsive.property.paddingComplex('R', 'L', 'R', 'R')}

  border-radius: ${({ theme }) => theme.responsive.property.borderRadius("soft")};
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.colors.transparents.BL100};

  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.effects.dropShadows.DS200_VT};
}

  &:active {
    background: ${({ theme }) => theme.colors.secondary.VT100};
    box-shadow: ${({ theme }) => theme.effects.dropShadows.DS200_VT};
  }

  ${({ clicked, theme }) =>
    clicked &&
    css`
      background: ${theme.colors.grayScale.white};
      box-shadow: ${theme.effects.dropShadows.DS200_VT};
    `}
`;


export const LeftArea = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.responsive.gap("S")};
`;


export const Header = styled.div<{ clicked?: boolean }>`
  font-size: ${({ theme }) => theme.fonts.heading.h2};
  color: ${({ theme }) => theme.colors.grayScale.black};

  ${({ clicked, theme }) =>
    clicked &&
    css`
      color: ${theme.colors.secondary.VT700};
    `}
`;

export const Indicator = styled.div`
  width: 1px;
  height: 2.25rem;
  background-color: ${({ theme }) => theme.colors.grayScale.gray300};
`;


export const IndicatorArea = styled.div`
  display: flex;
  padding: 0.12rem 0.25rem;
  align-items: center;
  align-self: stretch;
  margin-left: 1rem;
  margin-right: 1rem;
  gap: ${({ theme }) => theme.responsive.gap("R")};
`;

export const RightArea = styled.div`
  font: ${({ theme }) => theme.fonts.body.l500};
  color: ${({ theme }) => theme.colors.grayScale.gray700};
  display: flex;
  align-items: center;
  justify-content: end;
`;
