import { Outlet, useLocation } from 'react-router-dom';
import * as S from './Layout.styles';
import { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import TopNav from '../components/TopNav/TopNav';
import AuthDebugger from '../components/AuthDebugger/AuthDebugger';

/**
 * Main Layout component
 * TODO: 필요시 상태관리, 모달, 토스트 등 추가
 */
export default function Layout() {
  const location = useLocation();

  // TODO: 페이지별 테마 컬러 변경 로직 (필요시 구현)
  useEffect(() => {
    // 경로에 따른 테마 컬러나 배경색 변경
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) return;
    
    // 예시: 특정 페이지에서 다른 테마 컬러 적용
    const themeColor = '#ffffff'; // TODO: 테마에 맞게 수정
    themeColorMeta.setAttribute('content', themeColor);
  }, [location.pathname]);

  return (
    <S.Container>
      <TopNav />
      <S.Main>
        <Outlet />
      </S.Main>
      <Footer />
      <AuthDebugger />
      {/* TODO: 필요시 Modal, Toast 컴포넌트 추가 */}
    </S.Container>
  );
}