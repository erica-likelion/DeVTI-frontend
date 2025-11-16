import React, { useState } from 'react';
import * as S from './NumButton.styles';

interface NumButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  isSelected?: boolean;
  toggleMode?: boolean;
}

export default function NumButton({ 
  className, 
  onClick, 
  disabled = false, 
  children, 
  isSelected = false,
  toggleMode = false 
}: NumButtonProps) {
  const [internalClicked, setInternalClicked] = useState(false);
  
  const handleClick = () => {
    if (!disabled && onClick) {
      if (toggleMode) {
        setInternalClicked(!internalClicked);
      }
      onClick();
    }
  };

  const isClickedState = toggleMode ? internalClicked : isSelected;

  return (
    <S.Container 
      className={className} 
      onClick={handleClick} 
      disabled={disabled}
      $isClicked={isClickedState}
    >
      {children}
    </S.Container>
  );
}