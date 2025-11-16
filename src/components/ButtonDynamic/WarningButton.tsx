import React, { useState } from 'react';
import * as S from './WarningButton.styles';
import XBlack from '@/assets/icons/Xblack.svg';
import XWhite from '@/assets/icons/Xwhite.svg';

interface WarningButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function WarningButton({ className, onClick, disabled = false, children }: WarningButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsClicked(!isClicked);
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
      {children}
      <S.Icon>
        <img src={disabled ? XWhite : XBlack} alt="X" />
      </S.Icon>
    </S.Container>
  );
}