import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  background: ${theme.colors.grayScale.white};
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  width: 100%;
  max-width: 100%;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.75rem; // 60px

  ${theme.media.mobile} {
    margin-bottom: 3.75rem;
  }
`;

export const ProfileImage = styled.img`
  width: 12.5rem; // 200pt 고정
  height: 12.5rem; // 200pt 고정
  border-radius: 50%;
  object-fit: cover;
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;

  ${theme.media.mobile} {
    width: 8rem;
    height: 8rem;
  }
`;

export const ProfileImagePlaceholder = styled.div`
  width: 12.5rem; // 200pt 고정
  height: 12.5rem; // 200pt 고정
  border-radius: 50%;
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;

  ${theme.media.mobile} {
    width: 8rem;
    height: 8rem;
  }
`;

export const UserName = styled.h1`
  ${theme.fonts.heading.h1}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  margin-bottom: 7.5rem; // 120px

  ${theme.media.mobile} {
    margin-bottom: 7.5rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

// 프로필 페이지 전용 버튼 스타일 (공유 컴포넌트 수정 없이 오버라이드)
export const ProfileButton = styled.button`
  ${theme.fonts.heading.h3} // Header/H3
  display: flex;
  padding: 0.75rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.grayScale.gray300};
  color: ${theme.colors.grayScale.black};
  border: none;
  border-radius: ${theme.borders.sharp};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: ${theme.colors.grayScale.gray400};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${theme.media.wide} {
    width: 28rem;
  }

  ${theme.media.desktop} {
    width: 28rem;
  }

  ${theme.media.tablet} {
    width: 20rem;
  }

  ${theme.media.mobile} {
    width: 11.375rem;
  }
`;

// 편집 모드 스타일
// Footer 높이 계산: 
// - Desktop/Tablet: padding 0.75rem(12px) * 2 + line-height 1.5rem(24px) = 3rem(48px)
// - Mobile: height 3.75rem(60px) 명시적으로 설정됨
// EditContainer는 Footer 아래에 위치해야 하므로 bottom을 Footer 높이만큼 설정
// 저장 버튼 아래 간격은 LeftPanel의 padding-bottom (7.5rem)에서 관리
export const EditContainer = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 64px; // TopNav 높이
  bottom: 3rem; // Footer 높이 (48px) - Footer가 사이드섹션 안에 들어가지 않도록
  width: 100vw; // viewport 전체 너비 사용
  height: calc(100vh - 64px - 3rem); // TopNav + Footer 제외한 전체 높이
  flex-direction: row;
  background: ${theme.colors.grayScale.white};
  margin: 0;
  padding: 0;
  z-index: 1;

  ${theme.media.tablet} {
    top: 64px;
    bottom: 3rem; // Footer 높이 (48px)
    height: calc(100vh - 64px - 3rem);
  }

  ${theme.media.mobile} {
    top: 56px;
    bottom: 3.75rem; // 모바일 Footer 높이 (60px)
    height: calc(100vh - 56px - 3.75rem);
  }
`;

export const LeftPanel = styled.div`
  flex: 0 0 auto;
  min-width: 24.25rem; // 388px
  max-width: 24.25rem; // 388px
  background: ${theme.colors.grayScale.gray100};
  padding: 7.5rem 2rem 7.5rem 2rem; // 상 120px, 하 120px (저장 버튼 아래 간격), 좌우 2rem (GeneralMargin)
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto; // 내용이 많을 경우 스크롤 가능
  overflow-x: hidden;

  ${theme.media.tablet} {
    min-width: 24.25rem;
    max-width: 24.25rem;
    padding: 7.5rem 2rem 7.5rem 2rem;
  }

  ${theme.media.mobile} {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 7.5rem 1rem 7.5rem 1rem;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3.75rem; // 60px
  background: ${theme.colors.grayScale.white};
  height: 100%;
  overflow-y: auto;
  gap: 2.5rem;

  ${theme.media.mobile} {
    display: none;
  }
`;

export const EditProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0; // gap 제거 - 각 요소 간격을 개별적으로 관리
  max-width: 100%;
  width: 100%;
  flex: 1;
  padding-top: 0; // LeftPanel의 padding-top (7.5rem)이 프로필 아이콘 위 간격
  padding-bottom: 0; // 저장 버튼 아래 간격은 LeftPanel의 padding-bottom (7.5rem)에서 관리
  min-height: 0; // flex item이 shrink할 수 있도록
`;

export const EditProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem; // 40px (프로필 아이콘과 사용자 이름 사이) - 정확히 40px
  width: 100%; // 전체 너비 사용하여 중앙 정렬 보장
`;

export const EditProfileImage = styled.img`
  width: 7.5rem; // 120px
  height: 7.5rem; // 120px
  border-radius: 50%;
  object-fit: cover;
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;

  ${theme.media.mobile} {
    width: 7.5rem;
    height: 7.5rem;
  }
`;

export const EditProfileImagePlaceholder = styled.div`
  width: 7.5rem; // 120px
  height: 7.5rem; // 120px
  border-radius: 50%;
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;

  ${theme.media.mobile} {
    width: 7.5rem;
    height: 7.5rem;
  }
`;

export const EditUserName = styled.h2`
  ${theme.fonts.heading.h2}
  font-weight: 600; // 세미볼드
  color: ${theme.colors.grayScale.black};
  margin: 0 auto; // 가운데 정렬
  margin-bottom: 2.5rem; // 40px (사용자 이름과 한 줄 소개 사이)
  text-align: center;
  width: 100%; // 전체 너비 사용하여 중앙 정렬 보장
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem; // 12px
  margin-bottom: 2.5rem; // 40px (각 FormSection 사이 간격)

  &:last-of-type {
    margin-bottom: 0; // 마지막 FormSection은 margin-bottom 제거
  }
`;

export const FormLabel = styled.label`
  ${theme.fonts.heading.h4}
  color: ${theme.colors.grayScale.black};
  width: auto;
  min-width: 3.25rem; // 52px for 개BTI
`;

// 한 줄 소개 입력 필드
export const IntroInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem; // 20px
  padding: 1rem; // 16px
  background: ${theme.colors.grayScale.white};
  border-radius: ${theme.borders.soft}; // 1.5rem (18px)
  box-shadow: 0 0 2px 0 ${theme.colors.transparents.BL100};
  width: 100%;
`;

export const IntroInput = styled.input`
  ${theme.fonts.body.l500}
  flex: 1;
  border: none;
  background: transparent;
  color: ${theme.colors.grayScale.black};
  outline: none;

  &::placeholder {
    color: ${theme.colors.grayScale.gray700};
  }
`;

export const CalendarIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

// 개BTI 버튼
export const DevBTIButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem; // 12px
  padding: 0.5rem 1rem; // 8px 16px
  background: ${theme.colors.grayScale.gray300};
  border: none;
  border-radius: ${theme.borders.sharp};
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.grayScale.gray400};
  }
`;

export const DevBTIIcon = styled.div`
  width: 1.5rem; // 24px
  height: 1.5rem; // 24px
  border-radius: ${theme.borders.round}; // 2.25rem (36px) - 완전히 원형
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;
`;

export const DevBTIText = styled.span`
  ${theme.fonts.body.l500}
  font-weight: 600; // 세미볼드
  color: ${theme.colors.grayScale.black};
  flex: 1;
  text-align: left;
`;

// 파트 추가 필드
export const PartAddField = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem; // 16px
  padding: 0.5rem 1rem; // 8px 16px
  background: transparent;
  border: 1px solid ${theme.colors.grayScale.gray300};
  border-radius: ${theme.borders.sharp};
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.grayScale.gray50};
  }
`;

export const PartAddText = styled.span`
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.black};
  flex: 1;
  text-align: left;
`;

export const PartAddIcon = styled.div`
  width: 1.5rem; // 24px
  height: 1.5rem; // 24px
  border-radius: ${theme.borders.round}; // round border-radius
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;
`;

export const PartSelectorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SelectedPartList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SelectedPartChip = styled.button<{ $active: boolean }>`
  ${theme.fonts.body.m500}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 1rem;
  border-radius: ${theme.borders.round};
  border: 1px solid
    ${({ $active }) =>
      $active ? theme.colors.grayScale.gray600 : theme.colors.grayScale.gray300};
  background: ${({ $active }) =>
    $active ? theme.colors.grayScale.gray200 : theme.colors.grayScale.white};
  color: ${theme.colors.grayScale.black};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.colors.grayScale.gray500};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary.VT500};
    outline-offset: 2px;
  }
`;

export const PartDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  background: ${theme.colors.grayScale.white};
  border-radius: ${theme.borders.soft};
  box-shadow: ${theme.effects.dropShadows.DS200};
  z-index: 10;
`;

export const PartDropdownItem = styled.button`
  ${theme.fonts.body.m500}
  display: flex;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: ${theme.colors.grayScale.black};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: ${theme.colors.grayScale.gray100};
  }

  &:disabled {
    color: ${theme.colors.grayScale.gray500};
    cursor: not-allowed;
  }
`;

// 저장 버튼
// 저장 버튼 아래 간격은 LeftPanel의 padding-bottom (7.5rem = 120px)에서 관리
export const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 0;
  padding-bottom: 0; // LeftPanel의 padding-bottom에서 간격 관리
  min-height: 0; // flex item이 shrink할 수 있도록
`;

export const SaveButton = styled.button`
  ${theme.fonts.heading.h3}
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.75rem; // 12px spacing
  padding: 0.5rem 2.75rem; // 8px 44px (vertical: 8px, horizontal: 44px)
  background: ${theme.colors.grayScale.gray300} !important; // GlobalStyle의 button reset 오버라이드
  border: none !important;
  border-radius: ${theme.borders.sharp};
  color: ${theme.colors.grayScale.black};
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: fit-content; // ComponentWidthMin - 내용에 맞게 자동 조정
  min-width: fit-content;
  height: 2.75rem; // 44pt - 고정 높이
  min-height: 2.75rem;
  box-sizing: border-box;
  font-family: inherit;
  outline: none;

  &:hover:not(:disabled) {
    background: ${theme.colors.grayScale.gray400} !important;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  ${theme.media.mobile} {
    width: 100%;
    min-width: 100%;
    height: auto; // 모바일에서는 높이 자동
    min-height: auto;
  }
`;

// 오른쪽 패널 안내 메시지
export const EmptyMessage = styled.h2`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
  margin-top: auto;
  margin-bottom: auto;
`;

export const NotReadyMessage = styled.p`
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.gray700};
  margin: 0;
  text-align: center;
`;
