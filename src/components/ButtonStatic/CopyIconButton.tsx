import { useState } from 'react';
import * as S from './CopyIconButton.styles';
import CopyBlackGray from '../../assets/icons/Copy/CopyBlackGray.svg';
import CopyGray from '../../assets/icons/Copy/CopyGray.svg';
import CopyPupple from '../../assets/icons/Copy/CopyPupple.svg';
import { copyToClipboard } from '../../utils/copyToClipboard';

interface CopyIconButtonProps {
  className?: string;
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function CopyIconButton({ className, text = '', disabled = false, onClick }: CopyIconButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = async () => {
    if (!disabled) {
      if (text) {
        // Copy functionality would go here
        navigator.clipboard?.writeText(text);
      }
      onClick?.();
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsActive(true);
    }
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  const getIcon = () => {
    if (disabled) return CopyGray;
    if (isActive) return CopyPupple;
    return CopyBlackGray;
  };

  return (
    <S.Container 
      className={className} 
      onClick={handleClick} 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      $isActive={isActive}
    >
      <S.Icon>
        <img src={getIcon()} alt="Copy" />
      </S.Icon>
    </S.Container>
  );
}