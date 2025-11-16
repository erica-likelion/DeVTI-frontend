import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  width: var(--Component-Width-Medium, 28rem);
  height: var(--Component-Width-Small, 15.5rem);
  padding: var(--Gap-M, 1rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--Gap-XS, 0.75rem);
  flex-shrink: 0;
  border-radius: ${theme.borders.soft};
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
  padding: 0 var(--Gap-S, 1rem);
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
