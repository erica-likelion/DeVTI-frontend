import { useState } from 'react';
import * as S from './ClearMTextButton.styles';

interface ClearTextButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  selected?: boolean;
  isToggle?: boolean; // 토글 버튼 여부 (기본값: false - 일반 버튼)
}

export default function ClearTextButton({ className, onClick, disabled = false, children, selected, isToggle = false }: ClearTextButtonProps) {
  const [internalSelected, setInternalSelected] = useState(false);

  const isSelected = selected !== undefined ? selected : internalSelected;

  const handleClick = () => {
    if (!disabled) {
      if (selected === undefined) {
        if (isToggle) {
          setInternalSelected(!internalSelected);
        } else {
          setInternalSelected(true);
          setTimeout(() => {
            setInternalSelected(false);
          }, 100);
        }
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