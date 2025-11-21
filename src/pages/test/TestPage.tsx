import { useState } from 'react';
import CenterSheet from '@/components/CenterSheet/CenterSheet';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import DBTIIntro from '@/components/DBTI/DBTIIntro';
import DBTIQuestionPage from '@/components/DBTI/DBTIQuestionPage';
import * as S from './TestPage.styles';

export default function TestPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [step, setStep] = useState<'intro' | 'question'>('intro');
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});

  const allQuestions = [
    // 페이지 1 (1-7)
    "프로젝트 시작 단계에서, 다 함께 모여 자유롭게 아이디어를 던지는 브레인스토밍 세션을 가장 즐긴다.",
    "팀 프로젝트에서 역할 분배 시, 각자의 강점과 관심사를 고려하여 자연스럽게 결정되는 것을 선호한다.",
    "프로젝트 진행 중 예상치 못한 문제가 발생했을 때, 즉시 팀원들과 함께 해결방안을 논의한다.",
    "완성된 프로젝트를 발표할 때, 팀 전체의 협력 과정과 각자의 기여도를 강조하는 것이 중요하다고 생각한다.",
    "새로운 기술을 배울 때, 팀원들과 함께 스터디 그룹을 만들어 학습하는 것을 선호한다.",
    "코드 리뷰 시간에 서로의 의견을 자유롭게 나누며 더 나은 해결책을 찾아가는 과정이 즐겁다.",
    "프로젝트 마감이 다가올 때, 팀원들과 함께 야근하며 서로를 격려하는 분위기를 만든다.",
    // 페이지 2 (8-14)
    "업무 분담 시, 개인의 전문성보다는 팀 전체의 균형을 고려하여 배분한다.",
    "새로운 팀원이 합류했을 때, 적극적으로 다가가서 팀 문화를 소개해준다.",
    "프로젝트 회의에서 모든 팀원이 의견을 낼 수 있도록 분위기를 조성한다.",
    "개발 중 어려운 문제에 직면했을 때, 혼자 해결하기보다 팀원들과 함께 고민한다.",
    "팀 프로젝트의 성공을 위해서라면 개인의 선호도는 조금 양보할 수 있다.",
    "프로젝트 진행 상황을 팀원들과 자주 공유하며 투명하게 소통한다.",
    "팀 내에서 갈등이 발생했을 때, 중재자 역할을 자처하여 문제를 해결하려 한다.",
    // 페이지 3 (15-21)
    "새로운 프로젝트 아이디어가 떠오르면 즉시 팀원들과 공유하고 피드백을 구한다.",
    "코딩 컨벤션이나 개발 규칙을 정할 때 모든 팀원의 의견을 수렴하여 결정한다.",
    "프로젝트 데드라인이 촉박할 때도 팀원들의 의견을 충분히 들어보고 결정한다.",
    "개인 작업보다는 페어 프로그래밍이나 함께하는 개발을 더 선호한다.",
    "프로젝트 회고 시간에 팀워크 개선 방안에 대해 활발히 의견을 제시한다.",
    "팀 빌딩 활동이나 워크샵 참여를 통해 팀원들과 더 가까워지려고 노력한다.",
    "다른 팀원이 도움을 요청하면 본인 일을 미뤄두고라도 적극적으로 도와준다.",
    // 페이지 4 (22-28)
    "프로젝트 기획 단계에서 팀원들의 다양한 관점을 수집하여 더 나은 결과를 만든다.",
    "개발 도구나 기술 스택 선정 시 팀원들의 숙련도와 선호도를 모두 고려한다.",
    "프로젝트 성과 발표 시 개인의 기여도보다 팀 전체의 성과를 강조한다.",
    "팀원 간의 실력 차이가 있을 때, 함께 성장할 수 있는 방법을 모색한다.",
    "원격 근무 시에도 팀원들과의 소통을 위해 적극적으로 화상회의나 채팅을 활용한다.",
    "프로젝트 중간 점검 시 팀원들의 진행 상황과 어려움을 세심하게 파악한다.",
    "팀 프로젝트에서는 개인의 성장보다 팀 전체의 목표 달성이 더 중요하다고 생각한다."
  ];

  const questionsPerPage = 7;
  const totalPages = Math.ceil(allQuestions.length / questionsPerPage);

  const handleStart = () => {
    setStep('question');
    setCurrentPageIndex(0);
  };

  const handleAnswer = (questionIndex: number, value: number) => {
    const globalQuestionIndex = currentPageIndex * questionsPerPage + questionIndex;
    setAnswers(prev => ({
      ...prev,
      [globalQuestionIndex]: value
    }));
  };

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };


  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const renderContent = () => {
    if (step === 'intro') {
      return <DBTIIntro onStart={handleStart} />;
    }
    
    const startIndex = currentPageIndex * questionsPerPage;
    const endIndex = Math.min(startIndex + questionsPerPage, allQuestions.length);
    const pageQuestions = allQuestions.slice(startIndex, endIndex).map((text, index) => ({
      number: startIndex + index + 1,
      text,
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
    <S.Container>
      <S.Title>DBTI 테스트 페이지</S.Title>
      <BlackLTextButton onClick={() => setIsSheetOpen(true)}>
        DBTI 검사 시작
      </BlackLTextButton>

      <CenterSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        showNavigation={step === 'question'}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasAnswer={(() => {
          const startIndex = currentPageIndex * questionsPerPage;
          const endIndex = Math.min(startIndex + questionsPerPage, allQuestions.length);
          for (let i = startIndex; i < endIndex; i++) {
            if (answers[i] === undefined) return false;
          }
          return true;
        })()}
        isPreviousDisabled={currentPageIndex === 0}
      >
        {renderContent()}
      </CenterSheet>
    </S.Container>
  );
}