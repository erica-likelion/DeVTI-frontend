import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import * as S from './BlackMButton.styles';

interface BlackMButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const BlackMButton = ({ 
  children, 
  className, 
  ...props 
}: BlackMButtonProps) => {
  return (
    <S.StyledButton className={className} {...props}>
      {children}
    </S.StyledButton>
  );
};