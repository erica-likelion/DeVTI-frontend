import styled from "styled-components";
import { theme } from "@/styles/theme";
import BkMTextButton from "@/components/ButtonStatic/BkMTextButton";
import WtLCloseButton from "@/components/ButtonDynamic/WtLCloseButton";

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
  ${theme.fonts.heading.h1}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: normal !important; /* 띄어쓰기 허용 */
  
  ${({ theme }) => theme.media.tablet} {
    align-self: flex-start; /* 왼쪽 정렬 */
    white-space: normal !important; /* 띄어쓰기 허용 */
  }
  
  ${({ theme }) => theme.media.desktop} {
    white-space: normal !important; /* 띄어쓰기 허용 */
  }
  
  ${({ theme }) => theme.media.wide} {
    white-space: normal !important; /* 띄어쓰기 허용 */
  }
  
  ${({ theme }) => theme.media.mobile} {
    white-space: normal !important; /* 띄어쓰기 허용 */
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gaps.S.wide}; /* 모든 화면에서 수정/삭제 버튼 사이 간격 1rem */
  flex-shrink: 0;
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* 0.625rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 수정/삭제 버튼 사이 간격 0.5rem */
  }
`;

export const EditButton = styled(BkMTextButton)`
  display: flex;
  width: ${({ theme }) => theme.componentWidths.min.wide}; /* Component-Width-Min: 8.25rem */
  padding: ${({ theme }) => theme.gaps.XXS.wide} 0; /* Gap-XXS: 0.5rem 상하, 좌우 0 */
  justify-content: center;
  align-items: center;
  margin-right: 0; /* ButtonWrapper의 gap으로 간격 관리 */
  
  ${({ theme }) => theme.media.desktop} {
    width: ${({ theme }) => theme.componentWidths.min.desktop}; /* 8.25rem */
    padding: ${({ theme }) => theme.gaps.XXS.desktop} 0;
  }
  
  ${({ theme }) => theme.media.tablet} {
    width: ${({ theme }) => theme.componentWidths.min.tablet}; /* 8rem */
    padding: ${({ theme }) => theme.gaps.XXS.tablet} 0; /* 0.375rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: ${({ theme }) => theme.componentWidths.min.mobile}; /* Component-Width-Min: 6.0625rem */
    padding: ${({ theme }) => theme.gaps.XXS.mobile} 0; /* Gap-XXS: 0.25rem 상하, 좌우 0 */
  }
`;

export const DeleteButton = styled(BkMTextButton)`
  display: flex;
  width: ${({ theme }) => theme.componentWidths.min.wide}; /* Component-Width-Min: 8.25rem */
  padding: ${({ theme }) => theme.gaps.XXS.wide} 0; /* Gap-XXS: 0.5rem 상하, 좌우 0 */
  justify-content: center;
  align-items: center;
  
  ${({ theme }) => theme.media.desktop} {
    width: ${({ theme }) => theme.componentWidths.min.desktop}; /* 8.25rem */
    padding: ${({ theme }) => theme.gaps.XXS.desktop} 0;
  }
  
  ${({ theme }) => theme.media.tablet} {
    width: ${({ theme }) => theme.componentWidths.min.tablet}; /* 8rem */
    padding: ${({ theme }) => theme.gaps.XXS.tablet} 0; /* 0.375rem */
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
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
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

export const DesignWorkSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
  width: 100%;
  margin-top: 2.75rem;
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* 0.625rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 0.5rem */
  }
`;

export const FileButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  
  /* 모바일에서 다운로드 아이콘 크기 조정 */
  ${({ theme }) => theme.media.mobile} {
    button span:last-child {
      display: flex;
      width: 1.5rem;
      height: 1.5rem;
      padding: 0.125rem;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1/1;
      
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export const EmptyText = styled.span`
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.gray700};
`;

export const SelfAssessmentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
  width: 100%;
  margin-top: 2.75rem;
  
  ${({ theme }) => theme.media.tablet} {
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* 0.625rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 0.5rem */
    margin-top: 2.75rem;
  }
`;

export const SelfAssessmentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
  
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.S.tablet}; /* ~에 대한 이해도 자가평가 글씨 아래 gap 1 */
  }
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* ~에 대한 이해도 자가평가 글씨 아래 gap 1 */
  }
`;

