import { useNavigate } from "react-router-dom";
import ImageIcon from "@/assets/icons/Image.svg";
import { useAuthStore } from "@/stores/authStore";
import { useIsMobile } from "@/hooks/useMediaQuery";
import ClearMImgButton from "@/components/ButtonDynamic/ClearMImgButton";
import { getProfile } from "@/services/profile";
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

  const handleClick = async () => {
    try {
      // 프로필 등록 여부 확인
      const profileResult = await getProfile();
      
      if (profileResult.success && profileResult.data) {
        // 프로필이 등록되어 있으면 default 페이지로 이동
        navigate("/profile/default");
      } else {
        // 프로필이 등록되지 않았으면 프로필 등록 페이지로 이동
        navigate("/profile");
      }
    } catch (error) {
      console.error("프로필 확인 실패:", error);
      // 에러 발생 시 기본적으로 프로필 등록 페이지로 이동
      navigate("/profile");
    }
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
