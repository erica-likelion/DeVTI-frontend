import { useState } from 'react';
import * as S from './ArrowRightTextButton.styles';
import ArrowRightBlack from '@/assets/icons/Button/ArrowRightBlack.svg';
import ArrowRightGray from '@/assets/icons/Button/ArrowRightGray.svg';
import ArrowRightPupple from '@/assets/icons/Button/ArrowRightPupple.svg';

interface ArrowRightButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function ArrowRightButton({ 
  className, 
  onClick, 
  disabled = false,
  children 
}: ArrowRightButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsClicked(!isClicked);
      onClick();
    }
  };

  const getIcon = () => {
    if (disabled) return ArrowRightGray;
    if (isClicked || isHovered || isActive) return ArrowRightPupple;
    return ArrowRightBlack;
  };

  return (
    <S.Container 
      className={className} 
      onClick={handleClick}
      disabled={disabled}
      $isClicked={isClicked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {children}
      <S.Icon>
        <img src={getIcon()} alt="ArrowRight" />
      </S.Icon>
    </S.Container>
  );
}