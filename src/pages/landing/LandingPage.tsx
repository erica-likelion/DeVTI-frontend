import React from 'react';
import * as S from './LandingPage.styles';
import { PrimaryButton } from '../../components/Button';

const LandingPage: React.FC = () => {
  return (
    <S.Container>
      <S.HeroSection>
        <S.Title>
          Every great project begins with the right team
        </S.Title>
        <S.Subtitle>
          시작이 반이라면, 시작을 완벽하게
        </S.Subtitle>
        <S.ButtonGroup>
          <PrimaryButton>Join DevTI</PrimaryButton>
        </S.ButtonGroup>
      </S.HeroSection>
    </S.Container>
  );
};

export default LandingPage;