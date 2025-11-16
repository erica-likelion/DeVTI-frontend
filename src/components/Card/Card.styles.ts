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
  border-radius: var(--Numbers-Border-Soft, 1.5rem);
  background: ${theme.colors.grayScale.white};
  box-shadow: 0 1px 12px 0 rgba(25, 24, 29, 0.10);
`;

export const Header = styled.h3`
  ${theme.fonts.heading.h3}
  align-self: stretch;
  color: ${theme.colors.grayScale.black};
  margin: 0;
`;

export const Body = styled.p`
  ${theme.fonts.body.l500}
  align-self: stretch;
  color: ${theme.colors.grayScale.black};
  margin: 0;
  flex: 1 1 auto;
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;
