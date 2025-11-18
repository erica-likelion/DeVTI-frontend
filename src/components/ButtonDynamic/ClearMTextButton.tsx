import { useState } from 'react';
import * as S from './ClearMTextButton.styles';

interface ClearTextButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function ClearTextButton({ className, onClick, disabled = false, children }: ClearTextButtonProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsSelected(!isSelected);
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <S.Container className={className} onClick={handleClick} $isSelected={isSelected} disabled={disabled}>
      {children || 'Clear'}
    </S.Container>
  );
}