import SocialLoginButton from '@/components/SocialLoginButton';
import * as S from './LoginPage.styles';

const LoginPage = () => {
  return (
    <S.Container>
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