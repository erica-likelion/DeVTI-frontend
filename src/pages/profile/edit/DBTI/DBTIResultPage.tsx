import { useState, useEffect } from 'react';
import * as S from './DBTIResultPage.styles';
import { BkMTextButton } from '@/components/ButtonStatic';
import { Keyword } from '@/components/keywords/Keyword';
import { getDBTIResult, DBTI_RESULTS, getBestieReason, getDBTIIdFromCode } from '@/constants/DBTIResults';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import CenterSheet from '@/components/CenterSheet/CenterSheet';
import DBTIIntro from '@/components/DBTI/DBTIIntro';
import DBTIQuestionPage from '@/components/DBTI/DBTIQuestionPage';
import DBTIExitConfirm from '@/components/DBTI/DBTIExitConfirm';
import DBTIResult from '@/components/DBTI/DBTIResult';
import { DBTI_QUESTIONS, QUESTIONS_PER_PAGE, TOTAL_PAGES, getQuestionsForPage } from '@/constants/DBTIQuestions';
import { useDBTI } from '@/hooks/useDBTI';
import { starsToScore } from '@/services/dbti';
import { getProfile } from '@/services/profile';

interface DBTIResultPageProps {
  onRetakeTest?: () => void;
  hideRetakeButton?: boolean; // "다시 테스트" 버튼 숨김 여부
  isInDefaultPage?: boolean; // default 페이지에서 사용되는지 여부 (padding 제거용)
}

export default function DBTIResultPage({ hideRetakeButton = false, isInDefaultPage = false }: DBTIResultPageProps) {
  
  // 사용자 정보
  const { user, updateUser } = useAuthStore();
  
  // DBTI 테스트 상태들
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [step, setStep] = useState<'intro' | 'question' | 'result'>('intro');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [resultId, setResultId] = useState<number | null>(null);
  const [resultUserName, setResultUserName] = useState<string | null>(null);
  
  // DBTI API 훅
  const { submitTest, updateTest, isLoading, result, error } = useDBTI();
  
  
  // 사용자의 실제 DBTI 결과 가져오기
  const dbtiId = user?.dbti || 1; // DBTI가 없으면 기본값 (레이아웃 확인용)
  const dbtiResult = getDBTIResult(dbtiId);
  const userName = user?.name || '사용자'; // 로그인된 사용자 이름 또는 기본값
  
  // DBTI 결과가 없는 경우 처리
  const hasDBTIResult = !!user?.dbti;
  
  const location = useLocation();
  const isDetailRoute = location.pathname.includes('/profile/DBTI'); // 다시 테스트하기 버튼이 없는 경우

  // API 결과 처리
  useEffect(() => {
    if (result && result.status === 'success') {
      const backendDevti = result.data.devti;
      const resolvedDbtiId = typeof backendDevti === 'number'
        ? backendDevti
        : getDBTIIdFromCode(backendDevti);

      if (!resolvedDbtiId) {
        console.error('알 수 없는 DBTI 코드:', backendDevti);
        setResultId(1);
        setResultUserName(result.data.username);
        setStep('result');
        return;
      }
      
      updateUser({ dbti: resolvedDbtiId });
      
      setResultId(resolvedDbtiId);
      setResultUserName(result.data.username);
      setStep('result');
    }
  }, [result, updateUser]);

  useEffect(() => {
    if (user?.dbti) {
      return;
    }
    
    let isMounted = true;
    const loadProfileDevti = async () => {
      try {
        const profileResult = await getProfile(undefined, true);
        if (!isMounted || !profileResult.success || !profileResult.data) {
          return;
        }
        
        const resolvedDbtiId = typeof profileResult.data.devti === 'number'
          ? profileResult.data.devti
          : getDBTIIdFromCode(profileResult.data.devti);
        
        if (resolvedDbtiId) {
          updateUser({ dbti: resolvedDbtiId });
        }
      } catch (error) {
        console.error('프로필 DBTI 로드 실패:', error);
      }
    };
    
    loadProfileDevti();
    return () => {
      isMounted = false;
    };
  }, [user?.dbti, updateUser]);

  // API 에러 처리
  useEffect(() => {
    if (error) {
      console.error('DBTI API 에러:', error);
      setResultId(1);
      setStep('result');
    }
  }, [error]);

  const handleRetakeTest = () => {
    // 센터시트 열고 테스트 시작
    setIsSheetOpen(true);
    setStep('intro');
    setCurrentPageIndex(0);
    setAnswers({});
    setShowExitConfirm(false);
    setResultId(null);
    setResultUserName(null);
  };

  const handleStart = () => {
    setStep('question');
    setCurrentPageIndex(0);
  };

  const handleAnswer = (questionIndex: number, value: number) => {
    const globalQuestionIndex = currentPageIndex * QUESTIONS_PER_PAGE + questionIndex;
    setAnswers(prev => ({
      ...prev,
      [globalQuestionIndex]: value
    }));
  };

  const submitAnswersToBackend = async (answers: {[key: number]: number}): Promise<number | null> => {
    try {
      const scoresArray: number[] = [];
      for (let i = 0; i < DBTI_QUESTIONS.length; i++) {
        const selectedStars = answers[i];
        const score = selectedStars !== undefined ? starsToScore(selectedStars) : 0;
        scoresArray.push(score);
      }
      
      
      // 기존 DBTI가 있으면 PUT, 없으면 POST
      if (user?.dbti) {
        await updateTest(scoresArray);
      } else {
        await submitTest(scoresArray);
      }
      
      return 1;
    } catch (error) {
      console.error('DBTI 제출 실패:', error);
      return null;
    }
  };

  const handleNext = async () => {
    if (currentPageIndex < TOTAL_PAGES - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else {
      const allAnswered = DBTI_QUESTIONS.every((_, index) => answers[index] !== undefined);
      if (allAnswered) {
        await submitAnswersToBackend(answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleClose = () => {
    if (showExitConfirm) {
      setIsSheetOpen(false);
      setStep('intro');
      setCurrentPageIndex(0);
      setAnswers({});
      setShowExitConfirm(false);
    } else if (step === 'question' && Object.keys(answers).length > 0) {
      setShowExitConfirm(true);
    } else {
      setIsSheetOpen(false);
      setStep('intro');
      setShowExitConfirm(false);
    }
  };

  const handleExitConfirm = () => {
    setShowExitConfirm(false);
  };

  const handleExitCancel = () => {
    setShowExitConfirm(false);
  };

  const handleResultClose = () => {
    setIsSheetOpen(false);
    setStep('intro');
    setCurrentPageIndex(0);
    setAnswers({});
    setShowExitConfirm(false);
    setResultId(null);
    setResultUserName(null);
  };

  const renderContent = () => {
    if (showExitConfirm) {
      return <DBTIExitConfirm onConfirm={handleExitConfirm} onCancel={handleExitCancel} />;
    }
    
    if (step === 'result' && resultId) {
      const resultData = getDBTIResult(resultId);
      if (resultData) {
        return <DBTIResult resultData={resultData} userName={resultUserName || user?.name} onClose={handleResultClose} />;
      }
    }
    
    if (step === 'intro') {
      return <DBTIIntro onStart={handleStart} />;
    }
    
    const baseQuestions = getQuestionsForPage(currentPageIndex);
    const startIndex = currentPageIndex * QUESTIONS_PER_PAGE;
    const pageQuestions = baseQuestions.map((question, index) => ({
      ...question,
      selectedValue: answers[startIndex + index]
    }));
    
    return (
      <DBTIQuestionPage
        questions={pageQuestions}
        onAnswer={handleAnswer}
        resetScroll={currentPageIndex}
      />
    );
  };

  return (
    <S.Container $isInDefaultPage={isInDefaultPage}>
      <S.TitleFrame>
        <S.Title>
          {userName} 의 DBTI
        </S.Title>
        {!isDetailRoute && !hideRetakeButton && (
          <BkMTextButton onClick={handleRetakeTest}>
            {hasDBTIResult ? '다시 테스트' : '테스트하기'}
          </BkMTextButton>
        )}
      </S.TitleFrame>
      
      {hasDBTIResult && (
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
                      <S.BestieDetailText>{getBestieReason(dbtiId, bestieId)}</S.BestieDetailText>
                    </S.BestieTextFrame>
                  </S.ImageTextFrame>
                ))}
              </S.BestieWrapper>   
            </S.DetailTextFrame>

          </S.InfoFrame>
        </S.ContentFrame>
      )}

      {/* DBTI 센터시트 (재 테스트용) */}
      <CenterSheet
        isOpen={isSheetOpen}
        onClose={handleClose}
        showNavigation={step === 'question' && !showExitConfirm}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasAnswer={(() => {
          const startIndex = currentPageIndex * QUESTIONS_PER_PAGE;
          const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, DBTI_QUESTIONS.length);
          for (let i = startIndex; i < endIndex; i++) {
            if (answers[i] === undefined) return false;
          }
          return true;
        })()}
        isPreviousDisabled={currentPageIndex === 0 || isLoading}
        isNextDisabled={isLoading}
        currentPage={currentPageIndex}
        isLastPage={currentPageIndex === TOTAL_PAGES - 1}
      >
        {renderContent()}
      </CenterSheet>
    </S.Container>
  );
}
