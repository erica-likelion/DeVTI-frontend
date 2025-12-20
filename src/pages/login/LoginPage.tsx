import { useEffect } from 'react';
import SocialLoginButton from '@/components/SocialLoginButton';
import * as S from './LoginPage.styles';
import Snowfall from 'react-snowfall';
import { useAuthStore } from '@/stores/authStore';

const LoginPage = () => {
  const { logout } = useAuthStore();

  // 로그인 페이지 진입 시 자동 로그아웃
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <S.Container>
      <Snowfall 
        color="#ffffff"
        snowflakeCount={40}
      />
      <S.Title>로그인</S.Title>

      <S.SocialButtonGroup>
        <SocialLoginButton provider="google">
          Google 로그인
        </SocialLoginButton>
        <SocialLoginButton provider="kakao">
          카카오 로그인
        </SocialLoginButton>
      </S.SocialButtonGroup>
    </S.Container>
  );
};

export default LoginPage;