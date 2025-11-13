import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import * as S from './WhiteMButton.styles';

interface WhiteMButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const WhiteMButton = ({ 
  children, 
  className, 
  ...props 
}: WhiteMButtonProps) => {
  return (
    <S.StyledButton className={className} {...props}>
      {children}
    </S.StyledButton>
  );
};