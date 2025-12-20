import { type ReactNode } from 'react';
import * as S from './SocialLoginButton.styles';
import KakaoIcon from '@/assets/icons/kakao.svg';
import GoogleIcon from '@/assets/icons/google.svg';
import { googleLogin, kakaoLogin } from '@/services/auth'; 
import { useGoogleLogin } from '@react-oauth/google';
import KakaoLogin from 'react-kakao-login';
import { handleError } from '@/utils/errorHandler';
import { useNavigate } from 'react-router-dom';

interface SocialLoginButtonProps {
  provider: 'kakao' | 'google';
  children: ReactNode;
}

const SocialLoginButton = ({ provider, children }: SocialLoginButtonProps) => {
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const result = await googleLogin(tokenResponse.access_token);
        if (result?.success) {
          window.location.href = '/home/check';
        }
      } catch (error) {
        handleError(error, { navigate });
      }
    },
    onError: () => {
      // Google OAuth 자체 에러는 클라이언트 에러로 처리
      navigate('/error/400');
    },
    flow: 'implicit',
  });

  const handleKakaoSuccess = async (response: any) => {
    try {
      const result = await kakaoLogin(response.response.access_token);
      if (result.success) {
        window.location.href = '/home/check';
      }
    } catch (error) {
      handleError(error, { navigate });
    }
  };

  const handleKakaoFail = () => {
    // Kakao OAuth 자체 에러는 클라이언트 에러로 처리
    navigate('/error/400');
  };

  const renderIcon = () => {
    const iconSrc = provider === 'kakao' ? KakaoIcon : GoogleIcon;
    return <img src={iconSrc} alt={provider} />;
  };

  if (provider === 'kakao') {
    return (
      <KakaoLogin
        token={import.meta.env.VITE_KAKAO_JS_KEY} 
        onSuccess={handleKakaoSuccess}
        onFail={handleKakaoFail}
        throughTalk={false}
        render={({ onClick }) => (
          <S.Button $provider={provider} onClick={onClick}>
            <S.Icon>{renderIcon()}</S.Icon>
            {children}
          </S.Button>
        )}
      />
    );
  }

  return (
    <S.Button onClick={() => handleGoogleLogin()} $provider={provider}>
      <S.Icon>{renderIcon()}</S.Icon>
      {children}
    </S.Button>
  );
};

export default SocialLoginButton;