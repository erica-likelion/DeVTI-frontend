import { useState } from 'react';
import * as S from './ClearMTextButton.styles';

interface ClearTextButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  selected?: boolean;
}

export default function ClearTextButton({ className, onClick, disabled = false, children, selected }: ClearTextButtonProps) {
  const [internalSelected, setInternalSelected] = useState(false);

  const isSelected = selected !== undefined ? selected : internalSelected;

  const handleClick = () => {
    if (!disabled) {
      if (selected === undefined) {
        setInternalSelected(!internalSelected);
      }
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