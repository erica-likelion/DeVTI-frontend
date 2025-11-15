import SocialLoginButton from '@/components/SocialLoginButton';
import * as S from './LoginPage.styles';

const LoginPage = () => {

  const REST_API_KEY = '백엔드한테 달라하자1';
  const REDIRECT_URI = '백엔드한테 달라하자2';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = async () => {
    window.location.href = link;
    // try {
    //   await socialLogin('kakao');
    //   navigate('/home');
    // } catch (error) {
    //   console.error('카카오 로그인 실패:', error);
    // }
  };

  return (
    <S.Container>
        
        <S.Title>로그인</S.Title>

        <S.SocialButtonGroup>
          <SocialLoginButton provider="google" onClick={handleKakaoLogin}>
            Google 로그인
          </SocialLoginButton>
          <SocialLoginButton provider="kakao" onClick={handleKakaoLogin}>
            카카오 로그인
          </SocialLoginButton>
        </S.SocialButtonGroup>
    </S.Container>
  );
};

export default LoginPage;