import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

interface ContainerProps {
  $isImageBackground: boolean;
  $pathname: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  ${({ $pathname }) => {
    if ($pathname === '/' || $pathname === '/landing' || $pathname === '/login' || $pathname === '/new-room' ||  $pathname === '/new-room/code' || $pathname.includes('/join-room')) {
      return `
        overflow: hidden;
      `;
    }
    return `
       overflow-y: auto;
    `;
  }}
  
  ${({ $isImageBackground, $pathname }) => {
    // 프로필 편집 페이지(/profile/edit, /profile/pm/view 등)에서만 흰색 배경
    if ($pathname.startsWith('/profile') && ($pathname.includes('/edit') || $pathname.includes('/view'))) {
      return `background: ${theme.colors.grayScale.white};`;
    }
    
    if (!$isImageBackground) {
      // 프로필 페이지일 때는 Rrad-VT gradient 배경
      if ($pathname.includes('/profile') && !$pathname.includes('/edit') && !$pathname.includes('/view')) {
        return `background: radial-gradient(74% 86.02% at 50% 96.76%, #ECDEF9 0%, #FCFCFF 100%);`;
      }
      return `background: radial-gradient(74% 86.02% at 50% 96.76%, #ECDEF9 0%, #FCFCFF 100%);`;
    }
    
    // 랜딩 페이지 배경
    if ($pathname === '/' || $pathname === '/landing') {
      return `
        background-image: url('/LandingBG.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
      `;
    }
    
    // 로그인 페이지 배경
    if ($pathname === '/login') {
      return `
        background-image: url('/LoginBG.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `;
    }
    
    return `
      background-image: url('/LandingBG.webp');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    `;
  }}
`;

export const Main = styled.main<{ $pathname: string }>`
  padding-top: 4.5rem;
  margin-top: 0;
  
  ${({ $pathname }) => {
    // 로그인, 랜딩, 에러 페이지에서는 flex: 1로 남은 공간 차지하고 footer를 하단에 고정
    if ($pathname === '/' || $pathname === '/landing' || $pathname === '/login' || $pathname === '/new-room' || $pathname === '/new-room/code' || $pathname.includes('/join-room') || $pathname.startsWith('/error')) {
      return `
        flex: 1;
        padding-bottom: 4.5rem;
        overflow-y: auto;
      `;
    }
    // 다른 페이지에서는 flex: 1로 설정하여 footer가 바로 아래 붙도록
    return `
      flex: 1;
      padding-bottom: 0rem;
    `;
  }}
  
  

  ${({ theme }) => theme.media.tablet} {
    ${({ theme }) => theme.layouts.tabletCommon}
    padding-top: 4.5rem;
  }

  ${({ theme }) => theme.media.desktop} {
    ${({ theme }) => theme.layouts.desktopCommon}
    padding-top: 4.5rem;
  }
  
  ${({ theme }) => theme.media.wide} {
    ${({ theme }) => theme.layouts.wideCommon}
    padding-top: 4.5rem;
  }
  
  ${({ theme }) => theme.media.mobile} {
    ${({ theme }) => theme.layouts.mobileCommon}
    padding-top: 4.5rem;
  }

  ${({ $pathname }) => $pathname.includes('/profile') && css`
    padding-left: 0;
    padding-right: 0;

    ${({ theme }) => theme.media.desktop} {
      padding-left: 0;
      padding-right: 0;
    }
    
    ${({ theme }) => theme.media.wide} {
      padding-left: 0;
      padding-right: 0;
    }
    
    ${({ theme }) => theme.media.mobile} {
      padding-left: 0;
      padding-right: 0;
    }
  `}
`;