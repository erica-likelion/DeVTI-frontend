import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import * as S from './BlackMTextButton.styles';

interface BlackMButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const BlackMTextButton = ({ 
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

export default BlackMTextButton;