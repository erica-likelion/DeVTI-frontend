import styled from "styled-components";
import { theme } from "@/styles/theme";

const VIEWPORT_AVAILABLE_HEIGHT = "100%";

export const Container = styled.div`
  display: flex;
  min-height: 63.75rem;
  padding: 20rem ${({ theme }) => theme.gaps.GeneralMargin.mobile} 0 ${({ theme }) => theme.gaps.GeneralMargin.mobile};
  flex-direction: column;
  align-items: center;
  gap: 7.5rem;
  align-self: stretch;

  ${theme.media.tablet} {
    padding: 20rem ${({ theme }) => theme.gaps.GeneralMargin.tablet} 0 ${({ theme }) => theme.gaps.GeneralMargin.tablet};
  }

  ${theme.media.desktop} {
    padding: 20rem ${({ theme }) => theme.gaps.GeneralMargin.desktop} 0 ${({ theme }) => theme.gaps.GeneralMargin.desktop};
  }

  ${theme.media.wide} {
    padding: 20rem ${({ theme }) => theme.gaps.GeneralMargin.wide} 0 ${({ theme }) => theme.gaps.GeneralMargin.wide};
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.responsive.property.gap('none')}
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
  width: 12.5rem;
  height: 12.5rem;
  aspect-ratio: 1/1;
  border-radius: 6.25rem;
  object-fit: cover;
  background: ${theme.colors.grayScale.gray600};
  flex-shrink: 0;
  box-shadow: 0 1px 12px 0 ${theme.colors.transparents.BL100};
`;

export const ProfileImagePlaceholder = styled.img.attrs({
  src: "/DefaultIMG_Profile.webp",
  alt: "기본 프로필 이미지",
})`
  width: 12.5rem;
  height: 12.5rem;
  aspect-ratio: 1/1;
  border-radius: 6.25rem;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 1px 12px 0 ${theme.colors.transparents.BL100};
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
    top: 4.5rem;
    left: 0;
    right: 0;
    bottom: 3.75rem;
    width: 100vw;
    height: calc(100vh - 4.5rem - 3.75rem);
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
    padding: 5rem 2rem 2.5rem 2rem;
    justify-content: ${({ $isDropdownOpen }) => $isDropdownOpen ? 'flex-start' : 'space-between'};
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${theme.media.desktop} {
    width: 28rem;
    height: 100%;
    padding: 5rem 2rem 2.5rem 2rem;
    justify-content: ${({ $isDropdownOpen }) => $isDropdownOpen ? 'flex-start' : 'space-between'};
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${theme.media.tablet} {
    display: flex;
    width: ${({ theme }) => theme.componentWidths.medium.tablet};
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.tablet} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.tablet};
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
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.mobile} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.mobile};
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
    padding: 3.75rem ${({ theme }) => theme.gaps.GeneralMargin.wide};
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.gaps.XXL.wide};
    flex: 1 0 0;
    align-self: stretch;
    overflow-y: auto;
  }

  ${theme.media.desktop} {
    display: flex;
    padding: 3.75rem ${({ theme }) => theme.gaps.GeneralMargin.desktop};
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
        gap: ${theme.gaps.XXL.desktop};
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
  margin-bottom: ${({ $isInDefaultPage }) => $isInDefaultPage ? '0' : '2rem'};
  width: auto;
`;

export const EditProfileImage = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  aspect-ratio: 1/1;
  border-radius: 6.25rem;
  object-fit: cover;
  box-shadow: 0 1px 12px 0 ${theme.colors.transparents.BL100};
`;

export const EditProfileImagePlaceholder = styled.img.attrs({
  src: "/DefaultIMG_Profile.webp",
  alt: "기본 프로필 이미지",
})`
  width: 7.5rem;
  height: 7.5rem;
  aspect-ratio: 1/1;
  border-radius: 6.25rem;
  object-fit: cover;
  box-shadow: 0 1px 12px 0 ${theme.colors.transparents.BL100};
`;

export const UploadButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: -1.25rem;

  ${theme.media.tablet} {
    right: 0;
  }

  ${theme.media.mobile} {
    transform: translateX(-1.25rem);
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
  gap: 0.75rem;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.responsive.gap('XL')};

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
    padding: ${({ theme }) => theme.gaps.XS.mobile} ${({ theme }) => theme.gaps.R.mobile} ${({ theme }) => theme.gaps.XS.mobile} ${({ theme }) => theme.gaps.S.mobile};
    align-items: center;
    gap: ${({ theme }) => theme.gaps.XS.mobile};
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
  padding-bottom: 2.5rem;
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
    width: ${({ theme }) => theme.componentWidths.medium.wide};
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.wide} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.wide};
  }

  ${theme.media.desktop} {
    width: ${({ theme }) => theme.componentWidths.medium.desktop};
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.desktop} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.desktop};
  }

  ${theme.media.tablet} {
    width: ${({ theme }) => theme.componentWidths.medium.tablet};
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.tablet} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.tablet};
  }

  ${theme.media.mobile} {
    height: 100%;
    padding: 5rem ${({ theme }) => theme.gaps.GeneralMargin.mobile} 2.5rem ${({ theme }) => theme.gaps.GeneralMargin.mobile};
    flex: 1 0 0;
  }
`;

export const DefaultInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
  align-self: stretch;
`;

export const DefaultTextFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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
  gap: 0.5rem;
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

