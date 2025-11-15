import React from 'react';
import * as S from './NumButton.styles';

interface NumButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  isSelected?: boolean;
}

export default function NumButton({ className, onClick, disabled = false, children, isSelected = false }: NumButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <S.Container 
      className={className} 
      onClick={handleClick} 
      disabled={disabled}
      $isClicked={isSelected}
    >
      {children}
    </S.Container>
  );
}