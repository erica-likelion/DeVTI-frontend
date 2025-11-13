import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useIsMobile } from "@/hooks/useMediaQuery";
import NavButton from "@/components/NavButton";
import UserProfile from "@/components/UserProfile";
import LoginButton from "@/components/LoginButton";
import MobileSidebar from "@/components/MobileSidebar";
import * as S from "./TopNav.styles";

interface TopNavProps {
  className?: string;
}

export default function TopNav({ className }: TopNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/landing" ||
    location.pathname === "/login";
  const shouldShowLoggedOut = !isLoggedIn || isAuthPage;
  const isProfilePage = location.pathname.startsWith("/profile");

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleNewChatRoom = () => {
    navigate("/");
  };

  const handleJoinChatRoom = () => {
    navigate("/");
  };

  const handleManageChatRoom = () => {
    navigate("/");
  };

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const renderDesktopLoggedOutNav = () => (
    <>
      <S.Logo onClick={handleLogoClick}>
        <img src="/MainLogo.svg" alt="DevTI Logo" />
      </S.Logo>
      <LoginButton />
    </>
  );

  const renderDesktopLoggedInNav = () => (
    <>
      <S.LeftSection>
        <S.Logo onClick={handleLogoClick}>
          <img src="/MainLogo.svg" alt="DevTI Logo" />
        </S.Logo>
        <S.NavButtons>
          <NavButton onClick={handleNewChatRoom}>새 매칭룸</NavButton>
          <NavButton onClick={handleJoinChatRoom}>매칭룸 참여</NavButton>
          <NavButton onClick={handleManageChatRoom}>매칭룸 관리</NavButton>
        </S.NavButtons>
      </S.LeftSection>
      <UserProfile variant={isProfilePage ? "profile" : "default"} />
    </>
  );

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
      <S.Container className={className}>
        <S.NavWrapper>{renderNavContent()}</S.NavWrapper>
      </S.Container>
      <MobileSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
    </>
  );
}
