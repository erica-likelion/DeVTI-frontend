import React, { useState } from 'react';
import * as S from './WtMButton.styles';

interface WtMButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function WtMButton({ className, onClick, disabled = false, children }: WtMButtonProps) {
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