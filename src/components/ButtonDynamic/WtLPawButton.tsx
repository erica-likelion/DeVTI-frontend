import { useState } from 'react';
import * as S from './WtLPawButton.styles';
import FootBlack from '@/assets/icons/FootBlack.svg';
import FootGray from '@/assets/icons/FootGray.svg';
import FootPupple from '@/assets/icons/FootPupple.svg';

interface WhiteLButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function WhiteLButton({ 
  className, 
  onClick, 
  disabled = false,
  children 
}: WhiteLButtonProps) {
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
    if (disabled) return FootGray;
    if (isClicked) return FootPupple;
    if (isActive) return FootBlack;
    if (isHovered) return FootPupple;
    return FootBlack;
  };

  return (
    <S.Container 
      className={className} 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      disabled={disabled}
      $isClicked={isClicked}
      $isActive={isActive}
    >
      <S.Icon>
        <img src={getIcon()} alt="Foot" />
      </S.Icon>
      {children}
    </S.Container>
  );
}