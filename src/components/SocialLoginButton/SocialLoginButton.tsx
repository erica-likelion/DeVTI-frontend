import { type ReactNode } from 'react';
import * as S from './SocialLoginButton.styles';
import KakaoIcon from '@/assets/icons/kakao.svg';
import GoogleIcon from '@/assets/icons/google.svg';

interface SocialLoginButtonProps {
  provider: 'kakao' | 'google';
  onClick: () => void;
  children: ReactNode;
}

const SocialLoginButton = ({
  provider,
  onClick,
  children
}: SocialLoginButtonProps) => {
  const renderIcon = () => {
    if (provider === 'kakao') {
      return <img src={KakaoIcon} alt="Kakao" />;
    }
    if (provider === 'google') {
      return <img src={GoogleIcon} alt="Google" />;
    }
    return null;
  };

  return (
    <S.Button onClick={onClick} $provider={provider}>
      <S.Icon>
        {renderIcon()}
      </S.Icon>
      {children}
    </S.Button>
  );
};

export default SocialLoginButton;