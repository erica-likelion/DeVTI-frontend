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
    align-items: flex-end;
    gap: ${({ theme }) => theme.gaps.S.tablet};
    margin-bottom: 2.75rem;
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
  white-space: nowrap;
  
  ${({ theme }) => theme.media.tablet} {
    align-self: flex-start;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
  
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const EditButton = styled(BkMTextButton)`
  display: flex;
  width: ${({ theme }) => theme.componentWidths.min.wide};
  padding: ${({ theme }) => theme.gaps.XXS.wide} 0;
  justify-content: center;
  align-items: center;
  margin-right: 0;
  
  ${({ theme }) => theme.media.desktop} {
    width: ${({ theme }) => theme.componentWidths.min.desktop};
    padding: ${({ theme }) => theme.gaps.XXS.desktop} 0;
  }
  
  ${({ theme }) => theme.media.tablet} {
    width: ${({ theme }) => theme.componentWidths.min.tablet};
    padding: ${({ theme }) => theme.gaps.XXS.tablet} 0;
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: ${({ theme }) => theme.componentWidths.min.mobile};
    padding: ${({ theme }) => theme.gaps.XXS.mobile} 0;
  }
`;

export const DeleteButton = styled(BkMTextButton)`
  display: flex;
  width: ${({ theme }) => theme.componentWidths.min.wide};
  padding: ${({ theme }) => theme.gaps.XXS.wide} 0;
  justify-content: center;
  align-items: center;
  
  ${({ theme }) => theme.media.desktop} {
    width: ${({ theme }) => theme.componentWidths.min.desktop};
    padding: ${({ theme }) => theme.gaps.XXS.desktop} 0;
  }
  
  ${({ theme }) => theme.media.tablet} {
    width: ${({ theme }) => theme.componentWidths.min.tablet};
    padding: ${({ theme }) => theme.gaps.XXS.tablet} 0;
  }
  
  ${({ theme }) => theme.media.mobile} {
    width: ${({ theme }) => theme.componentWidths.min.mobile};
    padding: ${({ theme }) => theme.gaps.XXS.mobile} 0;
  }
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
  gap: ${({ theme }) => theme.responsive.gap('S')};
  width: 100%;
`;

export const CheckboxWrapper = styled.div`
  margin-top: ${({ theme }) => theme.responsive.gap('S')};
  
  button {
    pointer-events: none;
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

export const GithubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.responsive.gap('S')};
  width: 100%;
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
  margin-top: ${({ theme }) => theme.responsive.gap('S')};
  
  &:first-child {
    margin-top: ${({ theme }) => theme.responsive.gap('S')};
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

