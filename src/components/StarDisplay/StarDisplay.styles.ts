import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StarContainer = styled.div`
  display: inline-flex;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
`;

export const Star = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    ${({ theme }) => theme.responsive.property.sourceSize('R')}
    object-fit: contain;
  }
`;

export const ValueText = styled.span`
  ${theme.fonts.heading.h3}
  color: ${theme.colors.grayScale.black};
  margin: 0;
`;



