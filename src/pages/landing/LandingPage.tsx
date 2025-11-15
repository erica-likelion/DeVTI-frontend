import { useNavigate } from 'react-router-dom';
import * as S from './LandingPage.styles';
import { PrimaryButton } from '../../components/Button';

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
          <PrimaryButton onClick={handleJoinClick} className="">Join DevTI</PrimaryButton>
        </S.ButtonGroup>
      </S.CardFrame>
    </S.Container>
  );
};

export default LandingPage;