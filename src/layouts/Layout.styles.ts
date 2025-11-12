import styled from 'styled-components';

interface ContainerProps {
  $isImageBackground: boolean;
  $pathname: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
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
  
  ${({ theme }) => theme.media.mobile} {
    min-height: 100vh;
  }
  
  ${({ theme }) => theme.media.tablet} {
    min-height: 100vh;
  }
  
  ${({ theme }) => theme.media.desktop} {
    max-width: 90rem;
    margin: 0 auto;
  }
  
  ${({ theme }) => theme.media.wide} {
    max-width: 120rem;
    margin: 0 auto;
  }
`;

export const Main = styled.main`
  flex: 1;
  overflow: hidden;
  padding: 4rem 2rem;
  
  ${({ theme }) => theme.media.mobile} {
    padding: 3.5rem 1rem 3rem;
  }
  
  ${({ theme }) => theme.media.tablet} {
    padding: 4rem 2rem;
  }
`;