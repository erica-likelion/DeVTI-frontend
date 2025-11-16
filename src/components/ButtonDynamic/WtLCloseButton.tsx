import { useState } from 'react';
import * as S from './WtLCloseButton.styles';
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
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (!disabled && onClick) {
      setIsClicked(!isClicked);
      onClick();
    }
  };

  const getIcon = () => {
    if (disabled) return XgrayIcon;
    if (isClicked) return XpuppleIcon;
    if (isActive) return XblackIcon;
    if (isHovered) return XpuppleIcon;
    return XblackIcon;
  };

  return (
    <S.Container 
      className={className} 
      onClick={handleClick}
      disabled={disabled}
      $isClicked={isClicked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      White L
      <S.Icon>
        <img src={getIcon()} alt="Close" />
      </S.Icon>
    </S.Container>
  );
}