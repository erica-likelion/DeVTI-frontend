import React, { useState } from 'react';
import * as S from './WtMButton.styles';

interface WtMButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  isClicked?: boolean;
  isToggle?: boolean; // 토글 버튼 여부 (기본값: false - 일반 버튼)
}

export default function WtMButton({ className, onClick, disabled = false, children, isClicked: externalIsClicked, isToggle = false }: WtMButtonProps) {
  const [internalIsClicked, setInternalIsClicked] = useState(false);
  
  const isClicked = externalIsClicked !== undefined ? externalIsClicked : internalIsClicked;

  const handleClick = () => {
    if (!disabled && onClick) {
      if (externalIsClicked === undefined) {
        if (isToggle) {
          setInternalIsClicked(!internalIsClicked);
        } else {
          setInternalIsClicked(true);
          setTimeout(() => {
            setInternalIsClicked(false);
          }, 100);
        }
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
      {children}
    </S.Container>
  );
}