import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import PMPortfolioView from "@/components/profile/PMPortfolioView";
import DesignPortfolioView from "@/components/profile/DesignPortfolioView";
import FrontendPortfolioView from "@/components/profile/FrontendPortfolioView";
import BackendPortfolioView from "@/components/profile/BackendPortfolioView";
import PMPortfolioForm from "@/components/profile/PMPortfolioForm";
import DesignPortfolioForm from "@/components/profile/DesignPortfolioForm";
import FrontendPortfolioForm from "@/components/profile/FrontendPortfolioForm";
import BackendPortfolioForm from "@/components/profile/BackendPortfolioForm";
import DBTIResultPage from "./edit/DBTI/DBTIResultPage";
import * as S from "./ProfilePage.styles";
import BkMTextButton from "@/components/ButtonStatic/BkMTextButton";
import WtLPawButton from "@/components/ButtonDynamic/WtLPawButton";
import { useIsMobile } from "@/hooks/useMediaQuery";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "@/components/profile/BasePortfolioForm";
import { getProfile } from "@/services/profile";
import { FRONTEND_TECH_ITEMS_MAP } from "@/constants/profile/frontendAssessmentItems";
import { BACKEND_TECH_ITEMS_MAP } from "@/constants/profile/backendAssessmentItems";

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
  github?: string;
  selectedTechs?: string[];
  techAssessments?: Record<string, Record<string, number>>;
  isNewcomer: boolean;
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  selectedParts?: PartOption[];
  partProfiles?: Record<string, any>; // 서버에서 가져온 각 파트별 프로필 데이터
  commonProfile?: any; // 공통 프로필 데이터
}

export default function ProfileDefaultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isMobile = useIsMobile();
  const [showDBTIResult, setShowDBTIResult] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartOption | null>(null);
  const [showRightPanel, setShowRightPanel] = useState(false); // 모바일에서 right panel 표시 여부
  const [isEditMode, setIsEditMode] = useState<Record<PartOption, boolean>>({
    PM: false,
    디자인: false,
    프론트엔드: false,
    백엔드: false,
  }); // 각 파트별 수정 모드 상태
  
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
  const [name, setName] = useState(profileInfo.name);
  const [intro, setIntro] = useState(profileInfo.intro);
  const [dbtiInfo, setDbtiInfo] = useState(profileInfo.dbtiInfo);
  const [profileImage, setProfileImage] = useState(profileInfo.profileImage);
  // 서버에서 가져온 각 파트별 프로필 데이터 저장
  const [partProfiles, setPartProfiles] = useState<Record<string, any>>(
    portfolioData?.partProfiles || {}
  );
  
  // location.state에서 서버 데이터가 있으면 사용
  useEffect(() => {
    if (portfolioData?.partProfiles && portfolioData?.commonProfile) {
      setName(portfolioData.commonProfile.username || profileInfo.name);
      setIntro(portfolioData.commonProfile.comment || profileInfo.intro);
      setPartProfiles(portfolioData.partProfiles);
      
      // available_parts를 selectedParts에 반영
      if (portfolioData.commonProfile.available_parts && portfolioData.commonProfile.available_parts.length > 0) {
        const partMap: Record<string, PartOption> = {
          'PM': 'PM',
          'FE': '프론트엔드',
          'BE': '백엔드',
          'DE': '디자인'
        };
        const mappedParts = (portfolioData.commonProfile.available_parts as string[])
          .map((part: string) => partMap[part])
          .filter((part): part is PartOption => part !== undefined);
        if (mappedParts.length > 0) {
          setSelectedParts(mappedParts);
        }
      }
    }
  }, [portfolioData]);
  
  // 프로필 페이지 로드 시 API에서 프로필 데이터 가져오기 (location.state에 데이터가 없을 때만)
  useEffect(() => {
    if (portfolioData?.partProfiles) {
      // 이미 서버 데이터가 있으면 API 호출하지 않음
      return;
    }
    
    const loadProfile = async () => {
      try {
        // 공통 프로필 가져오기
        const commonProfileResult = await getProfile();
        if (commonProfileResult.success && commonProfileResult.data) {
          const profileData = commonProfileResult.data;
          setName(profileData.username || profileInfo.name);
          setIntro(profileData.comment || profileInfo.intro);
          // available_parts를 selectedParts에 반영
          if (profileData.available_parts && profileData.available_parts.length > 0) {
            const partMap: Record<string, PartOption> = {
              'PM': 'PM',
              'FE': '프론트엔드',
              'BE': '백엔드',
              'DE': '디자인'
            };
            const mappedParts = profileData.available_parts
              .map(part => partMap[part])
              .filter((part): part is PartOption => part !== undefined);
            if (mappedParts.length > 0) {
              setSelectedParts(mappedParts);
            }
            
            // available_parts의 각 파트별 프로필 가져오기
            const partProfilesData: Record<string, any> = {};
            for (const part of profileData.available_parts) {
              try {
                const partProfileResult = await getProfile(part);
                if (partProfileResult.success && partProfileResult.data) {
                  console.log(`${part} 프로필:`, partProfileResult.data);
                  partProfilesData[part] = partProfileResult.data;
                }
              } catch (error) {
                console.error(`${part} 프로필 로드 실패:`, error);
              }
            }
            setPartProfiles(partProfilesData);
          }
        }
      } catch (error) {
        console.error("프로필 로드 실패:", error);
      }
    };
    loadProfile();
  }, []); // 컴포넌트 마운트 시 한 번만 실행
  
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
    
    // 선택된 파트가 있으면 해당 파트의 수정 모드로 전환
    if (selectedPart) {
      setIsEditMode((prev) => ({
        ...prev,
        [selectedPart]: true,
      }));
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
  
  // @ts-ignore - 사용 예정
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // setIsPartDropdownOpen(false); // TODO: 구현 필요
  };

  // 서버 데이터를 View 컴포넌트 형식으로 변환하는 함수
  const convertServerDataToViewData = (part: PartOption, serverData: Record<string, any>) => {
    const reversePartMap: Record<PartOption, "PM" | "FE" | "BE" | "DE"> = {
      'PM': 'PM',
      '프론트엔드': 'FE',
      '백엔드': 'BE',
      '디자인': 'DE'
    };
    
    const serverPart = reversePartMap[part];
    const profile = serverData[serverPart];
    
    if (!profile) return null;
    
    switch (part) {
      case "PM":
        // DESIGN_ITEMS와 DEVELOPMENT_ITEMS의 key 목록 (PMPortfolioView와 동일)
        const DESIGN_ITEMS_KEYS = ["uxFlow", "visualStructure", "designIntent", "communication", "priority"];
        const DEVELOPMENT_ITEMS_KEYS = ["techStructure", "techContext", "executionSense", "devCommunication", "problemSolving"];
        
        // 서버에서 받은 평균 점수를 각 항목에 동일하게 할당
        const designAssessment: Record<string, number> = {};
        const developmentAssessment: Record<string, number> = {};
        
        if (profile.design_understanding !== undefined && profile.design_understanding !== null) {
          DESIGN_ITEMS_KEYS.forEach(key => {
            designAssessment[key] = profile.design_understanding;
          });
        }
        
        if (profile.development_understanding !== undefined && profile.development_understanding !== null) {
          DEVELOPMENT_ITEMS_KEYS.forEach(key => {
            developmentAssessment[key] = profile.development_understanding;
          });
        }
        
        return {
          experienceSummary: profile.experienced || "",
          strengths: profile.strength || "",
          dailyAvailability: profile.daily_time_capacity ? 
            (profile.daily_time_capacity <= 1 ? "under1h" as DailyAvailabilityKey : 
             profile.daily_time_capacity <= 3 ? "1to3h" as DailyAvailabilityKey : "over3h" as DailyAvailabilityKey) : null,
          weeklyAvailability: profile.weekly_time_capacity ? 
            (profile.weekly_time_capacity <= 10 ? "under10h" as WeeklyAvailabilityKey : 
             profile.weekly_time_capacity <= 20 ? "10to20h" as WeeklyAvailabilityKey : "over20h" as WeeklyAvailabilityKey) : null,
          designAssessment,
          developmentAssessment,
          isNewcomer: !profile.experienced || profile.experienced === "",
        };
      case "프론트엔드":
      case "백엔드":
        // development_score를 techAssessments 형식으로 변환
        const techAssessments: Record<string, Record<string, number>> = {};
        const selectedTechs: string[] = [];
        
        // 파트에 맞는 TECH_ITEMS_MAP 선택
        const TECH_ITEMS_MAP: Record<string, any[]> = part === "프론트엔드" ? FRONTEND_TECH_ITEMS_MAP : BACKEND_TECH_ITEMS_MAP;
        
        if (profile.development_score && Array.isArray(profile.development_score)) {
          profile.development_score.forEach(([tech, score]: [string, number]) => {
            selectedTechs.push(tech);
            
            // 해당 기술의 세부 항목들을 가져와서 평균 점수를 각 항목에 할당
            const techKey = tech as keyof typeof TECH_ITEMS_MAP;
            const items = TECH_ITEMS_MAP[techKey] as { key: string }[] | undefined;
            
            if (items && Array.isArray(items) && items.length > 0) {
              const assessment: Record<string, number> = {};
              items.forEach((item: { key: string }) => {
                assessment[item.key] = score; // 평균 점수를 각 세부 항목에 할당
              });
              techAssessments[tech] = assessment;
            } else {
              // 항목이 없으면 빈 객체로 설정
              techAssessments[tech] = {};
            }
          });
        }
        return {
          experienceSummary: profile.experienced || "",
          strengths: profile.strength || "",
          github: profile.github_url || "",
          selectedTechs,
          techAssessments,
          isNewcomer: !profile.experienced || profile.experienced === "",
        };
      case "디자인":
        // FIGMA_ITEMS의 key 목록 (DesignPortfolioView와 동일)
        const FIGMA_ITEMS_KEYS = ["uxPlanning", "designConsistency", "collaborationAttitude", "collaborationFeatures", "communicationClarity"];
        
        // 서버에서 받은 평균 점수를 각 항목에 동일하게 할당
        const figmaAssessment: Record<string, number> = {};
        
        if (profile.design_score !== undefined && profile.design_score !== null) {
          FIGMA_ITEMS_KEYS.forEach(key => {
            figmaAssessment[key] = profile.design_score;
          });
        }
        
        return {
          experienceSummary: profile.experienced || "",
          strengths: profile.strength || "",
          designWorkFile: profile.portfolio_url || null,
          figmaAssessment,
          isNewcomer: !profile.experienced || profile.experienced === "",
        };
      default:
        return null;
    }
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

    // 서버 데이터가 있으면 우선 사용, 없으면 localStorage에서 가져오기
    let partData = null;
    if (Object.keys(partProfiles).length > 0) {
      const convertedData = convertServerDataToViewData(selectedPart, partProfiles);
      if (convertedData) {
        partData = {
          ...convertedData,
          name: name,
          intro: intro,
          dbtiInfo: dbtiInfo,
          profileImage: profileImage,
        };
      }
    }
    
    // 서버 데이터가 없으면 localStorage에서 가져오기
    if (!partData) {
      partData = getStoredPortfolioData(selectedPart);
    }

    if (!partData) {
      return <div>{selectedPart} 포트폴리오 데이터를 찾을 수 없습니다.</div>;
    }

    // 수정 모드인 경우 Form 컴포넌트 표시
    if (selectedPart && isEditMode[selectedPart]) {
      switch (selectedPart) {
        case "PM":
          return (
            <PMPortfolioForm
              name={name}
              intro={intro}
              dbtiInfo={dbtiInfo}
              profileImage={profileImage}
              selectedParts={selectedParts}
              portfolioData={{
                experienceSummary: partData.experienceSummary || "",
                strengths: partData.strengths || "",
                dailyAvailability: partData.dailyAvailability || null,
                weeklyAvailability: partData.weeklyAvailability || null,
                designAssessment: partData.designAssessment || {},
                developmentAssessment: partData.developmentAssessment || {},
                isNewcomer: partData.isNewcomer || false,
              }}
              onRegister={() => {
                setIsEditMode((prev) => ({
                  ...prev,
                  [selectedPart]: false,
                }));
                return selectedParts;
              }}
            />
          );
        case "디자인":
          return (
            <DesignPortfolioForm
              name={name}
              intro={intro}
              dbtiInfo={dbtiInfo}
              profileImage={profileImage}
              selectedParts={selectedParts}
              portfolioData={{
                experienceSummary: partData.experienceSummary || "",
                strengths: partData.strengths || "",
                designWorkFile: partData.designWorkFile || null,
                figmaAssessment: partData.figmaAssessment || {},
                isNewcomer: partData.isNewcomer || false,
              }}
              onRegister={() => {
                setIsEditMode((prev) => ({
                  ...prev,
                  [selectedPart]: false,
                }));
                return selectedParts;
              }}
            />
          );
        case "프론트엔드":
          return (
            <FrontendPortfolioForm
              name={name}
              intro={intro}
              dbtiInfo={dbtiInfo}
              profileImage={profileImage}
              selectedParts={selectedParts}
              portfolioData={{
                experienceSummary: partData.experienceSummary || "",
                strengths: partData.strengths || "",
                github: partData.github || "",
                selectedTechs: partData.selectedTechs || [],
                techAssessments: partData.techAssessments || {},
                isNewcomer: partData.isNewcomer || false,
              }}
              onRegister={() => {
                setIsEditMode((prev) => ({
                  ...prev,
                  [selectedPart]: false,
                }));
                return selectedParts;
              }}
            />
          );
        case "백엔드":
          return (
            <BackendPortfolioForm
              name={name}
              intro={intro}
              dbtiInfo={dbtiInfo}
              profileImage={profileImage}
              selectedParts={selectedParts}
              portfolioData={{
                experienceSummary: partData.experienceSummary || "",
                strengths: partData.strengths || "",
                github: partData.github || "",
                selectedTechs: partData.selectedTechs || [],
                techAssessments: partData.techAssessments || {},
                isNewcomer: partData.isNewcomer || false,
              }}
              onRegister={() => {
                setIsEditMode((prev) => ({
                  ...prev,
                  [selectedPart]: false,
                }));
                return selectedParts;
              }}
            />
          );
        default:
          return null;
      }
    }

    // View 모드인 경우 View 컴포넌트 표시
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
        return (
          <FrontendPortfolioView
            experienceSummary={partData.experienceSummary || ""}
            strengths={partData.strengths || ""}
            github={partData.github || ""}
            selectedTechs={partData.selectedTechs || []}
            techAssessments={partData.techAssessments || {}}
            isNewcomer={partData.isNewcomer || false}
            name={partData.name || user?.name}
            intro={partData.intro || ""}
            dbtiInfo={partData.dbtiInfo || null}
            profileImage={partData.profileImage || null}
            showEditButtons={false}
            onBack={isMobile ? handleBackClick : undefined}
          />
        );
      case "백엔드":
        return (
          <BackendPortfolioView
            experienceSummary={partData.experienceSummary || ""}
            strengths={partData.strengths || ""}
            github={partData.github || ""}
            selectedTechs={partData.selectedTechs || []}
            techAssessments={partData.techAssessments || {}}
            isNewcomer={partData.isNewcomer || false}
            name={partData.name || user?.name}
            intro={partData.intro || ""}
            dbtiInfo={partData.dbtiInfo || null}
            profileImage={partData.profileImage || null}
            showEditButtons={false}
            onBack={isMobile ? handleBackClick : undefined}
          />
        );
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

