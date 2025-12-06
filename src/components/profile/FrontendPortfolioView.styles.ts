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
  
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-end; /* 오른쪽 정렬 */
    gap: ${({ theme }) => theme.gaps.S.wide}; /* 제목과 버튼 사이 gap 1rem */
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
  }
`;

export const PortfolioTitleLine = styled.span`
  ${theme.fonts.heading.h1}
  color: ${theme.colors.grayScale.black};
  display: inline;
  
  ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gaps.S.wide}; /* 모든 화면에서 수정/삭제 버튼 사이 간격 1rem */
  flex-shrink: 0;
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 수정/삭제 버튼 사이 간격 0.5rem */
  }
`;

export const EditButton = styled(BkMTextButton)`
  display: flex;
  width: ${({ theme }) => theme.responsive.property.width('min')};
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'none', 'XXS', 'none')};
  justify-content: center;
  align-items: center;
  margin-right: 0;
`;

export const DeleteButton = styled(BkMTextButton)`
  display: flex;
  width: ${({ theme }) => theme.responsive.property.width('min')};
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'none', 'XXS', 'none')};
  justify-content: center;
  align-items: center;
`;

export const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.75rem;
  width: 100%;
  ${({ theme }) => theme.responsive.property.paddingComplex('none', 'L', 'none', 'M')}
`;

export const SectionTitle = styled.h3`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: nowrap;
  
  ${({ theme }) => theme.media.tablet} {
    flex-shrink: 0;
  }
`;

export const ExperienceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.property.gap('S')};
  width: 100%;
`;

export const CheckboxWrapper = styled.div`
  margin-top: ${({ theme }) => theme.responsive.property.gap('S')};
  
  button {
    pointer-events: none;
    cursor: default;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.property.gap('S')};
  width: 100%;
  margin-top: 2.75rem;
`;

export const StrengthsSection = Section;
export const GithubSection = Section;

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
    gap: 1rem;
  }
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const TechAssessmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: ${({ theme }) => theme.responsive.gap('S', 'wide')};
  
  &:first-child {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'wide')};
  }
  
  ${({ theme }) => theme.media.desktop} {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'desktop')};
    
    &:first-child {
      margin-top: ${({ theme }) => theme.responsive.gap('S', 'desktop')};
    }
  }
  
  ${({ theme }) => theme.media.tablet} {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'tablet')};
    
    &:first-child {
      margin-top: ${({ theme }) => theme.responsive.gap('S', 'tablet')};
    }
  }
  
  ${({ theme }) => theme.media.mobile} {
    margin-top: ${({ theme }) => theme.responsive.gap('S', 'mobile')};
    
    &:first-child {
      margin-top: ${({ theme }) => theme.responsive.gap('S', 'mobile')};
    }
  }
`;

export const TechHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  
  ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const TechName = styled.h3`
  ${theme.fonts.heading.h3}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: nowrap;
`;

