import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useIsMobile } from '@/hooks/useMediaQuery';
import NavButton from '@/components/NavButton/NavButton';
import UserProfile from '@/components/UserProfile/UserProfile';
import LoginButton from '@/components/LoginButton/LoginButton';
import MobileSidebar from '@/components/MobileSidebar/MobileSidebar';
import * as S from './TopNav.styles';

interface TopNavProps {
  className?: string;
}

export default function TopNav({ className }: TopNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 랜딩과 로그인 페이지에서는 항상 비로그인 상태로 표시
  const isAuthPage = location.pathname === '/' || location.pathname === '/landing' || location.pathname === '/login';
  const shouldShowLoggedOut = !isLoggedIn || isAuthPage;

  const handleLogoClick = () => {
    navigate('/');
  };


  const handleNewChatRoom = () => {
    navigate('/');
  };

  const handleJoinChatRoom = () => {
    navigate('/');
  };

  const handleManageChatRoom = () => {
    navigate('/');
  };

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };



  // 데스크톱 - 로그인 전
  const renderDesktopLoggedOutNav = () => (
    <>
      <S.Logo onClick={handleLogoClick}>
        <img src="/MainLogo.svg" alt="DevTI Logo" />
      </S.Logo>
      <LoginButton />
    </>
  );

  // 데스크톱 - 로그인 후
  const renderDesktopLoggedInNav = () => (
    <>
      <S.LeftSection>
        <S.Logo onClick={handleLogoClick}>
          <img src="/MainLogo.svg" alt="DevTI Logo" />
        </S.Logo>
        <S.NavButtons>
          <NavButton onClick={handleNewChatRoom}>
            새 채팅룸
          </NavButton>
          <NavButton onClick={handleJoinChatRoom}>
            채팅룸 참여
          </NavButton>
          <NavButton onClick={handleManageChatRoom}>
            채팅룸 관리
          </NavButton>
        </S.NavButtons>
      </S.LeftSection>
      <UserProfile />
    </>
  );

  // 모바일
  const renderMobileNav = () => (
    <>
      <S.Logo onClick={handleLogoClick}>
        <img src="/MainLogo.svg" alt="DevTI Logo" />
      </S.Logo>
      <S.MobileRightSection>
        {shouldShowLoggedOut ? (
          <LoginButton />
        ) : (
          <>
            <NavButton 
              onClick={handleMenuToggle} 
              className="mobile-menu"
              icon={<span>☰</span>}
            >
              메뉴
            </NavButton>
            <UserProfile />
          </>
        )}
      </S.MobileRightSection>
    </>
  );

  const renderNavContent = () => {
    if (isMobile) {
      return renderMobileNav();
    }
    return shouldShowLoggedOut ? renderDesktopLoggedOutNav() : renderDesktopLoggedInNav();
  };

  return (
    <>
      <S.Container className={className}>
        <S.NavWrapper>
          {renderNavContent()}
        </S.NavWrapper>
      </S.Container>
      <MobileSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
    </>
  );
}