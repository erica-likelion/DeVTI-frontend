import styled, { css } from "styled-components";
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2.75rem;
  
  ${({ theme }) => theme.media.tablet} {
    padding-right: var(--General-Margin, 2rem);
    gap: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
  }
`;

export const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.75rem;
  width: 100%;
  padding-left: ${({ theme }) => theme.responsive.gap('M')};
  padding-right: ${({ theme }) => theme.responsive.gap('M')};
  
  ${({ theme }) => theme.media.tablet} {
    padding-left: 0.75rem;
    padding-right: ${({ theme }) => theme.responsive.gap('M')};
  }
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    padding: 0 ${({ theme }) => theme.gaps.R.mobile}; /* 상하 0, 좌우 Gap-R(0.625rem) */
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
  
  ${({ $isDesignPortfolio, theme }) => 
    $isDesignPortfolio && theme.media.tablet && `
    white-space: normal;
  `}
  
  /* 디자인 포트폴리오일 때 타블렛이 아닌 경우 공백 제거 */
  ${({ $isDesignPortfolio, theme }) => 
    $isDesignPortfolio && `
    font-size: 0;
    
    ${theme.media.desktop} {
      font-size: inherit;
      white-space: normal;
    }
    
    ${theme.media.wide} {
      font-size: inherit;
      white-space: normal;
    }
    
    ${theme.media.mobile} {
      font-size: inherit;
      white-space: normal;
    }
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

export const StrengthsTextAreaWrapper = styled(TextAreaWrapper)`
  ${({ theme }) => theme.media.tablet} {
    min-height: 4.25rem;
    
    /* 강점 textarea의 기본 높이와 최소 높이를 wrapper 높이에서 padding을 뺀 값으로 설정 */
    ${TextAreaField} {
      min-height: calc(4.25rem - ${({ theme }) => theme.gaps.S.tablet} * 2); /* wrapper 높이 - 상하 padding */
      height: calc(4.25rem - ${({ theme }) => theme.gaps.S.tablet} * 2); /* 기본 높이 */
    }
  }
`;

export const CheckboxWrapper = styled.div`
  margin-top: ${({ theme }) => theme.responsive.gap('S')};
`;

export const TimeAvailabilitySection = styled(Section)`
  gap: 1rem;
`;

export const TimeRowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7.5rem;
  flex-wrap: nowrap;
  width: 100%;
  
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding-left: 0.5rem; /* 첫 번째 요소 왼쪽 그림자 공간 확보 */
    padding-right: 0; /* 스크롤 전에는 오른쪽 간격 없음 */
    gap: 7.5rem; /* 타블렛에서 gap 조정 */
    width: 100%;
  }
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding-left: 0.5rem; /* 첫 번째 요소 왼쪽 그림자 공간 확보 */
    padding-right: 0; /* 스크롤 전에는 오른쪽 간격 없음 */
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
`;

