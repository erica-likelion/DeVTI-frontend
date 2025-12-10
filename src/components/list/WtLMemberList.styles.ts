// WtLMemberList.styles.ts
import styled, { css } from "styled-components";

export const Container = styled.div<{ $clicked?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  ${({ theme }) => theme.responsive.property.width('max')};
  ${({ theme }) => theme.responsive.property.paddingComplex('R', 'L', 'R', 'R')}

  ${({ theme }) => theme.responsive.property.borderRadius("soft")};
  background: ${({ theme }) => theme.colors.transparents.WH300};
  ${({ theme }) => theme.colors.inner.GL100};
  

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.inner.Gl_DS_VT};
}

  &:active {
    background: ${({ theme }) => theme.colors.secondary.VT100};
    box-shadow: ${({ theme }) => theme.effects.dropShadows.DS200_VT};
  }

  ${({ $clicked, theme }) =>
    $clicked &&
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

export const Icon = styled.div`
  width: ${({ theme }) => theme.responsive.sourceWidth("L")};
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.responsive.borderRadius("round")};
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

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

export const KeywordArea = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.responsive.gap("S")};
  margin-left: auto;
  font-size: ${({ theme }) => theme.fonts.body.m500};
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

export const RightArea = styled.div<{ $hasRightButton: boolean }>`
  display: flex;
  align-items: center;
  display: ${({ $hasRightButton }) => ($hasRightButton ? "flex" : "none")};
`;

export const Indicator = styled.div`
  width: 1px;
  height: 2.25rem;
  background-color: ${({ theme }) => theme.colors.grayScale.gray300};
`;


export const IndicatorArea = styled.div`
  display: flex;
  padding: 0.125rem 0.25rem;
  align-items: end;
  margin-left: 1rem;
  margin-right: 1rem;
  gap: ${({ theme }) => theme.responsive.gap("S")};

`;



export const ButtonArea = styled.div`
  flex-shrink: 0;
  gap: ${({ theme }) => theme.responsive.gap("S")};
  
`;
