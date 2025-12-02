import { useState } from 'react';
import * as S from './WtLCloseButton.styles';
import XblackIcon from '@/assets/icons/Xblack.svg';
import XgrayIcon from '@/assets/icons/Xgray.svg';
import XpuppleIcon from '@/assets/icons/Xpupple.svg';

interface WhiteLCloseButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: string; // 커스텀 아이콘 (기본값: X 아이콘)
}

export default function WhiteLCloseButton({ 
  className, 
  onClick, 
  disabled = false,
  children,
  icon
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
    // 커스텀 아이콘이 있으면 항상 그 아이콘 사용
    if (icon) return icon;
    
    // 기본 X 아이콘 로직
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
      {children || "White L"}
      <S.Icon>
        <img src={getIcon()} alt="Close" />
      </S.Icon>
    </S.Container>
  );
}