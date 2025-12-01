import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import LoginButton from '@/components/LoginButton';
import WtMIconButton from '@/components/ButtonStatic/WtMIconButton';
import WtMButton from '@/components/ButtonDynamic/WtMButton';
import CloseIcon from '@/assets/icons/Close.svg';
import * as S from './MobileSidebar.styles';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn} = useAuthStore();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };



  return (
    <>
      <S.Overlay $isOpen={isOpen} onClick={onClose} />
      <S.Container $isOpen={isOpen}>
        <S.Header>
          <WtMIconButton onClick={onClose} disabled={false}>
            <img src={CloseIcon} alt="Close" />
          </WtMIconButton>
        </S.Header>
        
        {isLoggedIn ? (
          <S.MenuSection>
            <WtMButton 
              onClick={() => handleNavigation('/new-room')}
              isClicked={isCurrentPath('/new-room')}
            >
              새 매칭룸
            </WtMButton>
            <WtMButton 
              onClick={() => handleNavigation('/home')}
              isClicked={isCurrentPath('/home')}
            >
              매칭룸 참여
            </WtMButton>
            <WtMButton 
              onClick={() => handleNavigation('/')}
              isClicked={location.pathname === '/'}
            >
              매칭룸 관리
            </WtMButton>
          </S.MenuSection>
        ) : (
          <S.LoginSection>
            {/* 로그인 안하고 해당 경로를 들어갔을 때 상태 확인용 (이후 제거) */}
            <LoginButton /> 
          </S.LoginSection>
        )}
      </S.Container>
    </>
  );
}