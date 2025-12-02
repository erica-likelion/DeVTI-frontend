import { useNavigate } from "react-router-dom";
import ImageIcon from "@/assets/icons/Image.svg";
import { useAuthStore } from "@/stores/authStore";
import { useIsMobile } from "@/hooks/useMediaQuery";
import ClearMImgButton from "@/components/ButtonDynamic/ClearMImgButton";
import * as S from "./UserProfile.styles";

interface UserProfileProps {
  showTextOnMobile?: boolean;
  className?: string;
  variant?: "default" | "profile"; // Added variant prop
}

export default function UserProfile({
  showTextOnMobile = false,
  className,
  variant = "default", // Default variant
}: UserProfileProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isMobile = useIsMobile();

  const handleClick = () => {
    navigate("/profile");
  };

  if (variant === "profile") {
    // 모바일일 때는 ClearMImgButton 사용하고 사용자 이름 숨김
    if (isMobile) {
      return (
        <ClearMImgButton
          className={className}
          onClick={handleClick}
          imageSrc={user?.profileImage || undefined}
        />
      );
    }
    
    // 데스크탑일 때는 기존대로
    return (
      <S.ProfileContainer className={className} onClick={handleClick}>
        <S.ProfileIconWrapper>
          {user?.profileImage ? (
            <S.ProfileIconImage src={user.profileImage} alt={user.name} />
          ) : (
            <S.ProfileDefaultIcon>
              <img src={ImageIcon} alt="Profile" />
            </S.ProfileDefaultIcon>
          )}
        </S.ProfileIconWrapper>
        <S.ProfileUserName>{user?.name || "사용자"}</S.ProfileUserName>
      </S.ProfileContainer>
    );
  }

  return (
    <S.Container className={className} onClick={handleClick}>
      {user?.profileImage ? (
        <S.ProfileImage src={user.profileImage} alt={user.name} />
      ) : (
        <S.DefaultProfileIcon />
      )}
      <S.UserName $showOnMobile={showTextOnMobile}>
        {user?.name || "사용자"}
      </S.UserName>
    </S.Container>
  );
}
