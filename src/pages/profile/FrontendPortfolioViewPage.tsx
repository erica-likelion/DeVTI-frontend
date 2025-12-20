import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { getDBTIResult } from '@/constants/DBTIResults';
import { getProfile, updateProfile } from '@/services/profile';
import FrontendPortfolioView from "@/components/profile/FrontendPortfolioView";
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

export default function FrontendPortfolioViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: _user } = useAuthStore(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const state = location.state as LocationState | null;

  // state가 없으면 프로필 페이지로 리다이렉트
  if (!state) {
    navigate("/profile");
    return null;
  }

  // DBTI 결과 가져오기
  const userDBTIResult = _user?.dbti ? getDBTIResult(_user.dbti) : null;

  // state에서 데이터 가져오기
  const portfolioData = state;

  // 편집 모드 상태 관리
  const [profileImage, setProfileImage] = useState<string | null>(portfolioData.profileImage || null);
  const [name, setName] = useState<string>(portfolioData.name || "");
  const [intro, setIntro] = useState<string>(portfolioData.intro || "");
  const [dbtiInfo, setDbtiInfo] = useState<string | null>(portfolioData.dbtiInfo || null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedParts, setSelectedParts] = useState<PartOption[]>(portfolioData.selectedParts || ["프론트엔드"]);
  
  // 저장 버튼 활성화 조건: 이름, 한줄소개, DBTI가 모두 입력되어야 함
  const canSave = !!name.trim() && !!intro.trim() && !!dbtiInfo;
  const [activePart, setActivePart] = useState<PartOption | null>(null);
  const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
  const partSelectorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 서버에서 프로필 데이터 로딩
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // 공통 프로필 조회
        const commonProfileResult = await getProfile();
        if (commonProfileResult.success && commonProfileResult.data) {
          const data = commonProfileResult.data;
          setName(data.username || "");
          setIntro(data.comment || "");
          setDbtiInfo(data.devti || null);
        }

        // 프론트엔드 파트 프로필 조회
        const frontendProfileResult = await getProfile("FE");
        if (frontendProfileResult.success) {
        } else {
        }
      } catch (error) {
        console.error("프로필 로딩 실패:", error);
      }
    };

    // state가 없을 때만 API에서 로딩
    if (!state) {
      loadProfile();
    }
  }, [state]);

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
    navigate("/profile/edit/dbti");
  };

  const handleSave = () => {
    if (!canSave) return; // 조건 만족 전엔 절대 진행 안 함
    setIsSaveModalOpen(true);
  };

  const handleSaveModalClose = () => {
    setIsSaveModalOpen(false);
  };

  const handleSaveConfirm = async () => {
    setIsSaveModalOpen(false);
    
    try {
      // 공통 프로필 업데이트
      const commonProfileResult = await updateProfile({
        username: name,
        comment: intro,
      });
      
      if (!commonProfileResult.success) {
        console.error("공통 프로필 저장 실패:", commonProfileResult.error);
        return;
      }

      // 프론트엔드 파트 프로필 업데이트 (FormData 사용)
      const formData = new FormData();
      formData.append('experienced', portfolioData.isNewcomer ? '' : portfolioData.experienceSummary);
      formData.append('strength', portfolioData.strengths);
      
      if (portfolioData.github) {
        formData.append('github_url', portfolioData.github);
      }
      
      if (portfolioData.techAssessments && portfolioData.selectedTechs) {
        // 기술별 점수 평균을 계산하여 development_score 형식으로 변환
        const techScores = portfolioData.selectedTechs.map((tech: string) => {
          const techAssessment = portfolioData.techAssessments![tech];
          if (techAssessment && Object.keys(techAssessment).length > 0) {
            const scores = Object.values(techAssessment);
            const avgScore = scores.reduce((sum: number, score: number) => sum + score, 0) / scores.length;
            return [tech, avgScore];
          }
          return [tech, 0];
        });
        formData.append('development_score', JSON.stringify(techScores));
      }

      const frontendProfileResult = await updateProfile(formData, "FE");
      
      if (!frontendProfileResult.success) {
        console.error("프론트엔드 프로필 저장 실패:", frontendProfileResult.error);
        return;
      }
      
      // 저장 성공 시 프로필 Default 페이지로 이동
      navigate('/profile/Default', { 
        replace: false,
        state: {
          part: "프론트엔드" as const,
          experienceSummary: portfolioData.experienceSummary,
          strengths: portfolioData.strengths,
          github: portfolioData.github || "",
          selectedTechs: portfolioData.selectedTechs || [],
          techAssessments: portfolioData.techAssessments || {},
          isNewcomer: portfolioData.isNewcomer,
          name,
          intro,
          dbtiInfo,
          profileImage,
          selectedParts,
        }
      });
    } catch (error) {
      console.error("프로필 저장 중 오류:", error);
    }
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
                <WtLPawButton onClick={handleDBTIClick} isActive={!!userDBTIResult}>
                  {userDBTIResult ? userDBTIResult.name.split(', ')[1] || userDBTIResult.name : '테스트'}
                </WtLPawButton>
              </S.DBTIButtonWrapper>
            </S.FormSection>

            <S.FormSection>
              <S.FormLabel>파트</S.FormLabel>
              <S.PartSelectionWrapper>
              {selectedParts.map((part) => {
                const isRegisteredPart = activePart === null && part === "프론트엔드";
                return (
                  <S.PartButtonWrapper 
                    key={part} 
                    $isActive={activePart === part}
                    $isRegistered={isRegisteredPart}
                  >
                    <WtLPawButton
                      key={`${part}-${activePart}`}
                      onClick={() => {
                        if (part !== "프론트엔드") {
                          const partMap: Record<PartOption, string> = {
                            'PM': 'pm',
                            '디자인': 'design',
                            '프론트엔드': 'frontend',
                            '백엔드': 'backend'
                          };
                          const partSlug = partMap[part];
                          // 다른 파트로 이동할 때는 기본값으로 이동 (API에서 로딩)
                          const partData = null;
                          
                          navigate(`/profile/${partSlug}/view`, {
                            replace: false,
                            state: {
                              name: portfolioData.name,
                              intro: portfolioData.intro,
                              dbtiInfo: portfolioData.dbtiInfo,
                              profileImage: portfolioData.profileImage,
                              selectedParts,
                              ...(partData || {})
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
          <FrontendPortfolioView
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

