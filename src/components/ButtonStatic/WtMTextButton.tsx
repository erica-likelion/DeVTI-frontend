import { type ReactNode, type ButtonHTMLAttributes, useState } from 'react';
import * as S from './WtMTextButton.styles';

interface WhiteMButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const WhiteMTextButton = ({ 
  children, 
  className, 
  onClick,
  ...props 
}: WhiteMButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(!isClicked);
    onClick?.(e);
  };

  return (
    <S.StyledButton 
      className={className} 
      onClick={handleClick}
      $isClicked={isClicked}
      {...props}
    >
      {children}
    </S.StyledButton>
  );
};

export default WhiteMTextButton;