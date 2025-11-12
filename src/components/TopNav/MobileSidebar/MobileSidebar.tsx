import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import UserProfile from '@/components/TopNav/UserProfile';
import LoginButton from '@/components/LoginButton/LoginButton';
import * as S from './MobileSidebar.styles';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuthStore();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <>
      <S.Overlay $isOpen={isOpen} onClick={onClose} />
      <S.Container $isOpen={isOpen}>
        <S.Header>
          <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        </S.Header>
        
        <S.Content>
          {isLoggedIn ? (
            <>
              <S.UserSection>
                <UserProfile showTextOnMobile={true} />
              </S.UserSection>
              
              <S.MenuSection>
                <S.MenuItem onClick={() => handleNavigation('/chat/new')}>
                  새 채팅룸
                </S.MenuItem>
                <S.MenuItem onClick={() => handleNavigation('/chat/join')}>
                  채팅룸 참여
                </S.MenuItem>
                <S.MenuItem onClick={() => handleNavigation('/chat/manage')}>
                  채팅룸 관리
                </S.MenuItem>
              </S.MenuSection>
              
              <S.LogoutSection>
                <S.LogoutButton onClick={handleLogout}>
                  로그아웃
                </S.LogoutButton>
              </S.LogoutSection>
            </>
          ) : (
            <S.LoginSection>
              <LoginButton />
            </S.LoginSection>
          )}
        </S.Content>
      </S.Container>
    </>
  );
}