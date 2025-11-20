// WtLMemberList.styles.ts
import styled, { css } from "styled-components";

export const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  height: auto;
	width: 71.5rem;
  padding: 1.75rem; ;
  border-radius: ${({ theme }) => theme.borders.soft};
  background: ${({ theme }) => theme.colors.grayScale.white};

  cursor: pointer;



`;

export const LeftArea = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
`;

export const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
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
  gap: 8px;
  margin-left: auto;
  margin-right: 16px;
`;

export const KeywordTag = styled.div`
  
`;

export const RightArea = styled.div`
  flex-shrink: 0;
`;
