import styled from "styled-components";
import { theme } from "@/styles/theme";
import WtLPawButton from "@/components/ButtonDynamic/WtLPawButton";

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

export const SectionTitle = styled.h3`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: nowrap;
`;

export const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
  flex-wrap: nowrap;
  width: 100%;
  
  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    gap: ${({ theme }) => theme.gaps.S.wide}; /* 1rem */
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    /* 스크롤바 숨기기 (선택사항) */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.gaps.S.mobile}; /* 0.5rem */
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
  }
  
  /* 업로드한 파일 버튼도 줄바꿈 방지 */
  & > button {
    flex-shrink: 0;
    white-space: nowrap;
  }
`;

export const UploadButton = styled(WtLPawButton)`
  /* WtLPawButton의 기본 pawprint 아이콘 숨기기 */
  & > span:first-child {
    display: none;
  }
  
  /* width: 100% 제거하여 내용에 맞게 자동 조정 */
  width: auto;
  flex-shrink: 0; /* 줄어들지 않도록 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  
  /* disabled 상태일 때 hover/active/clicked 효과 제거 및 배경색 명시 */
  &:disabled {
    background: ${({ theme }) => theme.colors.grayScale.white} !important;
    color: ${({ theme }) => theme.colors.grayScale.gray300} !important;
    
    &:hover {
      background: ${({ theme }) => theme.colors.grayScale.white} !important;
      color: ${({ theme }) => theme.colors.grayScale.gray300} !important;
    }
    
    &:active {
      background: ${({ theme }) => theme.colors.grayScale.white} !important;
      color: ${({ theme }) => theme.colors.grayScale.gray300} !important;
    }
  }
  
  /* disabled 상태에서 $isClicked 스타일 무시 */
  &[disabled][data-clicked="true"],
  &[disabled] {
    background: ${({ theme }) => theme.colors.grayScale.white} !important;
    color: ${({ theme }) => theme.colors.grayScale.gray300} !important;
  }
`;


export const UploadIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.gaps.XS.wide}; /* 0.75rem */
  
  ${({ theme }) => theme.media.tablet} {
    margin-right: ${({ theme }) => theme.gaps.XS.tablet}; /* 0.5rem */
  }
  
  ${({ theme }) => theme.media.mobile} {
    margin-right: ${({ theme }) => theme.gaps.XS.mobile}; /* 0.375rem */
  }
`;

