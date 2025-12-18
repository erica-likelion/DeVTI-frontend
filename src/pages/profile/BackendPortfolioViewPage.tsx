import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import BackendPortfolioView from "@/components/profile/BackendPortfolioView";
import * as S from "./ProfilePage.styles";
import InputField from "@/components/Input/InputField";
import BkMTextButton from "@/components/ButtonStatic/BkMTextButton";
import WtMIconButton from "@/components/ButtonStatic/WtMIconButton";
import WtLPawButton from "@/components/ButtonDynamic/WtLPawButton";
import DropBox from "@/components/DropBox";
import Modal from "@/components/modal/Modal";
import GroupIcon from "@/assets/icons/Group.svg";

const PART_OPTIONS = ["PM", "디자인", "프론트엔드", "백엔드"] as const;
type PartOption = (typeof PART_OPTIONS)[number];

interface LocationState {
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  selectedParts?: PartOption[];
  experienceSummary: string;
  strengths: string;
  github?: string;
  selectedTechs?: string[];
  techAssessments?: Record<string, Record<string, number>>;
  isNewcomer: boolean;
}

export default function BackendPortfolioViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: _user } = useAuthStore(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const state = location.state as LocationState | null;

  // state가 없으면 프로필 페이지로 리다이렉트
  if (!state) {
    navigate("/profile");
    return null;
  }

  // localStorage에서 백엔드 포트폴리오 데이터 가져오기
  const getStoredPortfolioData = (): LocationState | null => {
    try {
      const stored = localStorage.getItem('portfolio_백엔드');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  // state 또는 localStorage에서 데이터 가져오기
  const storedData = getStoredPortfolioData();
  const portfolioData = storedData || state;

  // 편집 모드 상태 관리
  const [profileImage, setProfileImage] = useState<string | null>(portfolioData.profileImage || null);
  const [name, setName] = useState<string>(portfolioData.name || "");
  const [intro, setIntro] = useState<string>(portfolioData.intro || "");
  const [dbtiInfo, setDbtiInfo] = useState<string | null>(portfolioData.dbtiInfo || null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedParts, setSelectedParts] = useState<PartOption[]>(portfolioData.selectedParts || ["백엔드"]);
  
  // 저장 버튼 활성화 조건: 이름, 한줄소개, DBTI가 모두 입력되어야 함
  const canSave = !!name.trim() && !!intro.trim() && !!dbtiInfo;
  const [activePart, setActivePart] = useState<PartOption | null>(null);
  const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
  const partSelectorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 백엔드 포트폴리오 데이터를 localStorage에 저장
  useEffect(() => {
    const backendData: LocationState = {
      name,
      intro,
      dbtiInfo,
      profileImage,
      selectedParts,
      experienceSummary: portfolioData.experienceSummary,
      strengths: portfolioData.strengths,
      github: portfolioData.github,
      selectedTechs: portfolioData.selectedTechs,
      techAssessments: portfolioData.techAssessments,
      isNewcomer: portfolioData.isNewcomer,
    };
    localStorage.setItem('portfolio_백엔드', JSON.stringify(backendData));
  }, [name, intro, dbtiInfo, profileImage, selectedParts, portfolioData.experienceSummary, portfolioData.strengths, portfolioData.github, portfolioData.selectedTechs, portfolioData.techAssessments, portfolioData.isNewcomer]);

  useEffect(() => {
    if (!isPartDropdownOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        partSelectorRef.current &&
        !partSelectorRef.current.contains(event.target as Node)
      ) {
        setIsPartDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPartDropdownOpen]);

  // 브라우저 뒤로가기 버튼 처리
  useEffect(() => {
    const handlePopState = () => {
      if (activePart !== null) {
        setActivePart(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [activePart]);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDBTIClick = () => {
    if (!dbtiInfo) {
      setDbtiInfo("test");
    } else {
      navigate("/profile/edit/dbti");
    }
  };

  const handleSave = () => {
    if (!canSave) return; // 조건 만족 전엔 절대 진행 안 함
    setIsSaveModalOpen(true);
  };

  const handleSaveModalClose = () => {
    setIsSaveModalOpen(false);
  };

  const handleSaveConfirm = () => {
    setIsSaveModalOpen(false);
    
    const backendData: LocationState = {
      name,
      intro,
      dbtiInfo,
      profileImage,
      selectedParts,
      experienceSummary: portfolioData.experienceSummary,
      strengths: portfolioData.strengths,
      github: portfolioData.github,
      selectedTechs: portfolioData.selectedTechs,
      techAssessments: portfolioData.techAssessments,
      isNewcomer: portfolioData.isNewcomer,
    };
    localStorage.setItem('portfolio_백엔드', JSON.stringify(backendData));
    
    navigate('/profile/Default', { 
      replace: false,
      state: {
        part: "백엔드" as const,
        ...backendData,
      }
    });
  };

  return (
    <>
      <Modal
        isOpen={isSaveModalOpen}
        onClose={handleSaveModalClose}
        onPrimary={handleSaveConfirm}
        buttonLabel="확인"
      >
        <div>프로필을 저장하시겠어요?</div>
        <div>저장 후, 작성한 프로필로 이동합니다.</div>
      </Modal>
      
      <S.EditWrapper>
      <S.EditContainer>
        <S.LeftPanel $hideOnMobile={activePart !== null}>
          <S.EditProfileSection>
            <S.EditProfileImageWrapper>
              {profileImage ? (
                <S.EditProfileImage src={profileImage} alt={name || "프로필"} />
              ) : (
                <S.EditProfileImagePlaceholder />
              )}
              <S.UploadButtonWrapper>
                <WtMIconButton onClick={handleImageUpload} disabled={false}>
                  <img src={GroupIcon} alt="Upload" />
                </WtMIconButton>
              </S.UploadButtonWrapper>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </S.EditProfileImageWrapper>

            <S.FormSection>
              <S.FormLabel>이름</S.FormLabel>
              <InputField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                icon={null}
              />
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>한 줄 소개</S.FormLabel>
              <InputField
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="미래 팀원들에게"
                icon={null}
              />
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>DBTI (프로젝트 성향 테스트)</S.FormLabel>
              <S.DBTIButtonWrapper>
                <WtLPawButton onClick={handleDBTIClick}>
                  테스트
                </WtLPawButton>
              </S.DBTIButtonWrapper>
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>파트</S.FormLabel>
              <S.PartSelectionWrapper>
              {selectedParts.map((part) => {
                const isRegisteredPart = activePart === null && part === "백엔드";
                return (
                  <S.PartButtonWrapper 
                    key={part} 
                    $isActive={activePart === part}
                    $isRegistered={isRegisteredPart}
                  >
                    <WtLPawButton
                      key={`${part}-${activePart}`}
                      onClick={() => {
                        if (part !== "백엔드") {
                          const partMap: Record<PartOption, string> = {
                            'PM': 'pm',
                            '디자인': 'design',
                            '프론트엔드': 'frontend',
                            '백엔드': 'backend'
                          };
                          const partSlug = partMap[part];
                          const getStoredPartData = (partName: string): any => {
                            try {
                              const stored = localStorage.getItem(`portfolio_${partName}`);
                              return stored ? JSON.parse(stored) : null;
                            } catch {
                              return null;
                            }
                          };

                          const partData = getStoredPartData(part === "디자인" ? "디자인" : part === "PM" ? "PM" : part === "프론트엔드" ? "프론트엔드" : part === "백엔드" ? "백엔드" : part);
                          
                          navigate(`/profile/${partSlug}/view`, {
                            replace: false,
                            state: {
                              name: portfolioData.name,
                              intro: portfolioData.intro,
                              dbtiInfo: portfolioData.dbtiInfo,
                              profileImage: portfolioData.profileImage,
                              selectedParts,
                              ...partData
                            }
                          });
                        } else {
                          setActivePart(part);
                          window.history.pushState({ part }, '', window.location.pathname);
                        }
                      }}
                      disabled={false}
                    >
                      {part}
                    </WtLPawButton>
                  </S.PartButtonWrapper>
                );
              })}
                <div ref={partSelectorRef}>
                  <DropBox
                    size="L"
                    value=""
                    placeholder="파트 추가"
                    isOpen={isPartDropdownOpen}
                    options={[...PART_OPTIONS]}
                    disabledOptions={selectedParts}
                    onClick={() => setIsPartDropdownOpen((prev) => !prev)}
                    onSelectOption={(option) => {
                      if (!selectedParts.includes(option as PartOption)) {
                        const selectedPart = option as PartOption;
                        const updatedSelectedParts = [...selectedParts, selectedPart];
                        setSelectedParts(updatedSelectedParts);
                        const partMap: Record<PartOption, string> = {
                          'PM': 'pm',
                          '디자인': 'design',
                          '프론트엔드': 'frontend',
                          '백엔드': 'backend'
                        };
                        const partSlug = partMap[selectedPart];
                        navigate(`/profile/edit/${partSlug}`, { 
                          replace: false,
                          state: {
                            selectedParts: updatedSelectedParts,
                            name,
                            intro,
                            dbtiInfo,
                            profileImage,
                          }
                        });
                      }
                      setIsPartDropdownOpen(false);
                    }}
                  />
                </div>
              </S.PartSelectionWrapper>
            </S.FormSection>

            <S.SaveButtonWrapper>
              <BkMTextButton onClick={handleSave} disabled={!canSave}>
                저장
              </BkMTextButton>
            </S.SaveButtonWrapper>
          </S.EditProfileSection>
        </S.LeftPanel>

        <S.RightPanel $hideOnMobile={activePart === null}>
          <BackendPortfolioView
            experienceSummary={portfolioData.experienceSummary}
            strengths={portfolioData.strengths}
            github={portfolioData.github}
            selectedTechs={portfolioData.selectedTechs}
            techAssessments={portfolioData.techAssessments}
            isNewcomer={portfolioData.isNewcomer}
            name={name}
            intro={intro}
            dbtiInfo={dbtiInfo}
            profileImage={profileImage}
            selectedParts={selectedParts}
          />
        </S.RightPanel>
      </S.EditContainer>
    </S.EditWrapper>
    </>
  );
}

