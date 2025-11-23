import * as S from './WtLMemberList.styles';

import { Keyword } from '../keywords/Keyword';
import VT500Button from '../ButtonDynamic/VT500SButton';


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
  
  return (
    <S.Container
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}>
      {/* 왼쪽 Header */}
      <S.LeftArea>
        <S.Icon >
					{icon && <img src={icon} alt="icon" />}
        </S.Icon>
        <S.Header disabled={disabled}>{header}</S.Header>
      </S.LeftArea>

      {/* Keyword 태그들 */}
      <S.KeywordArea>
        {keywords.map((group, idx) => (
          <Keyword key={idx} items={group} />))}
      </S.KeywordArea>

      <S.IndicatorArea>
        <S.Indicator />
      </S.IndicatorArea>
      
      {/* 오른쪽 버튼 */}
      <S.RightArea>
        <VT500Button disabled={disabled}>{rightButton}</VT500Button>
      </S.RightArea>
    </S.Container>
  );
};


export default WtLMemberList;