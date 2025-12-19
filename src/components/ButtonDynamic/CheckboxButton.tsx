import { useState, useEffect } from 'react';
import type { FC } from 'react';
import * as S from './CheckboxButton.styles';
import BoxFill from '@/assets/icons/CheckBox/BoxFill.svg';
import BoxGray from '@/assets/icons/CheckBox/BoxGray.svg';

interface CheckboxButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  isToggle?: boolean; // 버튼 호환성을 위한 prop (실제로는 사용되지 않음)
}

const CheckboxButton: FC<CheckboxButtonProps> = ({ 
  className, 
  onClick, 
  disabled = false,
  children,
  checked = false,
  onChange,
  isToggle: _isToggle // underscore prefix로 사용하지 않음을 명시
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = () => {
    if (!disabled) {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
      onClick?.();
    }
  };

  const getIcon = () => {
    if (disabled) return BoxGray;
    if (isChecked) {
      // 체크된 상태에서는 항상 BoxFill (호버링 포함)
      return BoxFill;
    }
    if (isActive) return BoxFill;
    // 체크되지 않은 상태에서는 호버링해도 BoxGray
    return BoxGray;
  };

  return (
    <S.Container 
      className={className} 
      onClick={handleClick}
      disabled={disabled}
      $isClicked={isChecked}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      <S.Icon>
        <img src={getIcon()} alt="Checkbox" />
      </S.Icon>
      {children}
    </S.Container>
  );
};

export default CheckboxButton;