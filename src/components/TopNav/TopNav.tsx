import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useIsMobile } from '@/hooks/useMediaQuery';
import NavButton from '@/components/NavButton';
import UserProfile from '@/components/UserProfile';
import LoginButton from '@/components/LoginButton';
import MobileSidebar from '@/components/MobileSidebar';
import * as S from './TopNav.styles';

interface TopNavProps {
  className?: string;
}

export default function TopNav({ className }: TopNavProps) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        {isLoggedIn ? (
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
        ) : (
          <LoginButton />
        )}
      </S.MobileRightSection>
    </>
  );

  const renderNavContent = () => {
    if (isMobile) {
      return renderMobileNav();
    }
    return isLoggedIn ? renderDesktopLoggedInNav() : renderDesktopLoggedOutNav();
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