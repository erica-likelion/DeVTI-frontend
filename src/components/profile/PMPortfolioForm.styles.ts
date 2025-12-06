import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.gaps.XXL.wide}; /* 2.75rem */
  width: ${({ theme }) => theme.componentWidths.large.wide}; /* 42.5rem */
  
  ${({ theme }) => theme.media.desktop} {
    width: ${({ theme }) => theme.componentWidths.large.desktop}; /* 42.5rem */
  }
  
  ${({ theme }) => theme.media.tablet} {
    width: ${({ theme }) => theme.componentWidths.large.tablet}; /* 41rem */
    gap: ${({ theme }) => theme.gaps.XXL.tablet}; /* 1.25rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: ${({ theme }) => theme.componentWidths.large.mobile}; /* 20.5rem */
    gap: ${({ theme }) => theme.gaps.XXL.mobile}; /* 1rem */
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.XXS.wide}; /* 0.5rem */
  width: 100%;
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.XXS.tablet}; /* 0.375rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.XXS.mobile}; /* 0.25rem */
  }
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
  gap: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
  width: 100%;
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* 0.625rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 0.5rem */
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* 0.625rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 0.5rem */
  }
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
  gap: ${({ theme }) => theme.gaps.XS.wide}; /* 0.75rem */
  padding: ${({ theme }) => theme.gaps.XXS.wide} ${({ theme }) => theme.gaps.S.wide}; /* 0.5rem 1rem */
  border-radius: ${({ theme }) => theme.borders.sharp.wide};
  background: ${theme.colors.grayScale.gray300};
  color: ${theme.colors.grayScale.black};
  ${theme.fonts.heading.h3}
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.XS.tablet}; /* 0.5rem */
    padding: ${({ theme }) => theme.gaps.XXS.tablet} ${({ theme }) => theme.gaps.S.tablet}; /* 0.375rem 0.625rem */
    border-radius: ${({ theme }) => theme.borders.sharp.tablet};
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.XS.mobile}; /* 0.375rem */
    padding: ${({ theme }) => theme.gaps.XXS.mobile} ${({ theme }) => theme.gaps.S.mobile}; /* 0.25rem 0.5rem */
    border-radius: ${({ theme }) => theme.borders.sharp.mobile};
  }
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
  padding: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
  align-items: center;
  gap: ${({ theme }) => theme.gaps.R.wide}; /* 1.25rem */
  align-self: stretch;
  width: 100%;
  border-radius: ${({ theme }) => theme.borders.smooth.wide}; /* 1.125rem */
  background: ${theme.colors.grayScale.white};
  box-shadow: ${theme.effects.dropShadows.DS100};
  
  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => theme.gaps.S.tablet}; /* 0.625rem */
    gap: ${({ theme }) => theme.gaps.R.tablet}; /* 0.75rem */
    border-radius: ${({ theme }) => theme.borders.smooth.tablet}; /* 1.125rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => theme.gaps.S.mobile}; /* 0.5rem */
    gap: ${({ theme }) => theme.gaps.R.mobile}; /* 0.625rem */
    border-radius: ${({ theme }) => theme.borders.smooth.mobile}; /* 0.75rem */
  }
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
  gap: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* 0.625rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 0.5rem */
  }
`;

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gaps.R.wide}; /* 1.25rem */
  flex-wrap: wrap;
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.R.tablet}; /* 0.75rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.R.mobile}; /* 0.625rem */
  }
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
  gap: ${({ theme }) => theme.gaps.XS.wide}; /* 0.75rem */
  flex-wrap: wrap;
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.XS.tablet}; /* 0.5rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.XS.mobile}; /* 0.375rem */
  }
`;

export const TimeOptionButton = styled.button<{ $active: boolean }>`
  ${theme.fonts.body.m500}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.gaps.XXS.wide} ${({ theme }) => theme.gaps.M.wide}; /* 0.5rem 1.5rem */
  border-radius: ${({ theme }) => theme.borders.sharp.wide};
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
  
  ${({ theme }) => theme.media.tablet} {
    padding: ${({ theme }) => theme.gaps.XXS.tablet} ${({ theme }) => theme.gaps.M.tablet}; /* 0.375rem 0.875rem */
    border-radius: ${({ theme }) => theme.borders.sharp.tablet};
  }
  
  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => theme.gaps.XXS.mobile} ${({ theme }) => theme.gaps.M.mobile}; /* 0.25rem 0.75rem */
    border-radius: ${({ theme }) => theme.borders.sharp.mobile};
  }
`;

