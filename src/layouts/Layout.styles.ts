import { theme } from '@/styles/theme';
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
  padding: 4.5rem ${({ theme }) => theme.gaps.XL.wide} ${({ theme }) => theme.gaps.XXL.wide};
  margin-top: 0;

  ${({ theme }) => theme.media.desktop} {
    padding: 4.5rem ${theme.gaps.XL.desktop} ${theme.gaps.XXL.desktop};
  }

  ${({ theme }) => theme.media.tablet} {
    padding: 4.5rem ${theme.gaps.XL.tablet} ${theme.gaps.XXL.tablet};
  }
  
  ${({ theme }) => theme.media.mobile} {
    padding: calc(4.5rem + ${theme.gaps.R.mobile}) ${theme.gaps.R.mobile} ${theme.gaps.XXL.mobile};
  }
`;