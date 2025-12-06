import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

const sectionWidth = "var(--Component-Width-Large, 42.5rem)";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
  width: ${sectionWidth};
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const PortfolioTitle = styled.h2`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: nowrap;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SectionTitle = styled.h3`
  ${theme.fonts.heading.h3}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: nowrap;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borders.sharp};
  background: ${theme.colors.grayScale.gray300};
  color: ${theme.colors.grayScale.black};
  ${theme.fonts.heading.h3}
  font-weight: 600;
`;

export const BadgeIcon = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  aspect-ratio: 1 / 1;
  border-radius: ${theme.borders.round};
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;
`;

export const TextFieldBox = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 1.25rem;
  align-self: stretch;
  width: 100%;
  border-radius: 1.125rem;
  background: ${theme.colors.grayScale.white};
  box-shadow: 0 0 4px 0 ${theme.colors.transparents.BL100};
`;

export const TextArea = styled.textarea`
  ${theme.fonts.body.l500}
  width: 100%;
  min-height: 10rem;
  flex: 1;
  border: none;
  background: transparent;
  color: ${theme.colors.grayScale.black};
  resize: vertical;
  outline: none;

  &::placeholder {
    color: ${theme.colors.grayScale.gray600};
  }
`;

export const TimeAvailabilitySection = styled(Section)`
  gap: 1rem;
`;

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
`;

export const TimeRowLabel = styled.span`
  ${theme.fonts.body.m500}
  color: ${theme.colors.grayScale.black};
  white-space: nowrap;
  flex-shrink: 0;
  display: inline-block;
`;

export const TimeOptionGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const TimeOptionButton = styled.button<{ $active: boolean }>`
  ${theme.fonts.body.m500}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  border-radius: ${theme.borders.sharp};
  border: 1px solid ${theme.colors.grayScale.gray300};
  background: ${theme.colors.grayScale.white};
  color: ${theme.colors.grayScale.gray700};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $active }) =>
    $active &&
    css`
      color: ${theme.colors.grayScale.black};
      border-color: ${theme.colors.grayScale.gray600};
      background: ${theme.colors.grayScale.gray200};
    `};

  &:hover {
    border-color: ${theme.colors.grayScale.gray500};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary.VT500};
    outline-offset: 2px;
  }
`;

