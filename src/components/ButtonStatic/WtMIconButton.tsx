import * as S from './WtMIconButton.styles';
import ArrowLeftBlack from '../../assets/icons/ArrowLeftBlack.svg';
import ArrowLeftGray from '../../assets/icons/ArrowLeftGray.svg';

interface WhiteLeftArrowButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function WhiteLeftArrowButton({ className, onClick, disabled = true, children }: WhiteLeftArrowButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <S.Container className={className} onClick={handleClick} disabled={disabled}>
      <S.Icon>
        {children ? children : <img src={disabled ? ArrowLeftGray : ArrowLeftBlack} alt="Left Arrow" />}
      </S.Icon>
    </S.Container>
  );
}