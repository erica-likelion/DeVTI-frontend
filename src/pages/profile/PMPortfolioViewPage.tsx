import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import PMPortfolioView from "./components/PMPortfolioView";
import * as S from "./ProfilePage.styles";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "./components/BasePortfolioForm";

interface LocationState {
  experienceSummary: string;
  strengths: string;
  dailyAvailability: DailyAvailabilityKey | null;
  weeklyAvailability: WeeklyAvailabilityKey | null;
  designAssessment: Record<string, number>;
  developmentAssessment: Record<string, number>;
  isNewcomer: boolean;
}

export default function PMPortfolioViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const state = location.state as LocationState | null;

  // state가 없으면 프로필 페이지로 리다이렉트
  if (!state) {
    navigate("/profile");
    return null;
  }

  return (
    <S.EditWrapper>
      <S.EditContainer>
        <S.LeftPanel>
          <S.EditProfileSection>
            <S.EditProfileImageWrapper>
              {user?.profileImage ? (
                <S.EditProfileImage src={user.profileImage} alt={user.name} />
              ) : (
                <S.EditProfileImagePlaceholder />
              )}
            </S.EditProfileImageWrapper>

            <S.FormSection>
              <S.FormLabel>이름</S.FormLabel>
              <S.ReadOnlyText>{user?.name || "사용자"}</S.ReadOnlyText>
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>한 줄 소개</S.FormLabel>
              <S.ReadOnlyText>{user?.intro || "-"}</S.ReadOnlyText>
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>DBTI (프로젝트 성향 테스트)</S.FormLabel>
              <S.ReadOnlyText>{user?.dbti || "-"}</S.ReadOnlyText>
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>파트</S.FormLabel>
              <S.PartSelectionWrapper>
                <S.PartButtonWrapper $isActive={true}>
                  <S.ReadOnlyPartButton>PM</S.ReadOnlyPartButton>
                </S.PartButtonWrapper>
              </S.PartSelectionWrapper>
            </S.FormSection>
          </S.EditProfileSection>
        </S.LeftPanel>

        <S.RightPanel>
          <PMPortfolioView
            experienceSummary={state.experienceSummary}
            strengths={state.strengths}
            dailyAvailability={state.dailyAvailability}
            weeklyAvailability={state.weeklyAvailability}
            designAssessment={state.designAssessment}
            developmentAssessment={state.developmentAssessment}
            isNewcomer={state.isNewcomer}
          />
        </S.RightPanel>
      </S.EditContainer>
    </S.EditWrapper>
  );
}

