import { useState } from 'react';
import * as S from './PawprintButton.styles';
import CircleGray from '../../assets/icons/CircleGray.svg';
import CirclePupple from '../../assets/icons/CirclePupple.svg';
import FootPupple from '../../assets/icons/FootVt500.svg';

interface PawprintButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function PawprintButton({ className, onClick, disabled = false }: PawprintButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsClicked(!isClicked);
      onClick();
    }
  };

  const getIcon = () => {
    if (disabled) return CircleGray;
    if (isClicked) return FootPupple;
    return CirclePupple; // hover & active는 CSS에서 처리
  };

  return (
    <S.Container 
      className={className} 
      onClick={handleClick}
      $disabled={disabled}
      $isClicked={isClicked}
    >
      <S.Icon>
        <img src={getIcon()} alt="Pawprint" />
      </S.Icon>
    </S.Container>
  );
}