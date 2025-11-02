import * as S from './NavButton.styles';

interface NavButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function NavButton({ 
  children, 
  onClick, 
  className, 
  icon
}: NavButtonProps) {
  return (
    <S.Container className={className} onClick={onClick}>
      {icon && (
        <S.IconWrapper>
          {icon}
        </S.IconWrapper>
      )}
      {children}
    </S.Container>
  );
}