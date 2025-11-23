// WtLMemberList.styles.ts
import styled, { css } from "styled-components";

export const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  height: auto;
	width: ${({ theme }) => theme.responsive.width("max")};
  ${({ theme }) => theme.responsive.property.paddingComplex('M', 'L', 'M', 'M')}

  border-radius: ${({ theme }) => theme.responsive.borderRadius("soft")};
  background: ${({ theme }) => theme.colors.grayScale.white};

  cursor: pointer;

`;

export const LeftArea = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.responsive.gap("S")};
`;

export const Icon = styled.div`
  width: ${({ theme }) => theme.responsive.sourceWidth("L")};
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.responsive.borderRadius("round")};
	aspect-ratio: 1/1;
	flex-shrink: 0;
  
`;

export const Header = styled.div<{ disabled: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ disabled }) => (disabled ? "#999" : "#111")};
`;

export const KeywordArea = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.responsive.gap("S")};
  margin-left: auto;
`;

export const Indicator = styled.div`
  width: 1px;
  height: 2.25rem;
  background-color: ${({ theme }) => theme.colors.grayScale.gray300};
`;


export const IndicatorArea = styled.div`
  display: flex;
  padding: 0.125rem 0.25rem;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  margin-left: 1rem;
  margin-right: 1rem;
  gap: ${({ theme }) => theme.responsive.gap("S")};
`;

export const RightArea = styled.div`
  flex-shrink: 0;
  gap: ${({ theme }) => theme.responsive.gap("S")};
`;
