import * as S from './DBTIResult.styles';
import BkMTextButton from '@/components/ButtonStatic/BkMTextButton';
import { Keyword } from '@/components/keywords/Keyword';
import type { DBTIResultData } from '@/constants/DBTIResults';
import { useNavigate } from 'react-router-dom';

interface DBTIResultProps {
  resultData: DBTIResultData;
  userName?: string;
  onClose: () => void;
}

export default function DBTIResult({ resultData, userName = 'likelion', onClose }: DBTIResultProps) {
  const navigate = useNavigate();

  const handleDBTIAnalysis = () => {
    navigate('/profile/edit/dbti?from=centersheet');
    onClose();
  };

  return (
    <S.Container>
      <S.TextWrapper>
        <S.Subtitle>{userName} 의 DBTI</S.Subtitle>
        <S.Title>{resultData.name}</S.Title>
      </S.TextWrapper>
      <S.ImageWrapper>
        <S.Image src={resultData.image} alt={`${resultData.name}`} />
      </S.ImageWrapper>
      <S.KeywordContainer>
        {resultData.keywords.map((keyword, idx) => (
          <Keyword key={idx} items={[keyword]} color="purple" size="m" />
        ))}
      </S.KeywordContainer>
      <BkMTextButton onClick={handleDBTIAnalysis}>
        DBTI 분석
      </BkMTextButton>
    </S.Container>
  );
}