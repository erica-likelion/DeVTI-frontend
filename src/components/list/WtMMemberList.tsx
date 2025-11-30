import * as S from './WtMMemberList.styles';
import { Keyword } from '../keywords/Keyword';
import { useState } from 'react';

interface WtMMemberListProps {
  header: string;
  keywords: string[][];
  disabled?: boolean;
  onClick?: () => void;
}

export const WtMMemberList = ({
  header,
  keywords,
  disabled = false,
  onClick,
}: WtMMemberListProps) => {

  const [clicked, setClicked] = useState(false);

  return (
    <S.Container
      clicked={clicked}
      onClick={
        !disabled
          ? () => {
              setClicked(prev => !prev); 
              onClick?.();
            }
          : undefined
      }>
      <S.LeftArea>
        <S.Header clicked={clicked}>{header}</S.Header>
      </S.LeftArea>

      <S.KeywordArea>
        {keywords.map((group, idx) => (
          <Keyword key={idx} items={group} />
        ))}
      </S.KeywordArea>
    </S.Container>
  );
};

export default WtMMemberList;
