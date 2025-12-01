import React, { useState } from 'react';
import * as S from './WtMButton.styles';

interface WtMButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  isClicked?: boolean;
}

export default function WtMButton({ className, onClick, disabled = false, children, isClicked: externalIsClicked }: WtMButtonProps) {
  const [internalIsClicked, setInternalIsClicked] = useState(false);
  
  const isClicked = externalIsClicked !== undefined ? externalIsClicked : internalIsClicked;

  const handleClick = () => {
    if (!disabled && onClick) {
      if (externalIsClicked === undefined) {
        setInternalIsClicked(!internalIsClicked);
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