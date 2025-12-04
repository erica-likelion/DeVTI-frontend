import SocialLoginButton from '@/components/SocialLoginButton';
import * as S from './LoginPage.styles';

const LoginPage = () => {

  // 구글 로그인 설정
  const GOOGLE_CLIENT_ID = '백엔드한테달라할값';
  // 배포 시, https://yourdomain.com/oauth2/callback로 변경 (아래 테스트 용)
  const GOOGLE_REDIRECT_URI = 'http://localhost:5173/oauth2/callback';
  const GOOGLE_SCOPE = encodeURIComponent(
  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
);

const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${GOOGLE_SCOPE}`;

  // 카카오 로그인 설정
  const KAKAO_REST_API_KEY = '백엔드한테 달라하자3';
  const KAKAO_REDIRECT_URI = '백엔드한테 달라하자4';
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;


  const handleGoogleLogin = async () => {
    window.location.href = googleAuthUrl;
    // try {
    //   await socialLogin('google');
    //   navigate('/home');
    // } catch (error) {
    //   console.error('구글 로그인 실패:', error);
    // }
  };

  const handleKakaoLogin = async () => {
    window.location.href = kakaoAuthUrl;
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
          <SocialLoginButton provider="google" onClick={handleGoogleLogin}>
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