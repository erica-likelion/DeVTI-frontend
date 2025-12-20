import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as S from './LandingPage.styles';
import BkLTextButton from '../../components/ButtonStatic/BkLTextButton';
import Snowfall from 'react-snowfall';
import { useAuthStore } from '@/stores/authStore';

const LandingPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  // 랜딩 페이지 진입 시 자동 로그아웃
  useEffect(() => {
    logout();
  }, [logout]);

  const handleJoinClick = () => {
    navigate('/login');
  };
  return (
    <S.Container>
      <Snowfall
        color="#ffffff"
        snowflakeCount={40}
      />
      <S.CardFrame>
        <S.TitleSection>
          <S.Title>
            Every great project begins with the right team
          </S.Title>
          <S.Subtitle>
            시작이 반이라면, 시작을 완벽하게
          </S.Subtitle>
        </S.TitleSection>
        <S.ButtonGroup>
          <BkLTextButton onClick={handleJoinClick} className="">Join DevTI</BkLTextButton>
        </S.ButtonGroup>
      </S.CardFrame>
    </S.Container>
  );
};

export default LandingPage;