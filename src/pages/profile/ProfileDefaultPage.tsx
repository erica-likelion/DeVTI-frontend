import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import PMPortfolioView from "./components/PMPortfolioView";
import DesignPortfolioView from "./components/DesignPortfolioView";
import * as S from "./ProfilePage.styles";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "./components/BasePortfolioForm";

interface PortfolioData {
  part: "PM" | "디자인" | "프론트엔드" | "백엔드";
  experienceSummary: string;
  strengths: string;
  dailyAvailability?: DailyAvailabilityKey | null;
  weeklyAvailability?: WeeklyAvailabilityKey | null;
  designAssessment?: Record<string, number>;
  developmentAssessment?: Record<string, number>;
  designWorkFile?: string | null;
  figmaAssessment?: Record<string, number>;
  isNewcomer: boolean;
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
}

export default function ProfileDefaultPage() {
  const location = useLocation();
  const { user } = useAuthStore();
  
  // TODO: 실제로는 저장된 프로필 데이터를 가져와야 함
  // 현재는 location.state나 API에서 가져온 데이터를 사용
  const portfolioData = location.state as PortfolioData | null;

  // TODO: LeftPanel은 나중에 구현 예정
  // 현재는 RightPanel만 표시

  if (!portfolioData) {
    // 데이터가 없으면 기본 프로필 페이지로 리다이렉트
    // 또는 로딩 상태 표시
    return (
      <S.EditWrapper>
        <S.EditContainer>
          <S.RightPanel>
            <div>프로필 데이터를 불러오는 중...</div>
          </S.RightPanel>
        </S.EditContainer>
      </S.EditWrapper>
    );
  }

  const renderPortfolioView = () => {
    switch (portfolioData.part) {
      case "PM":
        return (
          <PMPortfolioView
            experienceSummary={portfolioData.experienceSummary}
            strengths={portfolioData.strengths}
            dailyAvailability={portfolioData.dailyAvailability || null}
            weeklyAvailability={portfolioData.weeklyAvailability || null}
            designAssessment={portfolioData.designAssessment || {}}
            developmentAssessment={portfolioData.developmentAssessment || {}}
            isNewcomer={portfolioData.isNewcomer}
            name={portfolioData.name || user?.name}
            intro={portfolioData.intro}
            dbtiInfo={portfolioData.dbtiInfo}
            profileImage={portfolioData.profileImage}
            showEditButtons={false} // Default 화면에서는 수정/삭제 버튼 숨김
          />
        );
      case "디자인":
        return (
          <DesignPortfolioView
            experienceSummary={portfolioData.experienceSummary}
            strengths={portfolioData.strengths}
            designWorkFile={portfolioData.designWorkFile || null}
            figmaAssessment={portfolioData.figmaAssessment || {}}
            isNewcomer={portfolioData.isNewcomer}
            name={portfolioData.name || user?.name}
            intro={portfolioData.intro}
            dbtiInfo={portfolioData.dbtiInfo}
            profileImage={portfolioData.profileImage}
            showEditButtons={false} // Default 화면에서는 수정/삭제 버튼 숨김
          />
        );
      case "프론트엔드":
      case "백엔드":
        // TODO: 프론트엔드/백엔드 포트폴리오 뷰 구현 후 추가
        return <div>{portfolioData.part} 포트폴리오 (구현 예정)</div>;
      default:
        return <div>포트폴리오를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <S.EditWrapper>
      <S.EditContainer>
        {/* TODO: LeftPanel은 나중에 구현 */}
        <S.RightPanel>
          {renderPortfolioView()}
        </S.RightPanel>
      </S.EditContainer>
    </S.EditWrapper>
  );
}

