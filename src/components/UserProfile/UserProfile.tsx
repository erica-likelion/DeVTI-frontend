import { useNavigate } from "react-router-dom";
import ImageIcon from "@/assets/icons/Image.svg";
import { useAuthStore } from "@/stores/authStore";
import { useIsMobile } from "@/hooks/useMediaQuery";
import ClearMImgButton from "@/components/ButtonDynamic/ClearMImgButton";
import * as S from "./UserProfile.styles";

interface UserProfileProps {
  showTextOnMobile?: boolean;
  className?: string;
  variant?: "default" | "profile";
}

export default function UserProfile({
  showTextOnMobile = false,
  className,
  variant = "default",
}: UserProfileProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isMobile = useIsMobile();

  const handleClick = () => {
    navigate("/profile");
  };

  const renderProfileIcon = () => (
    <S.ProfileIconWrapper>
      {user?.profileImage ? (
        <S.ProfileImage src={user.profileImage} alt={user.name} />
      ) : (
        <S.DefaultProfileIcon>
          <img src={ImageIcon} alt="Profile" />
        </S.DefaultProfileIcon>
      )}
    </S.ProfileIconWrapper>
  );

  const renderUserName = () => (
    <S.UserName $showOnMobile={showTextOnMobile}>
      {user?.name || "사용자"}
    </S.UserName>
  );

  // Profile variant + Mobile = ClearMImgButton
  if (variant === "profile" && isMobile) {
    return (
      <ClearMImgButton
        className={className}
        onClick={handleClick}
        imageSrc={user?.profileImage || undefined}
      />
    );
  }

  // All other cases use the same structure
  return (
    <S.Container className={className} onClick={handleClick}>
      {renderProfileIcon()}
      {renderUserName()}
    </S.Container>
  );
}
