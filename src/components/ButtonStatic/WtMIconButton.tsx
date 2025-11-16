import * as S from './WtMIconButton.styles';
import ArrowLeftBlack from '../../assets/icons/ArrowLeftBlack.svg';
import ArrowLeftGray from '../../assets/icons/ArrowLeftGray.svg';

interface WhiteLeftArrowButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function WhiteLeftArrowButton({ className, onClick, disabled = true }: WhiteLeftArrowButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <S.Container className={className} onClick={handleClick} disabled={disabled}>
      <S.Icon>
        <img src={disabled ? ArrowLeftGray : ArrowLeftBlack} alt="Left Arrow" />
      </S.Icon>
    </S.Container>
  );
}