import { useState } from 'react';
import * as S from './ArrowLeftTextButton.styles';
import ArrowLeftBlack from '@/assets/icons/Button/ArrowLeftBlack.svg';
import ArrowLeftGray from '@/assets/icons/Button/ArrowLeftGray.svg';
import ArrowLeftPupple from '@/assets/icons/Button/ArrowLeftPupple.svg';

interface ArrowLeftTextButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  isToggle?: boolean; // 토글 버튼 여부 (기본값: false - 일반 버튼)
}

export default function ArrowLeftTextButton({ 
  className, 
  onClick, 
  disabled = false,
  children,
  isToggle = false
}: ArrowLeftTextButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      if (isToggle) {
        setIsClicked(!isClicked);
      } else {
        setIsClicked(true);
        setTimeout(() => {
          setIsClicked(false);
        }, 100);
      }
      onClick();
    }
  };

  const getIcon = () => {
    if (disabled) return ArrowLeftGray;
    if (isClicked || isHovered || isActive) return ArrowLeftPupple;
    return ArrowLeftBlack;
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
      <S.Icon>
        <img src={getIcon()} alt="ArrowLeft" />
      </S.Icon>
      {children}
    </S.Container>
  );
}