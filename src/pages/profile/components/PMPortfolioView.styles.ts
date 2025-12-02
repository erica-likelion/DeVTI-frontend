import styled from "styled-components";
import { theme } from "@/styles/theme";
import BkMTextButton from "@/components/ButtonStatic/BkMTextButton";

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
  /* 등록 버튼 오른쪽 간격: RightPanel의 padding(2.5rem)만 적용, 추가 padding 없음 */
  
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-end; /* 오른쪽 정렬 */
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* PM 포트폴리오 아래 gap 1 (0.625rem) */
    margin-bottom: 2.75rem; /* 수정/삭제 버튼 아래 2.75 간격 */
  }
  
  ${({ theme }) => theme.media.mobile} {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
  }
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
  
  ${({ theme }) => theme.media.tablet} {
    align-self: flex-start; /* 왼쪽 정렬 */
  }
  
  ${({ theme }) => theme.media.mobile} {
    color: #19181D;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem; /* 145.455% */
    letter-spacing: -0.0275rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem; /* 모든 화면에서 수정/삭제 버튼 사이 간격 1rem */
  flex-shrink: 0;
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: 1rem; /* 수정/삭제 버튼 사이 간격 1rem */
  }
`;

export const EditButton = styled(BkMTextButton)`
  display: flex;
  width: ${({ theme }) => theme.componentWidths.min.mobile}; /* Component-Width-Min: 6.0625rem */
  padding: ${({ theme }) => theme.gaps.XXS.mobile} 0; /* Gap-XXS: 0.25rem 상하, 좌우 0 */
  justify-content: center;
  align-items: center;
  margin-right: 0; /* ButtonWrapper의 gap으로 간격 관리 */
  
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    width: var(--Component-Width-Min, 8rem);
    padding: var(--Gap-XXS, 0.375rem) 0;
    justify-content: center;
    align-items: center;
  }
  
  ${({ theme }) => theme.media.desktop} {
    width: ${({ theme }) => theme.componentWidths.min.desktop}; /* 8.25rem */
    padding: ${({ theme }) => theme.gaps.XXS.desktop} 0;
  }
  
  ${({ theme }) => theme.media.wide} {
    width: ${({ theme }) => theme.componentWidths.min.wide}; /* 8.25rem */
    padding: ${({ theme }) => theme.gaps.XXS.wide} 0;
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: ${({ theme }) => theme.componentWidths.min.mobile}; /* Component-Width-Min: 6.0625rem */
    padding: ${({ theme }) => theme.gaps.XXS.mobile} 0; /* Gap-XXS: 0.25rem 상하, 좌우 0 */
    justify-content: center;
    align-items: center;
  }
`;

export const DeleteButton = styled(BkMTextButton)`
  display: flex;
  width: ${({ theme }) => theme.componentWidths.min.wide}; /* Component-Width-Min: 8.25rem */
  padding: ${({ theme }) => theme.gaps.XXS.desktop} 0; /* Gap-XXS: 0.5rem 상하, 좌우 0 */
  justify-content: center;
  align-items: center;
  
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    width: var(--Component-Width-Min, 8rem);
    padding: var(--Gap-XXS, 0.375rem) 0;
    justify-content: center;
    align-items: center;
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: ${({ theme }) => theme.componentWidths.min.mobile}; /* 6.0625rem */
    padding: ${({ theme }) => theme.gaps.XXS.mobile} 0;
  }
`;

export const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.75rem;
  width: 100%;
  ${({ theme }) => theme.responsive.property.paddingComplex('none', 'L', 'none', 'M')} /* 좌 M(1.5rem), 우 General-Margin(2.5rem=L) - 자가평가 카드 오른쪽 2.5rem */
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
  
  ${({ theme }) => theme.media.tablet} {
    flex-shrink: 0; /* TimeAvailabilitySection에서 flex-shrink 방지 */
  }
`;

export const ExperienceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.gap('S')};
  width: 100%;
`;

export const CheckboxWrapper = styled.div`
  margin-top: ${({ theme }) => theme.responsive.gap('S')};
  
  button {
    pointer-events: none; /* 클릭 방지 */
    cursor: default;
  }
`;

export const StrengthsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.gap('S')};
  width: 100%;
  margin-top: 2.75rem;
`;

export const TimeAvailabilitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 2.75rem;
  
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem; /* 할애할 수 있는 시간 글씨 아래 1rem gap */
  }
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem; /* 할애할 수 있는 시간 글씨 아래 1rem gap */
  }
`;

export const TimeRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7.5rem;
  flex-wrap: nowrap;
  width: 100%;
  
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* 1일 기준과 1주 기준 사이 거리 1 (0.625rem) */
    width: auto;
    margin-left: 0.75rem; /* 할애할 수 있는 시간 제목보다 오른쪽으로 0.75rem 간격 */
  }
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 1일 기준과 1주 기준 사이 거리 1 (0.625rem) */
    width: auto;
    margin-left: 0.75rem; /* 할애할 수 있는 시간 제목보다 오른쪽으로 0.75rem 간격 */
  }
`;

export const TimeFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* 1일 기준과 선택한 시간 사이 gap 1 (0.625rem) */
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 1일 기준과 선택한 시간 사이 gap 1 (0.625rem) */
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
  white-space: nowrap;
  flex-shrink: 0;
  display: inline-block;
`;

export const EmptyText = styled.span`
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.gray700};
`;

export const SelfAssessmentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 2.75rem;
`;

export const SelfAssessmentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem; /* ~에 대한 이해도 자가평가 글씨 아래 gap 1 */
  }
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem; /* ~에 대한 이해도 자가평가 글씨 아래 gap 1 */
  }
`;

