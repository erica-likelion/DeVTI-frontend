import styled from "styled-components";
import { theme } from "@/styles/theme";

const VIEWPORT_AVAILABLE_HEIGHT = "calc(100vh - 4.5rem - 4rem)"; // TopNav + Footer padding in Layout

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${VIEWPORT_AVAILABLE_HEIGHT};
  padding: 15.5rem 46rem 0; /* TopNav(4.5rem) 아래부터 프로필 이미지까지 20rem (4.5rem + 15.5rem = 20rem), 좌우 46rem */
  gap: 3.5rem;
  margin-left: -2.5rem; /* Layout Main의 좌우 padding 2.5rem 제거 */
  margin-right: -2.5rem;
  width: calc(100% + 5rem); /* 좌우 margin을 고려한 width */

  ${theme.media.tablet} {
    padding: 15.5rem 2rem 0;
    margin-left: -2rem;
    margin-right: -2rem;
    width: calc(100% + 4rem);
    gap: 3rem;
  }

  ${theme.media.mobile} {
    min-height: auto;
    padding: 15.5rem 1.5rem 0;
    margin-left: -1rem;
    margin-right: -1rem;
    width: calc(100% + 2rem);
    gap: 2.5rem;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 100%;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.75rem;

  ${theme.media.mobile} {
    margin-bottom: 3rem;
  }
`;

export const ProfileImage = styled.img`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  object-fit: cover;
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;

  ${theme.media.mobile} {
    width: 8rem;
    height: 8rem;
  }
`;

export const ProfileImagePlaceholder = styled.img.attrs({
  src: "/Image.svg",
  alt: "기본 프로필 이미지",
})`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;

  ${theme.media.mobile} {
    width: 8rem;
    height: 8rem;
  }
`;

export const UserName = styled.h1`
  ${theme.fonts.heading.h1}
  color: ${theme.colors.grayScale.black};
  margin: 0 0 7.5rem;

  ${theme.media.mobile} {
    margin-bottom: 3rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const EditWrapper = styled.div`
  position: relative;
  min-height: ${VIEWPORT_AVAILABLE_HEIGHT};
  margin-left: -2.5rem;
  margin-right: -2.5rem;
  margin-top: -4.5rem;
  margin-bottom: -4rem;
  width: calc(100% + 5rem);
  padding-top: 4.5rem;
  padding-bottom: 4rem;
  background: ${theme.colors.grayScale.white} !important;
  z-index: 1;

  ${theme.media.tablet} {
    margin-left: -2rem;
    margin-right: -2rem;
    width: calc(100% + 4rem);
  }

  ${theme.media.mobile} {
    margin-left: -1rem;
    margin-right: -1rem;
    width: calc(100% + 2rem);
    margin-bottom: -4.5rem;
    padding-bottom: 4.5rem;
  }
`;

export const EditContainer = styled.div`
  display: flex;
  height: ${VIEWPORT_AVAILABLE_HEIGHT};
  width: 100%;
  border-radius: 2rem;
  background: ${theme.colors.grayScale.white} !important;
  overflow: hidden;
  position: relative;
  z-index: 1;

  ${theme.media.desktop} {
    grid-template-columns: 24rem 1fr;
  }
`;

export const LeftPanel = styled.div`
  flex: 0 0 auto;
  width: 28rem; /* var(--Component-Width-Medium, 28rem) */
  height: 59.25rem;
  padding: 5rem 2.5rem 2.5rem 2.5rem; /* var(--General-Margin, 2.5rem) */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.secondary.VT50};
  overflow-y: auto;
  overflow-x: hidden;

  ${theme.media.tablet} {
    width: 100%;
    max-width: 100%;
    padding: 6rem 2rem;
    height: auto;
  }

  ${theme.media.mobile} {
    width: 100%;
    padding: 5rem 1.5rem;
  }
`;

export const RightPanel = styled.div`
  position: relative;
  flex: 1 0 0;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.75rem 2.5rem; /* var(--General-Margin, 2.5rem) */
  /* TODO: responsive 유틸리티 커밋 후 적용: theme.responsive.property.gap('XXL') */
  gap: 2.75rem;
  background: ${theme.colors.grayScale.white} !important;
  height: 100%;
  overflow-y: auto;
  z-index: 1;

  ${theme.media.tablet} {
    height: auto;
    padding: 3rem 2.5rem 4rem;
  }

  ${theme.media.mobile} {
    display: none;
  }
`;

export const EditProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 100%;
  width: 100%;
  flex: 1;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 0;
`;

export const EditProfileImageWrapper = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: calc(2rem + 1.25rem); /* 업로드 버튼 하단(bottom: -1.25rem + 버튼높이)부터 "이름" 텍스트까지 2rem 간격 */
  width: auto;
`;

export const EditProfileImage = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  aspect-ratio: 1/1;
  border-radius: 6.25rem;
  object-fit: cover;
`;

export const EditProfileImagePlaceholder = styled.img.attrs({
  src: "/ProfileImage.svg",
  alt: "기본 프로필 이미지",
})`
  width: 7.5rem;
  height: 7.5rem;
  aspect-ratio: 1/1;
  border-radius: 6.25rem;
  object-fit: cover;
`;

export const UploadButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: -1.25rem;
`;


export const EditUserName = styled.h2`
  ${theme.fonts.heading.h2}
  font-weight: 600;
  color: ${theme.colors.grayScale.black};
  margin: 0 auto;
  margin-bottom: 2.5rem;
  text-align: center;
  width: 100%;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  /* TODO: responsive 유틸리티 커밋 후 적용: theme.responsive.property.gap('XS') */
  gap: 0.75rem;
  width: 100%;
  margin-bottom: 1rem; /* var(--Gap-S, 1rem) - 인풋필드와 다음 텍스트 사이 간격 */

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled.label`
  ${theme.fonts.heading.h4}
  color: ${theme.colors.grayScale.black};
  width: 100%;
`;

export const DBTIButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  button {
    justify-content: flex-start;
    width: 100%;
  }
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
// 오른쪽 패널 안내 메시지
export const EmptyMessage = styled.h2`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  text-align: center;
  line-height: 1.5;
  white-space: pre-line;
  margin: 0;
`;

export const NotReadyMessage = styled.p`
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.gray700};
  margin: 0;
  text-align: center;
`;
