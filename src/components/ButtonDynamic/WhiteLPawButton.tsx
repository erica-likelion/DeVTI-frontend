import { useState } from 'react';
import * as S from './WhiteLPawButton.styles';
import FootBlack from '@/assets/icons/FootBlack.svg';
import FootGray from '@/assets/icons/FootGray.svg';
import FootPupple from '@/assets/icons/FootPupple.svg';

interface WhiteLButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function WhiteLButton({ 
  className, 
  onClick, 
  disabled = false 
}: WhiteLButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsClicked(!isClicked);
      onClick();
    }
  };

  const getIcon = () => {
    if (disabled) return FootGray;
    if (isClicked) return FootPupple;
    return FootBlack; // hover & active는 CSS에서 처리
  };

  return (
    <S.Container 
      className={className} 
      onClick={handleClick}
      disabled={disabled}
      $isClicked={isClicked}
    >
      <S.Icon>
        <img src={getIcon()} alt="Foot" />
      </S.Icon>
    </S.Container>
  );
}