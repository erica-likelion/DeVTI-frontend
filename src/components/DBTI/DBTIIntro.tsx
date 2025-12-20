import * as S from './DBTIIntro.styles';
import BkMTextButton from '@/components/ButtonStatic/BkMTextButton';

interface DBTIIntroProps {
  onStart: () => void;
}

export default function DBTIIntro({ onStart }: DBTIIntroProps) {
  return (
    <S.Container>
      <S.TextWrapper>
        <S.Title>DBTI</S.Title>
        <S.Subtitle>최고의 팀워크를 위해 나의 성향을 알아봐요!</S.Subtitle>
      </S.TextWrapper>
      <S.ImageWrapper>
        <S.Image src="/golden.webp" alt="DBTI 검사" />
      </S.ImageWrapper>
      <BkMTextButton onClick={onStart}>
        테스트
      </BkMTextButton>
    </S.Container>
  );
}