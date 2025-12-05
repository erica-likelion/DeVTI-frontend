import * as S from './DBTIResultPage.styles';
import { BkMTextButton } from '@/components/ButtonStatic';
import { Keyword } from '@/components/keywords/Keyword';
import { getDBTIResult, DBTI_RESULTS, getBestieReason } from '@/constants/DBTIResults';
import { useLocation } from 'react-router-dom';

interface DBTIResultPageProps {
  onRetakeTest?: () => void;
}

export default function DBTIResultPage({ onRetakeTest }: DBTIResultPageProps) {
  
  // 예시로 id 1의 DBTI 결과를 가져오게 해뒀어요! (실제로는 사용자 데이터에서 가져와야 함)
  const dbtiResult = getDBTIResult(1);
  const userName = '붕어빵'; // 기본값, 나중에 props나 상태관리에서 받아올 예정!
  
  const location = useLocation();
  const isDetailRoute = location.pathname.includes('/profile/DBTI'); // 다시 테스트하기 버튼이 없는 경우

  const handleRetakeTest = () => {
    onRetakeTest?.();
  };

  return (
    <S.Container>
      <S.TitleFrame>
        <S.Title>{userName} 의 DBTI</S.Title>
        {!isDetailRoute && (
          <BkMTextButton onClick={handleRetakeTest}>다시 테스트</BkMTextButton>
        )}
      </S.TitleFrame>
      
      <S.ContentFrame>
        <S.ResultImageTextFrame>
          <img src={dbtiResult?.image} alt={dbtiResult?.name} />
          <S.TextFrame>
            <S.TypeText>{dbtiResult?.name}</S.TypeText>
            <S.KeywordFrame>
              {dbtiResult?.keywords.map((keyword, idx) => (
                <Keyword key={idx} items={[keyword]} color="purple" size="m" />
              ))}
            </S.KeywordFrame>
          </S.TextFrame>
        </S.ResultImageTextFrame>
        
        <S.InfoFrame>
          <S.DetailTextFrame>
            <S.Rightlabel>Good at</S.Rightlabel>
            <S.DetailText>{dbtiResult?.goodAt}</S.DetailText>
          </S.DetailTextFrame>
          
          <S.DetailTextFrame>
            <S.Rightlabel>Best Position</S.Rightlabel>
            <S.DetailText>{dbtiResult?.bestPosition}</S.DetailText>
          </S.DetailTextFrame>
          
          <S.DetailTextFrame>
            <S.Rightlabel>Habit</S.Rightlabel>
            <S.DetailText>{dbtiResult?.habit}</S.DetailText>
          </S.DetailTextFrame>
          
          <S.DetailTextFrame>
            <S.Rightlabel>Risk</S.Rightlabel>
            <S.DetailText>{dbtiResult?.risk}</S.DetailText>
          </S.DetailTextFrame>
          
          <S.DetailTextFrame>
            <S.Rightlabel>Bestie</S.Rightlabel>
            
            <S.BestieWrapper>
              {dbtiResult?.bestie.map((bestieId, index) => (
                <S.ImageTextFrame key={index}>
                  <img src={DBTI_RESULTS[bestieId]?.image} />
                  <S.BestieTextFrame>
                    <S.label>{DBTI_RESULTS[bestieId]?.name}</S.label>
                    <S.BestieDetailText>{getBestieReason(1, bestieId)}</S.BestieDetailText>
                  </S.BestieTextFrame>
                </S.ImageTextFrame>
              ))}
            </S.BestieWrapper>   
          </S.DetailTextFrame>

        </S.InfoFrame>
      </S.ContentFrame>
    </S.Container>
  );
}