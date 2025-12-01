import * as S from './WtMMemberList.styles';
import { Keyword } from '../keywords/Keyword';
import { useState } from 'react';

interface WtMMemberListProps {
  header: string;
  keywords?: string[][] | null; // null도 올 수 있으면 이렇게 열어주는 게 안전
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

  // null / undefined면 빈 배열로 처리
  const keywordGroups = keywords ?? [];
  const hasKeyword = keywordGroups.length > 0;

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
      }
    >
      <S.LeftArea>
        <S.Header clicked={clicked}>{header}</S.Header>
      </S.LeftArea>

      <S.KeywordArea hasKeyword={hasKeyword}>
        {keywordGroups.map((group, idx) => (
          <Keyword key={idx} items={group} />
        ))}
      </S.KeywordArea>
    </S.Container>
  );
};

export default WtMMemberList;
