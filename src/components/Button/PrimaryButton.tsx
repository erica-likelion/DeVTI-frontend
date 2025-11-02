import React from 'react';
import * as S from './PrimaryButton.styles';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className,
}) => {
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