import * as S from './WtMList.styles';
import { useState } from 'react';

interface WtLMemberListProps {
  header: string;
  body: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const WtLMemberList = ({
  header,
  body,
  disabled = false,
  onClick,
}: WtLMemberListProps) => {

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

      

      <S.RightArea>
        <S.IndicatorArea>
          <S.Indicator />
        </S.IndicatorArea>
        {body}
      </S.RightArea>
    </S.Container>
  );
};

export default WtLMemberList;
