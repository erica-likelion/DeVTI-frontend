import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import * as S from './UserProfile.styles';

interface UserProfileProps {
  showTextOnMobile?: boolean;
  className?: string;
}

export default function UserProfile({ 
  showTextOnMobile = false, 
  className 
}: UserProfileProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      {user?.profileImage ? (
        <S.ProfileImage src={user.profileImage} alt={user.name} />
      ) : (
        <S.DefaultProfileIcon />
      )}
      <S.UserName $showOnMobile={showTextOnMobile}>{user?.name || '사용자'}</S.UserName>
    </S.Container>
  );
}