import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import * as S from './WhiteMTextButton.styles';

interface WhiteMButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const WhiteMTextButton = ({ 
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

export default WhiteMTextButton;