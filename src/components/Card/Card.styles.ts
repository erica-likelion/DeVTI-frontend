import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  ${({ theme }) => theme.responsive.property.borderRadius('soft')}
  background: ${theme.colors.grayScale.white};
  box-shadow: ${theme.effects.dropShadows.DS200};
  
  ${({ theme }) => theme.media.wide} {
    width: 28rem; /* Component-Width-Medium */
    height: 15.5rem;
    padding: ${({ theme }) => theme.gaps.R.wide}; /* 1.25rem */
    gap: ${({ theme }) => theme.gaps.XS.wide}; /* 0.75rem */
  }

  ${({ theme }) => theme.media.desktop} {
    width: 28rem; /* Component-Width-Medium */
    height: 15.5rem;
    padding: ${({ theme }) => theme.gaps.R.desktop}; /* 1.25rem */
    gap: ${({ theme }) => theme.gaps.XS.desktop}; /* 0.75rem */
  }

  ${({ theme }) => theme.media.tablet} {
    ${({ theme }) => theme.responsive.property.width('medium')}
    ${({ theme }) => theme.responsive.property.height('small')}
    ${({ theme }) => theme.responsive.property.padding('M')}
    ${({ theme }) => theme.responsive.property.gap('XS')}
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: ${({ theme }) => theme.componentWidths.medium.mobile}; /* 11.375rem */
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
