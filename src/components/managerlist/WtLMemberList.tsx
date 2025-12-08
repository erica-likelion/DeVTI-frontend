import * as S from './WtLMemberList.styles';
import { Keyword } from '@/components/keywords/Keyword';
import WarningButton from '@/components/ButtonDynamic/WarningButton';
import { useState } from 'react';

interface WtLMemberListProps {
  icon?: string;
  header: string;
  keywords: string[][];
  rightButton?: string | false;
  disabled?: boolean;
  onClick?: () => void;
  onRightButtonClick?: () => void;
}

export const WtLMemberList = ({
  icon,
  header,
  keywords,
  rightButton,
  disabled = false,
  onClick,
  onRightButtonClick,
}: WtLMemberListProps) => {
  const [clicked, setClicked] = useState(false);

  const hasRightButton = !!rightButton; // undefined, '', false → false / 그 외 string → true

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
      }
    >
      <S.LeftArea>
        <S.Icon>
          {icon && <img src={icon} alt="icon" />}
        </S.Icon>
        <S.Header $clicked={clicked}>{header}</S.Header>
      </S.LeftArea>

      <S.KeywordArea>
        {keywords.map((group, idx) => (
          <Keyword key={idx} items={group} />
        ))}
      </S.KeywordArea>

      <S.RightArea $hasRightButton={hasRightButton}>
        <S.IndicatorArea>
          <S.Indicator />
        </S.IndicatorArea>

        <S.ButtonArea>
          {hasRightButton && (
            <WarningButton disabled={disabled} onClick={onRightButtonClick}>
              {rightButton}
            </WarningButton>
          )}
        </S.ButtonArea>
      </S.RightArea>
    </S.Container>
  );
};

export default WtLMemberList;