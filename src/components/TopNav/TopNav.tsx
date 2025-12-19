import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useIsMobile } from "@/hooks/useMediaQuery";
import WtMButton from "@/components/ButtonDynamic/WtMButton";
import UserProfile from "@/components/UserProfile";
import LoginButton from "@/components/LoginButton/LoginButton";
import MobileSidebar from "@/components/MobileSidebar/MobileSidebar";
import DropBox from "@/components/DropBox/DropBox";
import * as S from "./TopNav.styles";
import MainLogo from "@/assets/icons/MainLogo.svg";

interface TopNavProps {
  className?: string;
}

export default function TopNav({ className }: TopNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isLandingPage = location.pathname === "/" || location.pathname === "/landing";
  const isLoginPage = location.pathname === "/login";
  const shouldHideNavButtons = isLandingPage || isLoginPage;

  const isAuthPage = isLandingPage || isLoginPage;
  const shouldShowLoggedOut = !isLoggedIn || isAuthPage;
  const isProfilePage = location.pathname.startsWith("/profile");

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleNewChatRoom = () => {
    navigate("/new-room");
  };

  const handleJoinChatRoom = () => {
    navigate("/join-room");
  };

  const handleManageChatRoom = () => {
    navigate("/manage/join");
  };

  const handleMenuToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const renderLeftSection = () => (
    <S.LeftSection>
      <S.Logo onClick={handleLogoClick}>
        <img src={MainLogo} alt="DevTI Logo" />
      </S.Logo>
      {!shouldHideNavButtons && (
        <S.NavButtons>
          <WtMButton 
            onClick={handleNewChatRoom}
            isClicked={location.pathname.startsWith('/new-room')}
          >
            새 매칭룸
          </WtMButton>
          <WtMButton 
            onClick={handleJoinChatRoom}
            isClicked={location.pathname.startsWith('/join-room')}
          >
            매칭룸 참여
          </WtMButton>
          <WtMButton 
            onClick={handleManageChatRoom}
            isClicked={location.pathname.startsWith('/manage/join') || location.pathname.startsWith('/manage')}
          >
            매칭룸 관리
          </WtMButton>
        </S.NavButtons>
      )}
    </S.LeftSection>
  );

  const renderDesktopLoggedOutNav = () => (
    <>
      {renderLeftSection()}
      <LoginButton />
    </>
  );

  const renderDesktopLoggedInNav = () => (
    <>
      {renderLeftSection()}
      <UserProfile variant={isProfilePage ? "profile" : "default"} />
    </>
  );

  const renderMobileNav = () => (
    <>
      <S.Logo onClick={handleLogoClick}>
        <img src={MainLogo} alt="DevTI Logo" />
      </S.Logo>
      <S.MobileRightSection>
        {shouldShowLoggedOut ? (
          <LoginButton />
        ) : (
          <>
            {!shouldHideNavButtons && (
              <DropBox 
                size="M"
                placeholder="메뉴"
                isOpen={isSidebarOpen}
                onClick={handleMenuToggle}
                options={[]}
              />
            )}
            <UserProfile variant={isProfilePage ? "profile" : "default"} />
          </>
        )}
      </S.MobileRightSection>
    </>
  );

  const renderNavContent = () => {
    if (isMobile) {
      return renderMobileNav();
    }
    return shouldShowLoggedOut
      ? renderDesktopLoggedOutNav()
      : renderDesktopLoggedInNav();
  };

  return (
    <>
      <S.Container className={className} $pathname={location.pathname}>
        <S.NavWrapper>{renderNavContent()}</S.NavWrapper>
      </S.Container>
      <MobileSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
    </>
  );
}
