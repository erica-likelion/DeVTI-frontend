import * as S from './ClearMImgButton.styles';

interface ClearIconButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  imageSrc?: string; // 프로필 이미지 src 추가
}

export default function ClearIconButton({ className, onClick, disabled = false, imageSrc }: ClearIconButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <S.Container className={className} onClick={handleClick} disabled={disabled}>
      <S.Icon>
        <img src={imageSrc || "/DefaultIMG_Profile.webp"} alt="Profile" />
      </S.Icon>
    </S.Container>
  );
}