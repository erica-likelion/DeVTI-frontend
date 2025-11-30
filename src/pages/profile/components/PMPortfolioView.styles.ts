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

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
`;

export const EditButton = styled(BkMTextButton)`
  /* BkMTextButton 스타일 그대로 사용 */
`;

export const DeleteButton = styled(BkMTextButton)`
  /* BkMTextButton 스타일 그대로 사용 */
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

export const CheckboxWrapper = styled.div`
  margin-top: ${({ theme }) => theme.responsive.gap('S')};
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
  gap: 1.5rem;
  width: 100%;
  margin-top: 2.75rem;
`;

export const TimeRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7.5rem;
  flex-wrap: nowrap;
  width: 100%;
`;

export const TimeFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex: 1 1 0;
  min-width: 0;
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
`;

export const EmptyText = styled.span`
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.gray700};
`;

export const SelfAssessmentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-top: 2.75rem;
`;

export const SelfAssessmentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;

