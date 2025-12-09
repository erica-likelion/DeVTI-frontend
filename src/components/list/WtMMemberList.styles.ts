// WtLMemberList.styles.ts
import styled, { css } from "styled-components";

export const Container = styled.div<{ $clicked?: boolean }>`
  display: flex;
  align-items: center;
  height: auto;
  ${({ theme }) => theme.responsive.property.width("large")};
  ${({ theme }) => theme.responsive.property.paddingComplex('XS', 'XS', 'XS', 'S')}

  ${({ theme }) => theme.responsive.property.borderRadius("smooth")};
  background: ${({ theme }) => theme.colors.transparents.WH300};
  box-shadow: ${({ theme }) => theme.colors.transparents.BL100};
  backdrop-filter: blur(10px);

  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.effects.dropShadows.DS200_VT};
}

  &:active {
    background: ${({ theme }) => theme.colors.secondary.VT100};
    box-shadow: ${({ theme }) => theme.effects.dropShadows.DS200_VT};
  }

  ${({ $clicked, theme }) =>
    $clicked &&
    css`
      border-color: ${theme.colors.grayScale.white};
      box-shadow: ${theme.effects.dropShadows.DS200_VT};
    `}
`;


export const LeftArea = styled.div`
  display: flex;
  align-items: center;

  gap: ${({ theme }) => theme.responsive.gap("S")};
`;


export const Header = styled.div<{ $clicked?: boolean }>`
  font-size: ${({ theme }) => theme.fonts.heading.h2};
  color: ${({ theme }) => theme.colors.grayScale.black};

  ${({ $clicked, theme }) =>
    $clicked &&
    css`
      color: ${theme.colors.secondary.VT700};
    `}
`;

export const KeywordArea = styled.div<{ $hasKeyword: boolean }>`
  gap: ${({ theme }) => theme.responsive.gap("S")};
  margin-left: auto;
  font-size: ${({ theme }) => theme.fonts.body.m500};
  display: ${({ $hasKeyword }) => ($hasKeyword ? "flex" : "none")};

  ${({ theme }) => theme.media.mobile} {
     & > *:nth-child(n + 3) {
      display: none;
    }
  }
`;


