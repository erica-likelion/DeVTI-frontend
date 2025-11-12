import { Outlet, useLocation } from 'react-router-dom';
import * as S from './Layout.styles';
import { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import TopNav from '../components/TopNav/TopNav';

/**
 * Main Layout component
 * TODO: 필요시 상태관리, 모달, 토스트 등 추가
 */
export default function Layout() {
  const location = useLocation();

  // 랜딩과 로그인 페이지에서 배경 이미지 사용
  const isImageBackground = location.pathname === '/' || location.pathname === '/landing' || location.pathname === '/login';


  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) return;
  
  }, [location.pathname]);

  return (
    <S.Container $isImageBackground={isImageBackground} $pathname={location.pathname}>
      <TopNav />
      <S.Main>
        <Outlet />
      </S.Main>
      <Footer />
      {/* TODO: 필요시 Modal, Toast 컴포넌트 추가 */}
    </S.Container>
  );
}