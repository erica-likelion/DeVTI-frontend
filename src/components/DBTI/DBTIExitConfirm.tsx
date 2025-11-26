import * as S from './DBTIExitConfirm.styles';
import BkMTextButton from '@/components/ButtonStatic/BkMTextButton';

interface DBTIExitConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DBTIExitConfirm({ onConfirm }: DBTIExitConfirmProps) {
  return (
    <S.Container>
      <S.ImageWrapper>
        <S.Image src="/dbti-intro.png" alt="DBTI 나가기 확인" />
      </S.ImageWrapper>
      <S.TextWrapper>
        <S.CloseSubtitle>지금 나가면, 이제까지 남긴 소중한 응답들이 저장되지 않아요!</S.CloseSubtitle>
        <S.CloseSubtitle>조금만 더 힘을 내 볼까요?</S.CloseSubtitle>
      </S.TextWrapper>
        <BkMTextButton onClick={onConfirm}>
          나가기
        </BkMTextButton>
    </S.Container>
  );
}