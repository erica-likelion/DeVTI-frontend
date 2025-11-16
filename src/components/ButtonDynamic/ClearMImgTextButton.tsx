import * as S from './ClearMImgTextButton.styles';

interface ClearButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ClearButton({ className, onClick, disabled = false }: ClearButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <S.Container className={className} onClick={handleClick} disabled={disabled}>
      <S.Icon>
        <img src="/DefaultIMG_Profile.webp" alt="Clear" />
      </S.Icon>
      Clear
    </S.Container>
  );
}