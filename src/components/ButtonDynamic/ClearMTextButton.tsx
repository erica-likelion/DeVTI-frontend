import { useState } from 'react';
import * as S from './ClearMTextButton.styles';

interface ClearTextButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ClearTextButton({ className, onClick, disabled = false }: ClearTextButtonProps) {
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
      Clear
    </S.Container>
  );
}