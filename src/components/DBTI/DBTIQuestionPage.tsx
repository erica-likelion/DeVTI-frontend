import { useRef, useEffect } from 'react';
import * as S from './DBTIQuestionPage.styles';
import DBTIQuestion from './DBTIQuestion';

interface QuestionData {
  number: number;
  text: string;
  selectedValue?: number;
}

interface DBTIQuestionPageProps {
  questions: QuestionData[];
  onAnswer: (questionIndex: number, value: number) => void;
  resetScroll?: number;
}

export default function DBTIQuestionPage({ questions, onAnswer, resetScroll }: DBTIQuestionPageProps) {
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 페이지 변경 시 스크롤 초기화
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [resetScroll]);

  const handleAnswer = (questionIndex: number, value: number) => {
    onAnswer(questionIndex, value);
    
    // 답변 후 상태를 시뮬레이션 (현재 질문에 답변이 추가된 상태)
    const updatedQuestions = questions.map((q, idx) => ({
      ...q,
      selectedValue: idx === questionIndex ? value : q.selectedValue
    }));
    
    // 첫 번째 빈 질문을 찾기
    const firstEmptyIndex = updatedQuestions.findIndex(q => q.selectedValue === undefined);
    
    // 빈 질문이 없으면 순서상 다음 질문으로, 있으면 첫 번째 빈 질문으로 스크롤
    const targetIndex = firstEmptyIndex === -1 ? questionIndex + 1 : firstEmptyIndex;
    
    if (targetIndex < questions.length && questionRefs.current[targetIndex]) {
      questionRefs.current[targetIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <S.Container ref={containerRef}>
      {questions.map((question, index) => (
        <S.QuestionWrapper
          key={question.number}
          ref={(el) => {
            questionRefs.current[index] = el;
          }}
        >
          <DBTIQuestion
            questionNumber={question.number}
            question={question.text}
            onAnswer={(value) => handleAnswer(index, value)}
            selectedValue={question.selectedValue}
          />
        </S.QuestionWrapper>
      ))}
    </S.Container>
  );
}