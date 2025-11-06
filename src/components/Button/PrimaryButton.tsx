import { type ReactNode } from 'react';
import * as S from './PrimaryButton.styles';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const PrimaryButton = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className,
}: PrimaryButtonProps) => {
  return (
    <S.StyledButton
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {children}
    </S.StyledButton>
  );
};

export default PrimaryButton;