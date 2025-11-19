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
    
    // 다음 질문으로 스크롤
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length && questionRefs.current[nextIndex]) {
      questionRefs.current[nextIndex]?.scrollIntoView({
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