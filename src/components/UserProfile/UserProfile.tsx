import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
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

  const handleClick = () => {
    navigate("/profile");
  };

  if (variant === "profile") {
    return (
      <S.ProfileContainer className={className} onClick={handleClick}>
        <S.ProfileIconWrapper>
          {user?.profileImage ? (
            <S.ProfileIconImage src={user.profileImage} alt={user.name} />
          ) : (
            <S.ProfileDefaultIcon>
              <img src="/IMG.svg" alt="Profile" />
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
