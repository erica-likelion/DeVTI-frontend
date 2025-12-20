import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div<{ $size?: "M" | "L" }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  ${({ theme }) => theme.responsive.property.borderRadius('soft')}
  background: ${theme.colors.grayScale.white};
  box-shadow: 0 1px 12px 0 ${theme.colors.transparents.BL100};
  
  ${({ theme }) => theme.media.wide} {
    width: ${({ $size, theme }) => $size === "L" ? theme.componentWidths.large.wide : '28rem'}; /* Component-Width-Large or Medium */
    height: 15.5rem;
    padding: ${({ theme }) => theme.gaps.R.wide}; /* 1.25rem */
    gap: ${({ theme }) => theme.gaps.XS.wide}; /* 0.75rem */
  }

  ${({ theme }) => theme.media.desktop} {
    width: ${({ $size, theme }) => $size === "L" ? theme.componentWidths.large.desktop : '28rem'}; /* Component-Width-Large or Medium */
    height: 15.5rem;
    padding: ${({ theme }) => theme.gaps.R.desktop}; /* 1.25rem */
    gap: ${({ theme }) => theme.gaps.XS.desktop}; /* 0.75rem */
  }

  ${({ theme }) => theme.media.tablet} {
    width: ${({ $size, theme }) => $size === "L" ? theme.componentWidths.large.tablet : theme.componentWidths.medium.tablet};
    ${({ theme }) => theme.responsive.property.height('small')}
    ${({ theme }) => theme.responsive.property.padding('M')}
    ${({ theme }) => theme.responsive.property.gap('XS')}
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: ${({ $size, theme }) => $size === "L" ? theme.componentWidths.large.mobile : theme.componentWidths.medium.mobile};
    height: 15.5rem;
    padding: ${({ theme }) => theme.gaps.R.mobile}; /* 0.625rem */
    gap: ${({ theme }) => theme.gaps.XS.mobile}; /* 0.375rem */
  }
`;

export const Header = styled.h3`
  ${theme.fonts.heading.h3}
  align-self: stretch;
  color: ${theme.colors.grayScale.black};
  margin: 0;
`;

// 텍스트 + 버튼(별) 프레임
export const Content = styled.div`
  display: flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('none', 'S', 'none', 'S')}
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1 0 0;
  align-self: stretch;
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    padding: 0 ${({ theme }) => theme.gaps.S.mobile}; /* 상하 0, 좌우 Gap-S(0.5rem) */
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    flex: 1 0 0;
    align-self: stretch;
  }
`;

export const Body = styled.p`
  ${theme.fonts.body.l500}
  align-self: stretch;
  color: ${theme.colors.grayScale.black};
  margin: 0;
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;
