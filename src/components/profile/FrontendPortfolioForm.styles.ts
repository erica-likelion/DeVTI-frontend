import styled from "styled-components";
import { theme } from "@/styles/theme";

export const SelfAssessmentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const SectionTitle = styled.h3`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: nowrap;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.componentWidths.large.wide};

  ${({ theme }) => theme.media.desktop} {
    max-width: ${({ theme }) => theme.componentWidths.large.desktop};
  }

  ${({ theme }) => theme.media.tablet} {
    max-width: ${({ theme }) => theme.componentWidths.large.tablet};
  }

  ${({ theme }) => theme.media.mobile} {
    max-width: ${({ theme }) => theme.componentWidths.large.mobile};
  }
`;

