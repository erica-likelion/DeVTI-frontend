import styled from "styled-components";
import { theme } from "@/styles/theme";
import ImageIcon from "@/assets/icons/Image.svg";
import ProfileImageIcon from "@/assets/icons/ProfileImage.svg";

const VIEWPORT_AVAILABLE_HEIGHT = "calc(100vh - 4.5rem - 4rem)"; // TopNav + Footer padding in Layout

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${VIEWPORT_AVAILABLE_HEIGHT};
  padding: 15.5rem 2rem 0; /* TopNav(4.5rem) 아래부터 프로필 이미지까지 20rem (4.5rem + 15.5rem = 20rem), 좌우 2rem */
  gap: 3.75rem; /* wide, desktop */
  margin-left: -2.5rem; /* Layout Main의 좌우 padding 2.5rem 제거 */
  margin-right: -2.5rem;
  width: calc(100% + 5rem); /* 좌우 margin을 고려한 width */

  ${theme.media.tablet} {
    padding: 15.5rem 2rem 0;
    margin-left: -2rem;
    margin-right: -2rem;
    width: calc(100% + 4rem);
    gap: ${({ theme }) => theme.gaps.XXL.desktop}; /* tablet에서도 2.75rem 사용 (XXL.desktop 값) */
  }

  ${theme.media.mobile} {
    min-height: auto;
    padding: 15.5rem 1.5rem 0;
    margin-left: -1rem;
    margin-right: -1rem;
    width: calc(100% + 2rem);
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 100%;
  max-width: fit-content; /* 콘텐츠 크기에 맞춰 고정 */
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.75rem;

  ${theme.media.mobile} {
    margin-bottom: 3.75rem; /* 프로필 이미지와 사용자 이름 사이 gap */
  }
`;

export const ProfileImage = styled.img`
  width: 12.5rem; /* 모든 화면 크기에서 고정 (모바일 포함) */
  height: 12.5rem; /* 모든 화면 크기에서 고정 (모바일 포함) */
  border-radius: 50%;
  object-fit: cover;
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;
`;

export const ProfileImagePlaceholder = styled.img.attrs({
  src: ImageIcon,
  alt: "기본 프로필 이미지",
})`
  width: 12.5rem; /* 모든 화면 크기에서 고정 (모바일 포함) */
  height: 12.5rem; /* 모든 화면 크기에서 고정 (모바일 포함) */
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const UserName = styled.h1`
  ${theme.fonts.heading.h1}
  color: ${theme.colors.grayScale.black};
  margin: 0 0 7.5rem;

  ${theme.media.mobile} {
    margin-bottom: 7.5rem; /* 사용자 이름과 프로필 등록 버튼 사이 gap */
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content; /* 버튼 크기에 맞춰 고정 */
`;

export const EditWrapper = styled.div`
  position: relative;
  min-height: ${VIEWPORT_AVAILABLE_HEIGHT};
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  background: ${theme.colors.grayScale.white};
  z-index: 1;
  height: calc(100% - 9rem); /* Main의 padding-top(4.5rem) + padding-bottom(4.5rem) 제외 */

  ${theme.media.wide} {
    height: calc(100% - 9rem);
  }

  ${theme.media.desktop} {
    height: calc(100% - 9rem);
  }

  ${theme.media.tablet} {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    height: calc(100% - calc(4.5rem + ${({ theme }) => theme.gaps.R?.tablet || '0rem'}) - 3.75rem - 4.5rem); /* Main의 padding-top + padding-bottom + Footer 높이 제외 */
  }

  ${theme.media.mobile} {
    position: fixed;
    top: 4.5rem; /* TopNav 높이만큼 아래로 이동 */
    left: 0;
    right: 0;
    bottom: 3.75rem; /* Footer 높이(3.75rem)만큼 위로 이동 */
    width: 100vw;
    height: calc(100vh - 4.5rem - 3.75rem); /* TopNav(4.5rem) + Footer(3.75rem) 제외 */
    margin: 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-radius: 2rem; /* 고정 크기 - 컨테이너 border-radius는 반응형 불필요 */
  background: ${theme.colors.grayScale.white};
  position: relative;
  z-index: 1;

  ${theme.media.wide} {
    display: grid;
    grid-template-columns: 28rem 1fr;
  }

  ${theme.media.desktop} {
    display: grid;
    grid-template-columns: 28rem 1fr;
  }

  ${theme.media.tablet} {
    display: grid;
    grid-template-columns: 20rem 1fr;
    border-radius: 0;
  }

  ${theme.media.mobile} {
    display: flex;
    flex-direction: column;
    height: 100%; /* EditWrapper의 높이를 상속 */
    border-radius: 0; /* 모바일에서 border-radius 제거 */
  }
`;

export const LeftPanel = styled.div<{ $hideOnMobile?: boolean; $isDropdownOpen?: boolean }>`
  flex: 0 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $isDropdownOpen }) => $isDropdownOpen ? 'flex-start' : 'space-between'};
  align-items: center;
  background: ${theme.colors.secondary.VT50};
  overflow-y: auto;
  overflow-x: hidden;

  ${theme.media.wide} {
    width: 28rem;
    height: 100%;
    padding: 5rem 2rem ${({ $isDropdownOpen }) => $isDropdownOpen ? '2.5rem' : '2.5rem'} 2rem;
    justify-content: ${({ $isDropdownOpen }) => $isDropdownOpen ? 'flex-start' : 'space-between'};
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${theme.media.desktop} {
    width: 28rem;
    height: 100%;
    padding: 5rem 2rem ${({ $isDropdownOpen }) => $isDropdownOpen ? '2.5rem' : '2.5rem'} 2rem;
    justify-content: ${({ $isDropdownOpen }) => $isDropdownOpen ? 'flex-start' : 'space-between'};
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${theme.media.tablet} {
    display: flex;
    width: ${({ theme }) => theme.componentWidths.medium.tablet};
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.tablet} ${({ $isDropdownOpen }) => $isDropdownOpen ? '2.5rem' : '2.5rem'} ${({ theme }) => theme.gaps.GeneralMargin.tablet};
    flex-direction: column;
    justify-content: ${({ $isDropdownOpen }) => $isDropdownOpen ? 'flex-start' : 'space-between'};
    align-items: center;
    background: ${theme.colors.secondary.VT50};
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${theme.media.mobile} {
    ${({ $hideOnMobile }) => $hideOnMobile && 'display: none;'}
    flex: 0 0 auto;
    width: 100%;
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.S.desktop} ${({ theme }) => theme.gaps.L.desktop} ${({ theme }) => theme.gaps.S.desktop};
    justify-content: ${({ $isDropdownOpen }) => $isDropdownOpen ? 'flex-start' : 'space-between'};
    align-items: center;
    overflow-y: auto;
  }
`;

export const RightPanel = styled.div<{ $hideOnMobile?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gaps.XXL.desktop};
  flex: 1 0 0;
  align-self: stretch;
  background: ${theme.colors.grayScale.white};
  height: 100%;
  width: 100%;
  z-index: 1;

  ${theme.media.wide} {
    display: flex;
    padding: 3.75rem ${({ theme }) => theme.gaps.GeneralMargin.wide}; /* 상하 3.75rem, 좌우 General-Margin */
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.XXL.wide};
    flex: 1 0 0;
    align-self: stretch;
    overflow-y: auto;
  }

  ${theme.media.desktop} {
    display: flex;
    padding: 3.75rem ${({ theme }) => theme.gaps.GeneralMargin.desktop}; /* 상하 3.75rem, 좌우 General-Margin */
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.XXL.desktop};
    flex: 1 0 0;
    align-self: stretch;
    overflow-y: auto;
  }

  ${theme.media.tablet} {
    display: flex;
    padding: 3.75rem ${({ theme }) => theme.gaps.GeneralMargin.tablet};
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.XXL.desktop};
    flex: 1 0 0;
    align-self: stretch;
    background: ${theme.colors.grayScale.white};
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${theme.media.mobile} {
    ${({ $hideOnMobile }) => $hideOnMobile && 'display: none;'}
    ${({ $hideOnMobile, theme }) => 
      !$hideOnMobile && `
        display: flex;
        padding: 3.75rem ${theme.gaps.GeneralMargin.mobile};
        flex-direction: column;
        align-items: flex-start;
        gap: ${theme.gaps.XXL.desktop}; /* mobile에서도 2.75rem 사용 (XXL.desktop 값) */
        flex: 1 0 0;
        align-self: stretch;
        width: 100%;
        height: calc(100vh - 4.5rem - 4rem);
      `
    }
  }
`;

export const EditProfileSection = styled.div<{ $isDropdownOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $isDropdownOpen }) => $isDropdownOpen ? 'flex-start' : 'space-between'};
  align-items: center;
  gap: 0;
  max-width: 100%;
  width: 100%;
  flex: ${({ $isDropdownOpen }) => $isDropdownOpen ? '0 0 auto' : '1'};
  padding-top: 0;
  padding-bottom: ${({ $isDropdownOpen }) => $isDropdownOpen ? '0' : '0'};
  min-height: 0;
`;

export const EditProfileImageWrapper = styled.div<{ $isInDefaultPage?: boolean }>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: ${({ $isInDefaultPage }) => $isInDefaultPage ? '0' : '2rem'}; /* 프로필 이미지와 이름 글씨 사이 간격 (edit 페이지: 2rem, default 페이지: 0 - DefaultInfoSection의 gap으로 관리) */
  width: auto;
`;

export const EditProfileImage = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  aspect-ratio: 1/1;
  border-radius: 6.25rem; /* 고정 크기 - 프로필 이미지는 반응형 불필요 */
  object-fit: cover;
`;

export const EditProfileImagePlaceholder = styled.img.attrs({
  src: ProfileImageIcon,
  alt: "기본 프로필 이미지",
})`
  width: 7.5rem;
  height: 7.5rem;
  aspect-ratio: 1/1;
  border-radius: 6.25rem; /* 고정 크기 - 프로필 이미지는 반응형 불필요 */
  object-fit: cover;
`;

export const UploadButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: -1.25rem;

  ${theme.media.tablet} {
    right: 0; /* 타블렛에서 프로필 사진과 붙도록 */
  }

  ${theme.media.mobile} {
    transform: translateX(-1.25rem); /* 모바일에서 transform으로 -1.25rem 이동 */
  }
`;


export const EditUserName = styled.h2`
  ${theme.fonts.heading.h2}
  font-weight: 600;
  color: ${theme.colors.grayScale.black};
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.responsive.gap('M')};
  text-align: center;
  width: 100%;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.responsive.property.gap('XS')} /* 라벨과 입력 필드 사이: 0.75rem */
  width: 100%;
  margin-bottom: ${({ theme }) => theme.responsive.gap('XL')}; /* 섹션 사이: 2rem */

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
    display: flex;
    padding: ${({ theme }) => theme.gaps.XS.mobile} ${({ theme }) => theme.gaps.R.mobile} ${({ theme }) => theme.gaps.XS.mobile} ${({ theme }) => theme.gaps.S.mobile}; /* 상: XS(0.375rem), 우: R(0.625rem), 하: XS(0.375rem), 좌: S(0.5rem) */
    align-items: center;
    gap: ${({ theme }) => theme.gaps.XS.mobile}; /* 0.375rem */
    align-self: stretch;
    justify-content: flex-start;
    width: 100%;
    
    ${({ theme }) => theme.media.tablet} {
      padding: ${({ theme }) => theme.gaps.XS.tablet} ${({ theme }) => theme.gaps.R.tablet} ${({ theme }) => theme.gaps.XS.tablet} ${({ theme }) => theme.gaps.S.tablet};
      gap: ${({ theme }) => theme.gaps.XS.tablet};
    }
    
    ${({ theme }) => theme.media.desktop} {
      padding: ${({ theme }) => theme.gaps.XS.desktop} ${({ theme }) => theme.gaps.R.desktop} ${({ theme }) => theme.gaps.XS.desktop} ${({ theme }) => theme.gaps.S.desktop};
      gap: ${({ theme }) => theme.gaps.XS.desktop};
    }
    
    ${({ theme }) => theme.media.wide} {
      padding: ${({ theme }) => theme.gaps.XS.wide} ${({ theme }) => theme.gaps.R.wide} ${({ theme }) => theme.gaps.XS.wide} ${({ theme }) => theme.gaps.S.wide};
      gap: ${({ theme }) => theme.gaps.XS.wide};
    }
  }
`;

// 한 줄 소개 입력 필드
export const IntroInputWrapper = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('M')}
  ${({ theme }) => theme.responsive.property.padding('S')}
  background: ${theme.colors.grayScale.white};
  ${({ theme }) => theme.responsive.property.borderRadius('soft')}
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
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
`;

// 개BTI 버튼
export const DevBTIButton = styled.button`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('XS')}
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'S', 'XXS', 'S')}
  background: ${theme.colors.grayScale.gray300};
  border: none;
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.grayScale.gray400};
  }
`;

export const DevBTIIcon = styled.div`
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  aspect-ratio: 1 / 1;
  ${({ theme }) => theme.responsive.property.borderRadius('round')}
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
  ${({ theme }) => theme.responsive.property.gap('S')}
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'S', 'XXS', 'S')}
  background: transparent;
  border: 1px solid ${theme.colors.grayScale.gray300};
  ${({ theme }) => theme.responsive.property.borderRadius('sharp')}
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
  ${({ theme }) => theme.responsive.property.sourceSize('R')}
  aspect-ratio: 1 / 1;
  ${({ theme }) => theme.responsive.property.borderRadius('round')}
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;
`;

export const PartSelectorWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.responsive.property.gap('XS')}
`;

export const PartSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.responsive.property.gap('XS')}
  width: 100%;
`;

export const PartButtonWrapper = styled.div<{ $isActive?: boolean; $isRegistered?: boolean }>`
  width: 100%;
  position: relative;
  isolation: isolate;
  
  & > button {
    width: 100%;
    justify-content: flex-start;
    position: relative;
    z-index: 1;
    pointer-events: auto;
    border-radius: ${({ theme }) => theme.borders.sharp.wide} !important; /* WtLPawButton의 기본 border-radius 유지 */
    
    ${({ theme }) => theme.media.desktop} {
      border-radius: ${({ theme }) => theme.borders.sharp.desktop} !important;
    }
    
    ${({ theme }) => theme.media.tablet} {
      border-radius: ${({ theme }) => theme.borders.sharp.tablet} !important;
    }
    
    ${({ theme }) => theme.media.mobile} {
      border-radius: ${({ theme }) => theme.borders.sharp.mobile} !important;
    }
    
    & > span:first-child {
      display: none;
    }
    
    ${({ $isActive, $isRegistered, theme }) =>
      ($isActive || $isRegistered) &&
      `
      color: ${theme.colors.secondary.VT700};
      background: ${theme.colors.secondary.VT100};
    `}
  }
`;

export const SelectedPartList = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => theme.responsive.property.gap('XXS')}
`;

export const SelectedPartChip = styled.button<{ $active: boolean }>`
  ${theme.fonts.body.m500}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.responsive.property.paddingComplex('XXS', 'S', 'XXS', 'S')}
  ${({ theme }) => theme.responsive.property.borderRadius('round')}
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
  top: calc(100% + ${({ theme }) => theme.responsive.gap('XXS')});
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.responsive.gap('XXS')} 0;
  background: ${theme.colors.grayScale.white};
  ${({ theme }) => theme.responsive.property.borderRadius('soft')}
  box-shadow: ${theme.effects.dropShadows.DS200};
  z-index: 10;
`;

export const PartDropdownItem = styled.button`
  ${theme.fonts.body.m500}
  display: flex;
  width: 100%;
  ${({ theme }) => theme.responsive.property.paddingComplex('XS', 'S', 'XS', 'S')}
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

export const SaveButtonWrapper = styled.div<{ $isDropdownOpen?: boolean }>`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 0;
  padding-bottom: ${({ $isDropdownOpen }) => $isDropdownOpen ? '0' : '2.5rem'};
`;

export const SaveButton = styled.button`
  ${theme.fonts.heading.h3}
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.componentWidths.min.mobile}; /* Component-Width-Min: 6.0625rem */
  padding: ${({ theme }) => theme.gaps.XXS.desktop} 0; /* Gap-XXS: 0.25rem 상하, 좌우 0 (모든 화면에서 0.25rem 사용) */
  background: ${theme.colors.grayScale.black} !important; /* #19181D */
  border: none !important;
  border-radius: ${({ theme }) => theme.borders.sharp.desktop}; /* 기본 border-radius */
  color: ${theme.colors.grayScale.white} !important; /* #FCFCFF */
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-sizing: border-box;
  font-family: inherit;
  outline: none;

  ${theme.media.tablet} {
    display: flex;
    width: var(--Component-Width-Min, 8rem);
    padding: var(--Gap-XXS, 0.375rem) 0;
    justify-content: center;
    align-items: center;
  }

  ${theme.media.desktop} {
    width: ${({ theme }) => theme.componentWidths.min.desktop}; /* 8.25rem */
    padding: ${({ theme }) => theme.gaps.XXS.desktop} 0;
  }

  ${theme.media.wide} {
    width: ${({ theme }) => theme.componentWidths.min.wide}; /* 8.25rem */
    padding: ${({ theme }) => theme.gaps.XXS.wide} 0;
  }

  ${theme.media.mobile} {
    width: ${({ theme }) => theme.componentWidths.min.mobile}; /* Component-Width-Min: 6.0625rem */
    padding: ${({ theme }) => theme.gaps.XXS.mobile} 0; /* Gap-XXS: 0.25rem 상하, 좌우 0 */
    justify-content: center;
    align-items: center;
    border-radius: ${({ theme }) => theme.borders.hard.mobile}; /* 모바일 border-radius */
    height: 1.75rem;
    min-height: 1.75rem;
  }

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
export const EmptyMessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

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

export const ReadOnlyText = styled.p`
  ${theme.fonts.body.l500}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const ReadOnlyPartButton = styled.div`
  ${theme.fonts.body.m500}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: ${({ theme }) => theme.responsive.gap('XXS')} ${({ theme }) => theme.responsive.gap('S')};
  border-radius: ${({ theme }) => theme.borders.sharp.wide};
  background: ${theme.colors.secondary.VT100};
  color: ${theme.colors.secondary.VT700};
  border: none;
  cursor: default;
`;

// ProfileDefaultPage Left Panel 스타일
export const DefaultLeftPanel = styled.div`
  flex: 0 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.secondary.VT50};

  ${theme.media.wide} {
    width: ${({ theme }) => theme.componentWidths.medium.wide}; /* 28rem */
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.wide} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.wide}; /* 상 5rem(theme 없음), 좌우 General-Margin(2rem), 하 2.5rem(theme 없음) */
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${theme.media.desktop} {
    width: ${({ theme }) => theme.componentWidths.medium.desktop}; /* 28rem */
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.desktop} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.desktop}; /* 상 5rem(theme 없음), 좌우 General-Margin(2rem), 하 2.5rem(theme 없음) */
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${theme.media.tablet} {
    width: ${({ theme }) => theme.componentWidths.medium.tablet}; /* 20rem */
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.tablet} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.tablet}; /* 상 5rem(theme 없음), 좌우 General-Margin(2rem), 하 2.5rem(theme 없음) */
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${theme.media.mobile} {
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.mobile} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.mobile}; /* 상 5rem(theme 없음), 좌우 General-Margin(1rem), 하 2.5rem(theme 없음) */
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

export const DefaultInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem; /* theme에 없음 */
  align-self: stretch;
`;

export const DefaultTextFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem; /* theme에 없음 */
  align-self: stretch;
`;

export const DefaultUserName = styled.h2`
  ${theme.fonts.heading.h2}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  text-align: center;
`;

export const DefaultIntro = styled.h4`
  ${theme.fonts.heading.h4}
  color: ${theme.colors.grayScale.black};
  margin: 0;
  text-align: center;
`;

export const DefaultDBTIFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem; /* theme에 없음 */
  align-self: stretch;
`;

export const DefaultDBTITitle = styled.h4`
  ${theme.fonts.heading.h4}
  color: ${theme.colors.grayScale.black};
  margin: 0;
`;

export const DefaultPartFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
`;

export const DefaultPartTitle = styled.h4`
  ${theme.fonts.heading.h4}
  color: ${theme.colors.grayScale.black};
  margin: 0;
`;

export const DefaultEditButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 2.5rem;
  padding-bottom: 0;
`;

export const DefaultPartButton = styled.button<{ $isActive?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XS', 'M', 'XS', 'S')}
  justify-content: flex-start;
  align-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.responsive.property.borderRadius('sharp')};
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  color: ${({ theme }) => theme.colors.grayScale.black};
  cursor: pointer;
  ${({ theme }) => theme.fonts.heading.h4}
  width: 100%;
  height: 3rem;
  
  ${({ theme }) => theme.media.mobile} {
    height: 2rem;
  }
  
  &:hover:not(:disabled) {
    ${({ $isActive, theme }) => 
      !$isActive && `
        color: ${theme.colors.secondary.VT700};
      `}
  }

  &:active:not(:disabled) {
    ${({ $isActive, theme }) => 
      !$isActive && `
        background: ${theme.colors.secondary.VT100};
        color: ${theme.colors.grayScale.black};
      `}
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }

  ${({ $isActive, theme }) => 
    $isActive && `
      color: ${theme.colors.secondary.VT700};
      background: ${theme.colors.secondary.VT100};
    `}
`;

export const DefaultDBTIButton = styled.button<{ $isActive?: boolean }>`
  display: inline-flex;
  ${({ theme }) => theme.responsive.property.paddingComplex('XS', 'M', 'XS', 'S')}
  justify-content: flex-start;
  align-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.responsive.property.borderRadius('sharp')};
  background: ${({ theme }) => theme.colors.grayScale.white};
  box-shadow: ${({ theme }) => theme.effects.dropShadows.DS100};
  color: ${({ theme }) => theme.colors.grayScale.black};
  cursor: pointer;
  ${({ theme }) => theme.fonts.heading.h4}
  width: 100%;
  height: 3rem;
  
  ${({ theme }) => theme.media.mobile} {
    height: 2rem;
  }
  
  &:hover:not(:disabled) {
    ${({ $isActive, theme }) => 
      !$isActive && `
        color: ${theme.colors.secondary.VT700};
      `}
  }

  &:active:not(:disabled) {
    ${({ $isActive, theme }) => 
      !$isActive && `
        background: ${theme.colors.secondary.VT100};
        color: ${theme.colors.grayScale.black};
      `}
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayScale.gray300};
    cursor: not-allowed;
  }

  ${({ $isActive, theme }) => 
    $isActive && `
      color: ${theme.colors.secondary.VT700};
      background: ${theme.colors.secondary.VT100};
    `}
`;
