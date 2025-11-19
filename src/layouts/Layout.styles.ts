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

export const Main = styled.main`
  height:100%;
  padding-top: 4.5rem;
  padding-bottom: 4.5rem;
  margin-top: 0;
  
  ${({ theme }) => theme.layouts.mobileCommon}

  ${({ theme }) => theme.media.tablet} {
    padding-top: calc(4.5rem + ${({ theme }) => theme.gaps.R.tablet});
    padding-bottom: 3.75rem;
  }

  ${({ theme }) => theme.media.desktop} {
    ${({ theme }) => theme.layouts.desktopCommon}
  }
  
  ${({ theme }) => theme.media.wide} {
    ${({ theme }) => theme.layouts.wideCommon}
  }
  
  ${({ theme }) => theme.media.mobile} {
    padding-top: calc(4.5rem + ${({ theme }) => theme.gaps.R.mobile});
    padding-bottom: 3.75rem;
  }
`;