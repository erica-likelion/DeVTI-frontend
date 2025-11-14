import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { WhiteMButton } from "@/components/Button";
import UserProfile from "@/components/UserProfile";
import LoginButton from "@/components/LoginButton/LoginButton";
import MobileSidebar from "@/components/MobileSidebar/MobileSidebar";
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
    setIsSidebarOpen((prev) => !prev);
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
          <WhiteMButton onClick={handleNewChatRoom}>새 매칭룸</WhiteMButton>
          <WhiteMButton onClick={handleJoinChatRoom}>매칭룸 참여</WhiteMButton>
          <WhiteMButton onClick={handleManageChatRoom}>매칭룸 관리</WhiteMButton>
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
            <WhiteMButton onClick={handleMenuToggle}>☰ 메뉴</WhiteMButton>
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
