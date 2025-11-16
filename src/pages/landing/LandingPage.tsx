import { useNavigate } from 'react-router-dom';
import * as S from './LandingPage.styles';
import BkLTextButton from '../../components/ButtonStatic/BkLTextButton';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/login');
  };
  return (
    <S.Container>
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