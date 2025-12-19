import React, { useState } from 'react';
import * as S from './VT500SButton.styles';

interface ImageButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: string;
  iconAlt?: string;
  isToggle?: boolean; // 토글 버튼 여부 (기본값: false - 일반 버튼)
}

export default function ImageButton({ 
  className, 
  onClick, 
  disabled = false, 
  children, 
  icon,
  iconAlt = "icon",
  isToggle = false
}: ImageButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

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

  return (
    <S.Container 
      className={className} 
      onClick={handleClick} 
      disabled={disabled}
      $isClicked={isClicked}
    >
      <S.Icon>
        {icon && <img src={icon} alt={iconAlt} />}
      </S.Icon>
      {children}
    </S.Container>
  );
}