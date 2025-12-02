import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  ${({ theme }) => theme.responsive.property.width('medium')}
  ${({ theme }) => theme.responsive.property.height('small')}
  ${({ theme }) => theme.responsive.property.padding('M')}
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => theme.responsive.property.gap('XS')}
  flex-shrink: 0;
  ${({ theme }) => theme.responsive.property.borderRadius('soft')}
  background: ${theme.colors.grayScale.white};
  box-shadow: ${theme.effects.dropShadows.DS200};
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
