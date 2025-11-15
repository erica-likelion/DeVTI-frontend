import React, { useState } from 'react';
import * as S from './VT700LButton.styles';

interface IconTextButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: string;
  iconAlt?: string;
}

export default function IconTextButton({ 
  className, 
  onClick, 
  disabled = false, 
  children, 
  icon,
  iconAlt = "icon"
}: IconTextButtonProps) {
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