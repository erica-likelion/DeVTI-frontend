import * as S from './WtMList.styles';
import { useState } from 'react';

interface WtMListProps {
  header: string;
  body: string;
  disabled?: boolean;
  showRightSection?: boolean;
  onClick?: () => void;
}

export const WtMList = ({
  header,
  body,
  disabled = false,
  showRightSection = true,
  onClick,
}: WtMListProps) => {

  const [clicked, setClicked] = useState(false);

  return (
    <S.Container
      $clicked={clicked}
      onClick={
        !disabled
          ? () => {
              setClicked(prev => !prev); 
              onClick?.();
            }
          : undefined
      }>
      <S.LeftArea>
        <S.Header $clicked={clicked}>{header}</S.Header>
      </S.LeftArea>

      

      {showRightSection && (
        <S.RightArea>
          <S.IndicatorArea>
            <S.Indicator />
          </S.IndicatorArea>
          {body}
        </S.RightArea>
      )}
    </S.Container>
  );
};

export default WtMList;
