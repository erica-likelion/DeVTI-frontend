import styled from 'styled-components';

interface ContainerProps {
  $isImageBackground: boolean;
  $pathname: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  ${({ $isImageBackground, $pathname }) => {
    if (!$isImageBackground) {
      return `background: radial-gradient(74% 86.02% at 50% 96.76%, #ECDEF9 0%, #FCFCFF 100%);`;
    }
    
    // 랜딩 페이지 배경
    if ($pathname === '/' || $pathname === '/landing') {
      return `
        background-image: url('/LandingBG.webp');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
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
    
    // 기본 배경 (기존 background.webp)
    return `
      background-image: url('/background.webp');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    `;
  }}
  
  
  ${({ theme }) => theme.media.desktop} {
    width: 100%;
  }
  
  ${({ theme }) => theme.media.wide} {
    max-width: none;
    width: 100%;
  }
`;

export const Main = styled.main`
  height: calc(100vh - 3.75rem);
  overflow: hidden;
  padding: 4.5rem 2.5rem 4rem;
  
  ${({ theme }) => theme.media.mobile} {
    height: calc(100vh - 3.75rem);
    padding: 4.5rem 1rem 4.5rem;
  }
`;