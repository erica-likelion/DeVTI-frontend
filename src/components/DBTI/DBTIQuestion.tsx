import * as S from './DBTIQuestion.styles';
import PawprintButton from '@/components/ButtonStatic/PawprintButton';

interface DBTIQuestionProps {
  questionNumber: number;
  question: string;
  onAnswer: (value: number) => void;
  selectedValue?: number;
}

export default function DBTIQuestion({ questionNumber, question, onAnswer, selectedValue: propSelectedValue }: DBTIQuestionProps) {
  
  const handleSelect = (value: number) => {
    onAnswer(value);
  };


  return (
    <S.Container>
      <S.TextWrapper>
        <S.QuestionHeader>Q{questionNumber}.</S.QuestionHeader>
        <S.QuestionText>{question}</S.QuestionText>
      </S.TextWrapper>
      
      <S.LikertScale>
        <S.LeftLabel>
          <span>매우</span>
          <span>아니다</span>
        </S.LeftLabel>
        
        <S.ButtonGroup>
          {[1, 2, 3, 4, 5].map((value) => (
            <PawprintButton
              key={value}
              onClick={() => handleSelect(value)}
              selected={propSelectedValue === value}
            />
          ))}
        </S.ButtonGroup>
        
        <S.RightLabel>
          <span>매우</span>
          <span>그렇다</span>
        </S.RightLabel>
      </S.LikertScale>
    </S.Container>
  );
}