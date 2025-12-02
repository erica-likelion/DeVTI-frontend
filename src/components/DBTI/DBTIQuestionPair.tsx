import * as S from './DBTIQuestionPair.styles';
import DBTIQuestion from './DBTIQuestion';

interface DBTIQuestionPairProps {
  question1: {
    number: number;
    text: string;
    selectedValue?: number;
  };
  question2: {
    number: number;
    text: string;
    selectedValue?: number;
  };
  onAnswer1: (value: number) => void;
  onAnswer2: (value: number) => void;
}

export default function DBTIQuestionPair({ 
  question1, 
  question2, 
  onAnswer1, 
  onAnswer2 
}: DBTIQuestionPairProps) {
  return (
    <S.Container>
      <DBTIQuestion
        questionNumber={question1.number}
        question={question1.text}
        onAnswer={onAnswer1}
        selectedValue={question1.selectedValue}
      />
      <DBTIQuestion
        questionNumber={question2.number}
        question={question2.text}
        onAnswer={onAnswer2}
        selectedValue={question2.selectedValue}
      />
    </S.Container>
  );
}