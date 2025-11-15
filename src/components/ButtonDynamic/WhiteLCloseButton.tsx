import { useState } from 'react';
import * as S from './WhiteLCloseButton.styles';
import XblackIcon from '@/assets/icons/Xblack.svg';
import XgrayIcon from '@/assets/icons/Xgray.svg';
import XpuppleIcon from '@/assets/icons/Xpupple.svg';

interface WhiteLCloseButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function WhiteLCloseButton({ 
  className, 
  onClick, 
  disabled = false 
}: WhiteLCloseButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsClicked(!isClicked);
      onClick();
    }
  };

  const getIcon = () => {
    if (disabled) return XgrayIcon;
    if (isClicked || isHovered) return XpuppleIcon;
    return XblackIcon; // hover & active� CSS� ��
  };

  return (
    <S.Container 
      className={className} 
      onClick={handleClick}
      disabled={disabled}
      $isClicked={isClicked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      White L
      <S.Icon>
        <img src={getIcon()} alt="Close" />
      </S.Icon>
    </S.Container>
  );
}