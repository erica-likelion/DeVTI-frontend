import * as S from './ClearMImgButton.styles';

interface ClearIconButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ClearIconButton({ className, onClick, disabled = false }: ClearIconButtonProps) {
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
    </S.Container>
  );
}