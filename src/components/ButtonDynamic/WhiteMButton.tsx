import React, { useState } from 'react';
import * as S from './WhiteMButton.styles';

interface WhiteMTextButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function WhiteMTextButton({ className, onClick, disabled = false, children }: WhiteMTextButtonProps) {
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
    </S.Container>
  );
}