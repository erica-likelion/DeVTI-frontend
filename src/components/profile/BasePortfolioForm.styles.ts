import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: none;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('S')}
  align-self: stretch;
  margin-bottom: 2.75rem;
  
  ${({ theme }) => theme.media.wide} {
    display: flex;
    align-items: center;
    align-self: stretch;
  }
  
  ${({ theme }) => theme.media.desktop} {
    display: flex;
    align-items: center;
    align-self: stretch;
  }
  
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    align-items: center;
    align-self: stretch;
  }
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    align-items: center;
    align-self: stretch;
  }
`;

export const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.75rem;
  width: 100%;
  padding: 0 ${({ theme }) => theme.gaps.R.wide};

  ${({ theme }) => theme.media.desktop} {
    padding: 0 ${({ theme }) => theme.gaps.R.desktop};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 0 ${({ theme }) => theme.gaps.R.tablet};
  }

  ${({ theme }) => theme.media.mobile} {
    display: flex;
    padding: 0 ${({ theme }) => theme.gaps.R.mobile};
    flex-direction: column;
    align-items: flex-start;
    gap: 2.75rem;
    align-self: stretch;
  }
`;

export const PortfolioTitle = styled.h2<{ $isDesignPortfolio?: boolean }>`
  flex: 1 0 0;
  ${theme.fonts.heading.h1}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: nowrap;

  ${({ $isDesignPortfolio }) =>
    $isDesignPortfolio &&
    `
    white-space: normal;
  `}
`;

export const PortfolioTitleLine = styled.span`
  ${theme.fonts.heading.h1}
  color: ${theme.colors.grayScale.black};
  display: inline;

  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

export const RegisterButtonWrapper = styled.div`
  flex-shrink: 0;

  ${({ theme }) => theme.media.tablet} {
    margin-right: -0.75rem; /* 기존 패딩보다 0.75rem 바깥으로 */
  }
`;

export const Section = styled.section`
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

export const ExperienceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.gap("S")};
  width: 100%;
`;

export const StrengthsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.gap("S")};
  width: 100%;
`;

export const GithubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.gap("S")};
  width: 100%;
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
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
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
  ${({ theme }) => theme.responsive.property.paddingComplex("S", "M", "S", "M")}
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

export const StrengthsTextAreaWrapper = styled(TextAreaWrapper)`
  ${({ theme }) => theme.media.tablet} {
    min-height: 4.25rem;

    /* 강점 textarea의 기본 높이와 최소 높이를 wrapper 높이에서 padding을 뺀 값으로 설정 */
    ${TextAreaField} {
      min-height: calc(
        4.25rem - ${({ theme }) => theme.gaps.S.tablet} * 2
      ); /* wrapper 높이 - 상하 padding */
      height: calc(
        4.25rem - ${({ theme }) => theme.gaps.S.tablet} * 2
      ); /* 기본 높이 */
    }
  }
`;

export const CheckboxWrapper = styled.div`
  margin-top: ${({ theme }) => theme.responsive.gap("S")};
`;

export const TimeAvailabilitySection = styled(Section)`
  gap: 1rem;
  overflow: visible; /* 그림자가 잘리지 않도록 */
  margin-top: 0;
`;

export const TimeRowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7.5rem;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 ${({ theme }) => theme.gaps.XS.wide};

  ${({ theme }) => theme.media.desktop} {
    padding: 0 ${({ theme }) => theme.gaps.XS.desktop};
  }

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: visible; /* 그림자가 위아래로 잘리지 않도록 */
    padding: ${({ theme }) => theme.gaps.XXS.tablet} ${({ theme }) => theme.gaps.XS.tablet}; /* 상하 Gap-XXS, 좌우 Gap-XS */
    gap: 7.5rem; /* 타블렛에서 gap 조정 */
    width: 100%;
  }

  ${({ theme }) => theme.media.mobile} {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: visible; /* 그림자가 위아래로 잘리지 않도록 */
    padding: ${({ theme }) => theme.gaps.XXS.mobile} ${({ theme }) => theme.gaps.XS.mobile}; /* 상하 Gap-XXS, 좌우 Gap-XS */
    gap: 7.5rem; /* 모바일에서 gap 조정 */
    width: 100%;
  }
`;

export const TimeFrame = styled.div<{ $isDaily?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex: 1 1 0;
  min-width: 0;
  margin-left: 0; /* 모든 화면에서 margin 제거 - TimeRowContainer의 gap으로 간격 관리 */

  /* SegmentControlTight의 고정 너비를 조정 */
  & > div {
    flex: 1 1 0;
    min-width: 0;
  }

  ${({ theme }) => theme.media.tablet} {
    flex: 0 0 auto; /* 타블렛에서 고정 너비 */
    min-width: auto;

    /* 마지막 요소에만 오른쪽 간격 추가 (스크롤 끝에 도달했을 때만 보임) */
    &:last-child {
      margin-right: 2rem; /* General-Margin: 2rem */
    }

    /* SegmentControlTight의 고정 너비를 조정 */
    & > div {
      flex: 0 0 auto;
      min-width: auto;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    flex: 0 0 auto; /* 모바일에서 고정 너비 */
    min-width: auto;

    /* 마지막 요소에만 오른쪽 간격 추가 (스크롤 끝에 도달했을 때만 보임) */
    &:last-child {
      margin-right: 2.5rem; /* General-Margin: 2.5rem */
    }

    /* SegmentControlTight의 고정 너비를 조정 */
    & > div {
      flex: 0 0 auto;
      min-width: auto;
    }
  }
`;

export const TimeRowLabel = styled.span`
  ${theme.fonts.heading.h3}
  color: ${theme.colors.grayScale.black};
  white-space: nowrap;
  flex-shrink: 0;
  display: inline-block;
  /* margin-top: 1rem; 제거됨 */
`;
