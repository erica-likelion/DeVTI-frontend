import * as S from './WtLMemberList.styles';
import { Keyword } from '../keywords/Keyword';
import VT500Button from '../ButtonDynamic/VT500SButton';
import { useState } from 'react';

interface WtLMemberListProps {
  icon?: string;
  header: string;
  keywords: string[][];
  rightButton: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const WtLMemberList = ({
  icon,
  header,
  keywords,
  rightButton,
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
        <S.Icon>
          {icon && <img src={icon} alt="icon" />}
        </S.Icon>
        <S.Header clicked={clicked}>{header}</S.Header>
      </S.LeftArea>

      <S.KeywordArea>
        {keywords.map((group, idx) => (
          <Keyword key={idx} items={group} />
        ))}
      </S.KeywordArea>

      <S.IndicatorArea>
        <S.Indicator />
      </S.IndicatorArea>

      <S.RightArea>
        <VT500Button disabled={disabled}>{rightButton}</VT500Button>
      </S.RightArea>
    </S.Container>
  );
};

export default WtLMemberList;
