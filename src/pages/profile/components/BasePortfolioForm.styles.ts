import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 100%;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2.75rem;
`;

export const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.75rem;
  width: 100%;
  padding-left: ${({ theme }) => theme.responsive.gap('M')};
  padding-right: ${({ theme }) => theme.responsive.gap('M')};
`;

export const PortfolioTitle = styled.h2`
  flex: 1 0 0;
  color: ${theme.colors.grayScale.black};
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.625rem; /* 150% */
  letter-spacing: -0.035rem;
  margin: 0;
  white-space: nowrap;
`;

export const RegisterButtonWrapper = styled.div`
  flex-shrink: 0;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const SectionTitle = styled.h3`
  color: ${theme.colors.grayScale.black};
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem; /* 160% */
  letter-spacing: -0.025rem;
  margin: 0;
  white-space: nowrap;
`;

export const ExperienceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.gap('S')};
  width: 100%;
`;

export const StrengthsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.gap('S')};
  width: 100%;
  margin-top: 2.75rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const TextAreaField = styled.textarea`
  ${({ theme }) => theme.fonts.body.l500}
  width: 100%;
  min-height: 1.5rem;
  height: 1.5rem;
  max-height: 20rem;
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.grayScale.black};
  resize: none;
  outline: none;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5rem;
  overflow-y: auto;
  overflow-wrap: break-word;
  overflow: hidden;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gray700};
  }

  &:focus {
    ${({ theme }) => theme.fonts.heading.h3}
    background: transparent;

    &::placeholder {
      ${({ theme }) => theme.fonts.body.l500}
      color: ${({ theme }) => theme.colors.grayScale.gray700};
    }
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }
`;

export const TextAreaWrapper = styled.div`
  ${({ theme }) => theme.responsive.property.paddingComplex('S', 'M', 'S', 'M')}
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  border-radius: ${({ theme }) => theme.borders.smooth.wide};
  
  ${({ theme }) => theme.media.desktop} {
    border-radius: ${({ theme }) => theme.borders.smooth.desktop};
  }

  ${({ theme }) => theme.media.tablet} {
    border-radius: ${({ theme }) => theme.borders.smooth.tablet};
  }

  ${({ theme }) => theme.media.mobile} {
    border-radius: ${({ theme }) => theme.borders.smooth.mobile};
  }
`;

export const CheckboxWrapper = styled.div`
  margin-top: ${({ theme }) => theme.responsive.gap('S')};
`;

export const TimeAvailabilitySection = styled(Section)`
  gap: 1.5rem;
`;

export const TimeRowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7.5rem;
  flex-wrap: nowrap;
  width: 100%;
`;

export const TimeFrame = styled.div<{ $isDaily?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex: 1 1 0;
  min-width: 0;
  
  /* 1일 기준만 오른쪽으로 gap('XS')만큼 이동 */
  ${({ $isDaily, theme }) => $isDaily && `margin-left: ${theme.responsive.gap('XS')};`}
  
  /* SegmentControlTight의 고정 너비를 조정 */
  & > div {
    flex: 1 1 0;
    min-width: 0;
  }
`;

export const TimeRowLabel = styled.span`
  color: ${theme.colors.grayScale.black};
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.75rem; /* 155.556% */
  letter-spacing: -0.0225rem;
`;

