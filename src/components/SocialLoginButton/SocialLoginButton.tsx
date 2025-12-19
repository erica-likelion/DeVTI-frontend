import { type ReactNode } from 'react';
import * as S from './SocialLoginButton.styles';
import KakaoIcon from '@/assets/icons/kakao.svg';
import GoogleIcon from '@/assets/icons/google.svg';
import { googleLogin, kakaoLogin } from '@/services/auth'; 
import { useGoogleLogin } from '@react-oauth/google';
import KakaoLogin from 'react-kakao-login';

interface SocialLoginButtonProps {
  provider: 'kakao' | 'google';
  children: ReactNode;
}

const SocialLoginButton = ({ provider, children }: SocialLoginButtonProps) => {

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const result = await googleLogin(tokenResponse.access_token);
      if (result?.success) {
        window.location.href = '/home/check';
      }
    },
    flow: 'implicit',
  });

  const handleKakaoSuccess = async (response: any) => {
    const result = await kakaoLogin(response.response.access_token);
    if (result.success) {
      window.location.href = '/home/check';
    }
  };

  const handleKakaoFail = () => {}; //라이브러리에서 필수가 제거하지 못하고 공백으로 놔둠

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