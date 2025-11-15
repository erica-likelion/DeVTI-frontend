import React, { useState } from 'react';
import * as S from './VT500SButton.styles';

interface ImageButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: string;
  iconAlt?: string;
}

export default function ImageButton({ 
  className, 
  onClick, 
  disabled = false, 
  children, 
  icon,
  iconAlt = "icon"
}: ImageButtonProps) {
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
      <S.Icon>
        {icon && <img src={icon} alt={iconAlt} />}
      </S.Icon>
      {children}
    </S.Container>
  );
}