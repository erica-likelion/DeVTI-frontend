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
  hideIcon?: boolean;
  isActive?: boolean; // 외부에서 active 상태 제어
  isToggle?: boolean; // 토글 버튼 여부 (기본값: false - 일반 버튼)
}

export default function WhiteLButton({ 
  className, 
  onClick, 
  disabled = false,
  children,
  hideIcon = false,
  isActive: externalIsActive,
  isToggle = false
}: WhiteLButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // 외부에서 isActive prop이 제공되면 그것을 사용, 아니면 내부 상태 사용
  const isActiveState = externalIsActive !== undefined ? externalIsActive : isClicked;

  const handleClick = () => {
    if (!disabled && onClick) {
      // 외부에서 isActive를 제어하는 경우 내부 상태는 변경하지 않음
      if (externalIsActive === undefined) {
        if (isToggle) {
          setIsClicked(!isClicked);
        } else {
          setIsClicked(true);
          setTimeout(() => {
            setIsClicked(false);
          }, 100);
        }
      }
      onClick();
    }
  };

  const getIcon = () => {
    if (disabled) return FootGray;
    if (isActiveState) return FootPupple;
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
      $isClicked={isActiveState}
      $isActive={isActive}
      $hideIcon={hideIcon}
    >
      {!hideIcon && (
        <S.Icon>
          <img src={getIcon()} alt="Foot" />
        </S.Icon>
      )}
      {children}
    </S.Container>
  );
}