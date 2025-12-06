import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import PMPortfolioView from "@/components/profile/PMPortfolioView";
import DesignPortfolioView from "@/components/profile/DesignPortfolioView";
import DBTIResultPage from "./edit/DBTI/DBTIResultPage";
import * as S from "./ProfilePage.styles";
import BkMTextButton from "@/components/ButtonStatic/BkMTextButton";
import WtLPawButton from "@/components/ButtonDynamic/WtLPawButton";
import { useIsMobile } from "@/hooks/useMediaQuery";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "@/components/profile/BasePortfolioForm";

const PART_OPTIONS = ["PM", "디자인", "프론트엔드", "백엔드"] as const;
type PartOption = (typeof PART_OPTIONS)[number];

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
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isMobile = useIsMobile();
  const [showDBTIResult, setShowDBTIResult] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartOption | null>(null);
  const [showRightPanel, setShowRightPanel] = useState(false); // 모바일에서 right panel 표시 여부
  
  // localStorage에서 저장된 모든 파트의 포트폴리오 데이터 가져오기
  const getStoredPortfolioData = (partName: string): any => {
    try {
      const stored = localStorage.getItem(`portfolio_${partName}`);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  // 저장된 모든 파트 찾기
  const getSavedParts = (): PartOption[] => {
    const savedParts: PartOption[] = [];
    PART_OPTIONS.forEach((part) => {
      const data = getStoredPortfolioData(part);
      if (data && (data.experienceSummary || data.strengths)) {
        savedParts.push(part);
      }
    });
    return savedParts;
  };

  // location.state에서 데이터 가져오기 (저장 후 돌아올 때)
  const portfolioData = location.state as PortfolioData | null;
  
  // 저장된 모든 파트로 초기화
  const [selectedParts, setSelectedParts] = useState<PartOption[]>(() => {
    if (portfolioData?.selectedParts) {
      return portfolioData.selectedParts;
    }
    return getSavedParts();
  });

  // 프로필 정보 가져오기 (location.state 또는 localStorage에서)
  const getProfileInfo = () => {
    if (portfolioData) {
      return {
        name: portfolioData.name || user?.name || "",
        intro: portfolioData.intro || "",
        dbtiInfo: portfolioData.dbtiInfo || null,
        profileImage: portfolioData.profileImage || user?.profileImage || null,
      };
    }
    // localStorage에서 첫 번째 저장된 파트의 프로필 정보 가져오기
    const savedParts = getSavedParts();
    const firstPart = savedParts[0];
    if (firstPart) {
      const data = getStoredPortfolioData(firstPart);
      if (data) {
        return {
          name: data.name || user?.name || "",
          intro: data.intro || "",
          dbtiInfo: data.dbtiInfo || null,
          profileImage: data.profileImage || user?.profileImage || null,
        };
      }
    }
    return {
      name: user?.name || "",
      intro: "",
      dbtiInfo: null,
      profileImage: user?.profileImage || null,
    };
  };

  const profileInfo = getProfileInfo();
  const name = profileInfo.name;
  const intro = profileInfo.intro;
  const dbtiInfo = profileInfo.dbtiInfo;
  const profileImage = profileInfo.profileImage;
  
  // 초기 선택된 파트 설정 (저장된 첫 번째 파트 또는 location.state의 파트)
  useEffect(() => {
    if (selectedPart === null) {
      if (portfolioData?.part) {
        setSelectedPart(portfolioData.part);
      } else {
        const savedParts = getSavedParts();
        if (savedParts.length > 0) {
          setSelectedPart(savedParts[0]);
        }
      }
    }
  }, [portfolioData]);
  

  const handleEditClick = () => {
    // DBTI 결과가 표시되고 있으면 DBTI edit 페이지로 이동
    if (showDBTIResult) {
      navigate('/profile/edit/dbti');
      return;
    }
    
    // 선택된 파트가 있으면 해당 파트의 view 페이지로 이동 (수정/삭제 버튼이 있는 상태)
    if (selectedPart) {
      const partMap: Record<PartOption, string> = {
        'PM': 'pm',
        '디자인': 'design',
        '프론트엔드': 'frontend',
        '백엔드': 'backend'
      };
      const partSlug = partMap[selectedPart];
      
      // localStorage에서 해당 파트의 포트폴리오 데이터 가져오기
      const partData = getStoredPortfolioData(selectedPart);
      
      if (partData) {
        // 저장된 데이터와 함께 view 페이지로 이동
        navigate(`/profile/${partSlug}/view`, {
          state: {
            ...partData,
            part: selectedPart,
            selectedParts: selectedParts
          }
        });
      } else {
        // 데이터가 없으면 edit 페이지로 이동
        navigate(`/profile/edit/${partSlug}`);
      }
      return;
    }
    
    // 아무것도 선택되지 않았으면 기본 edit 페이지로 이동
    navigate('/profile/edit');
  };

  const handleDBTIClick = () => {
    // DBTI 결과를 right panel에 표시
    setShowDBTIResult(true);
    // 파트 선택 해제 (파트 버튼 비활성화)
    setSelectedPart(null);
    // 모바일에서 right panel 표시 및 브라우저 히스토리에 상태 추가
    if (isMobile) {
      setShowRightPanel(true);
      // 브라우저 히스토리에 상태 추가 (뒤로가기 처리용)
      window.history.pushState({ showRightPanel: true, showDBTIResult: true }, '');
    }
  };

  const handlePartClick = (part: PartOption) => {
    // DBTI 결과 화면이 열려있으면 닫기
    setShowDBTIResult(false);
    // 선택된 파트 변경
    setSelectedPart(part);
    // 모바일에서 right panel 표시 및 브라우저 히스토리에 상태 추가
    if (isMobile) {
      setShowRightPanel(true);
      // 브라우저 히스토리에 상태 추가 (뒤로가기 처리용)
      window.history.pushState({ showRightPanel: true, selectedPart: part }, '');
    }
  };

  const handleBackClick = () => {
    // 모바일에서 left panel로 돌아가기
    if (isMobile) {
      setShowRightPanel(false);
      setShowDBTIResult(false);
      setSelectedPart(null);
      // 브라우저 히스토리에서 뒤로가기
      window.history.back();
    }
  };

  // 브라우저 뒤로가기 처리
  useEffect(() => {
    if (!isMobile) return;

    const handlePopState = (event: PopStateEvent) => {
      // 브라우저 뒤로가기 시 left panel로 돌아가기
      if (event.state === null || !event.state.showRightPanel) {
        setShowRightPanel(false);
        setShowDBTIResult(false);
        setSelectedPart(null);
      } else {
        // forward 시 right panel 표시
        setShowRightPanel(true);
        if (event.state.showDBTIResult) {
          setShowDBTIResult(true);
          setSelectedPart(null);
        } else if (event.state.selectedPart) {
          setShowDBTIResult(false);
          setSelectedPart(event.state.selectedPart);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isMobile]);
  
  const handlePartAdd = (option: string) => {
    const selectedPart = option as PartOption;
    if (!selectedParts.includes(selectedPart)) {
      setSelectedParts((prev) => [...prev, selectedPart]);
      // 파트 추가 시 해당 파트의 edit 페이지로 이동
      const partMap: Record<PartOption, string> = {
        'PM': 'pm',
        '디자인': 'design',
        '프론트엔드': 'frontend',
        '백엔드': 'backend'
      };
      const partSlug = partMap[selectedPart];
      navigate(`/profile/edit/${partSlug}`, { replace: false });
    }
    setIsPartDropdownOpen(false);
  };

  const renderPortfolioView = () => {
    // DBTI 결과를 표시해야 하는 경우
    if (showDBTIResult) {
      return <DBTIResultPage hideRetakeButton={true} isInDefaultPage={true} />;
    }

    // 선택된 파트가 없으면 아무것도 표시하지 않음
    if (!selectedPart) {
      return <div>파트를 선택해주세요.</div>;
    }

    // localStorage에서 선택된 파트의 포트폴리오 데이터 가져오기
    const partData = getStoredPortfolioData(selectedPart);

    if (!partData) {
      return <div>{selectedPart} 포트폴리오 데이터를 찾을 수 없습니다.</div>;
    }

    switch (selectedPart) {
      case "PM":
        return (
          <PMPortfolioView
            experienceSummary={partData.experienceSummary || ""}
            strengths={partData.strengths || ""}
            dailyAvailability={partData.dailyAvailability || null}
            weeklyAvailability={partData.weeklyAvailability || null}
            designAssessment={partData.designAssessment || {}}
            developmentAssessment={partData.developmentAssessment || {}}
            isNewcomer={partData.isNewcomer || false}
            name={partData.name || user?.name}
            intro={partData.intro || ""}
            dbtiInfo={partData.dbtiInfo || null}
            profileImage={partData.profileImage || null}
            showEditButtons={false} // Default 화면에서는 수정/삭제 버튼 숨김
            onBack={isMobile ? handleBackClick : undefined}
          />
        );
      case "디자인":
        return (
          <DesignPortfolioView
            experienceSummary={partData.experienceSummary || ""}
            strengths={partData.strengths || ""}
            designWorkFile={partData.designWorkFile || null}
            figmaAssessment={partData.figmaAssessment || {}}
            isNewcomer={partData.isNewcomer || false}
            name={partData.name || user?.name}
            intro={partData.intro || ""}
            dbtiInfo={partData.dbtiInfo || null}
            profileImage={partData.profileImage || null}
            showEditButtons={false} // Default 화면에서는 수정/삭제 버튼 숨김
            onBack={isMobile ? handleBackClick : undefined}
          />
        );
      case "프론트엔드":
      case "백엔드":
        // TODO: 프론트엔드/백엔드 포트폴리오 뷰 구현 후 추가
        return <div>{selectedPart} 포트폴리오 (구현 예정)</div>;
      default:
        return <div>포트폴리오를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <S.EditWrapper>
      <S.EditContainer>
        {/* 모바일에서 right panel이 보이지 않을 때만 left panel 표시 */}
        {(!isMobile || !showRightPanel) && (
          <S.DefaultLeftPanel>
            <S.EditProfileSection>
              {/* Info Section */}
              <S.DefaultInfoSection>
                {/* 프로필사진 */}
                <S.EditProfileImageWrapper $isInDefaultPage={true}>
                  {profileImage ? (
                    <S.EditProfileImage src={profileImage} alt={name || "프로필"} />
                  ) : (
                    <S.EditProfileImagePlaceholder />
                  )}
                </S.EditProfileImageWrapper>

                {/* Text Frame (사용자이름+한줄소개) */}
                <S.DefaultTextFrame>
                  <S.DefaultUserName>{name || "사용자"}</S.DefaultUserName>
                  <S.DefaultIntro>{intro || ""}</S.DefaultIntro>
                </S.DefaultTextFrame>

                {/* DBTI Frame */}
                <S.DefaultDBTIFrame>
                  <S.DefaultDBTITitle>DBTI (프로젝트 성향 테스트)</S.DefaultDBTITitle>
                  <WtLPawButton 
                    onClick={handleDBTIClick}
                    isActive={showDBTIResult}
                  >
                    {dbtiInfo || "테스트"}
                  </WtLPawButton>
                </S.DefaultDBTIFrame>

                {/* Part Frame */}
                <S.DefaultPartFrame>
                  <S.DefaultPartTitle>파트</S.DefaultPartTitle>
                  {selectedParts.map((part) => {
                    const isActive = !showDBTIResult && selectedPart === part && selectedPart !== null;
                    return (
                      <WtLPawButton
                        key={part}
                        onClick={() => handlePartClick(part)}
                        hideIcon={true}
                        isActive={isActive}
                      >
                        {part}
                      </WtLPawButton>
                    );
                  })}
                </S.DefaultPartFrame>
              </S.DefaultInfoSection>

              {/* 수정 버튼 */}
              <S.DefaultEditButtonWrapper>
                <BkMTextButton onClick={handleEditClick}>
                  수정
                </BkMTextButton>
              </S.DefaultEditButtonWrapper>
            </S.EditProfileSection>
          </S.DefaultLeftPanel>
        )}

        {/* 모바일이 아니거나, 모바일에서 right panel이 보여야 할 때만 right panel 표시 */}
        {(!isMobile || showRightPanel) && (
          <S.RightPanel>
            {renderPortfolioView()}
          </S.RightPanel>
        )}
      </S.EditContainer>
    </S.EditWrapper>
  );
}

