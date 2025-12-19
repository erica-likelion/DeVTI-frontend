import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import * as S from "./ProfilePage.styles";
import PMPortfolioForm from "@/components/profile/PMPortfolioForm";
import { getProfile } from "@/services/profile";
import DesignPortfolioForm from "@/components/profile/DesignPortfolioForm";
import FrontendPortfolioForm from "@/components/profile/FrontendPortfolioForm";
import BackendPortfolioForm from "@/components/profile/BackendPortfolioForm";
import BkLTextButton from "@/components/ButtonStatic/BkLTextButton";
import BkMTextButton from "@/components/ButtonStatic/BkMTextButton";
import WtMIconButton from "@/components/ButtonStatic/WtMIconButton";
import InputField from "@/components/Input/InputField";
import WtLPawButton from "@/components/ButtonDynamic/WtLPawButton";
import DropBox from "@/components/DropBox";
import Modal from "@/components/modal/Modal";
import GroupIcon from "@/assets/icons/Group.svg";

const PART_OPTIONS = ["PM", "디자인", "프론트엔드", "백엔드"] as const;
type PartOption = (typeof PART_OPTIONS)[number];

// URL slug를 PartOption으로 변환하는 맵 (컴포넌트 외부로 이동)
const slugToPart: Record<string, PartOption> = {
  'pm': 'PM',
  'design': '디자인',
  'frontend': '프론트엔드',
  'backend': '백엔드'
};

interface PortfolioState {
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  part?: PartOption; // 등록 버튼 클릭 시 전달되는 파트 정보
  selectedParts?: PartOption[]; // view 페이지에서 전달되는 선택된 파트 목록
  experienceSummary?: string;
  strengths?: string;
  dailyAvailability?: any;
  weeklyAvailability?: any;
  designAssessment?: Record<string, number>;
  developmentAssessment?: Record<string, number>;
  designWorkFile?: string | null; // 디자인 포트폴리오용
  figmaAssessment?: Record<string, number>; // 디자인 포트폴리오용
  github?: string; // 프론트엔드/백엔드 포트폴리오용
  selectedTechs?: string[]; // 프론트엔드/백엔드 포트폴리오용
  techAssessments?: Record<string, Record<string, number>>; // 프론트엔드/백엔드 포트폴리오용
  isNewcomer?: boolean;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const portfolioState = location.state as PortfolioState | null;
  
  // URL에서 상태 복원
  const isEditMode = location.pathname.startsWith('/profile/edit');
  const pathPart = location.pathname.split('/').pop();
  const partFromUrl = pathPart && slugToPart[pathPart] ? slugToPart[pathPart] : null;
  
  const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
  const [selectedParts, setSelectedParts] = useState<PartOption[]>(
    portfolioState?.selectedParts || (partFromUrl ? [partFromUrl] : [])
  );
  const [activePart, setActivePart] = useState<PartOption | null>(partFromUrl);
  const [isEditModeFromView, setIsEditModeFromView] = useState(!!portfolioState); // 수정 버튼을 통해 들어온 경우 추적
  
  // URL 변경 시 activePart와 selectedParts 업데이트
  useEffect(() => {
    const currentPathPart = location.pathname.split('/').pop();
    const currentPartFromUrl = currentPathPart && slugToPart[currentPathPart] ? slugToPart[currentPathPart] : null;
    const currentPortfolioState = location.state as PortfolioState | null;
    
    // portfolioState가 있으면 수정 모드로 표시
    setIsEditModeFromView(!!currentPortfolioState);
    
    
    // location.state에서 selectedParts가 있으면 사용
    if (currentPortfolioState?.selectedParts) {
      setSelectedParts(currentPortfolioState.selectedParts);
    }
    
    if (currentPartFromUrl) {
      setActivePart(currentPartFromUrl);
      // URL에 파트가 있으면 selectedParts에 포함 (수정 모드에서도 파트 선택 유지)
      setSelectedParts((prev) => {
        if (!prev.includes(currentPartFromUrl)) {
          return [...prev, currentPartFromUrl];
        }
        return prev;
      });
    } else if (location.pathname.startsWith('/profile/edit') && (currentPathPart === 'edit' || !currentPathPart)) {
      // /profile/edit일 때는 activePart를 null로
      setActivePart(null);
      
      // 등록 버튼을 통해 들어온 경우 state의 part 정보를 사용하여 selectedParts에 추가
      // 등록한 파트는 보라색(clicked 상태)으로 표시되지만 activePart는 null로 유지 (LeftPanel만 보이도록)
      if (currentPortfolioState?.part) {
        const registeredPart = currentPortfolioState.part;
        setSelectedParts((prev) => {
          if (!prev.includes(registeredPart)) {
            return [...prev, registeredPart];
          }
          return prev;
        });
        // activePart는 null로 유지하여 LeftPanel만 보이도록 함
        // 하지만 파트 버튼은 PartButtonWrapper의 $isActive로 clicked 상태 표시
      }
    }
  }, [location.pathname, location.state]);
  const [profileImage, setProfileImage] = useState<string | null>(portfolioState?.profileImage || user?.profileImage || null);
  const [name, setName] = useState<string>(portfolioState?.name || user?.name || "");
  const [intro, setIntro] = useState<string>(portfolioState?.intro || "");
  const [dbtiInfo] = useState<string | null>(portfolioState?.dbtiInfo || null); // DBTI 정보 상태
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  // 각 파트별 프로필 데이터 저장
  const [partProfiles, setPartProfiles] = useState<Record<string, any>>({});
  const partSelectorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 편집 모드 진입 시 프로필 데이터 로드 (한 번만 실행)
  const hasLoadedProfile = useRef(false);
  useEffect(() => {
    // /profile/edit 경로에 처음 진입할 때만 API에서 데이터 가져오기
    if (isEditMode && !hasLoadedProfile.current && !portfolioState) {
      hasLoadedProfile.current = true;
      const loadProfile = async () => {
        try {
          // 공통 프로필 가져오기
          const commonProfileResult = await getProfile();
          if (commonProfileResult.success && commonProfileResult.data) {
            const profileData = commonProfileResult.data;
            console.log(profileData);
            setName(profileData.username || user?.name || "");
            setIntro(profileData.comment || "");
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
              
              // 각 파트별 프로필 데이터 저장
              setPartProfiles(partProfilesData);
              
              // 프로필 데이터가 있으면 default 페이지로 이동
              if (Object.keys(partProfilesData).length > 0) {
                // 서버에서 가져온 데이터를 ProfileDefaultPage 형식으로 변환
                const partMap: Record<string, PartOption> = {
                  'PM': 'PM',
                  'FE': '프론트엔드',
                  'BE': '백엔드',
                  'DE': '디자인'
                };
                
                // 첫 번째 파트를 기본 선택 파트로 설정
                const firstPart = profileData.available_parts[0];
                const firstPartOption = partMap[firstPart];
                
                navigate('/profile/Default', {
                  state: {
                    name: profileData.username,
                    intro: profileData.comment,
                    dbtiInfo: null, // DBTI는 별도로 가져와야 할 수 있음
                    profileImage: null, // 프로필 이미지는 별도로 가져와야 할 수 있음
                    selectedParts: mappedParts,
                    part: firstPartOption,
                    partProfiles: partProfilesData, // 각 파트별 프로필 데이터
                    commonProfile: profileData, // 공통 프로필 데이터
                  },
                });
              }
            }
          }
        } catch (error) {
          console.error("프로필 로드 실패:", error);
        }
      };
      loadProfile();
    }
    
    // /profile/edit이 아닌 경로로 이동하면 리셋
    if (!isEditMode) {
      hasLoadedProfile.current = false;
    }
  }, [isEditMode, portfolioState, user?.name]);

  // 이름이 공백인지 확인 (trim으로 공백 제거 후 확인)
  const isNameEmpty = !name.trim();
  
  // 저장 버튼 활성화 조건: 이름, 한줄소개, DBTI, 파트가 모두 입력/선택되어야 함
  // isEditModeFromView가 true이면 수정 모드이므로 저장 버튼 비활성화
  const isSaveDisabled = isNameEmpty || !intro.trim()  // !dbtiInfo || selectedParts.length === 0 || isEditModeFromView;

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

  const handleRegisterProfile = () => {
    navigate('/profile/edit', { replace: false });
  };

  const handleSave = () => {
    setIsSaveModalOpen(true);
  };

  const handleSaveModalClose = () => {
    setIsSaveModalOpen(false);
  };

  const handleSaveConfirm = () => {
    // TODO: 프로필 저장 로직
    setIsSaveModalOpen(false);
    navigate('/profile/Default', { replace: false });
  };

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
    // DBTI 정보가 없으면 DBTI 테스트 페이지로 이동
    if (!dbtiInfo) {
      navigate("/profile/DBTI");
    } else {
      // DBTI 정보가 있으면 Profile/Edit/DBTI 페이지로 이동
      navigate("/profile/edit/dbti");
    }
  };

  // 편집 모드가 아닐 때 (기본 프로필 보기)
  if (!isEditMode) {
    return (
      <S.Container>
        <S.ProfileSection>
          <S.ProfileImageWrapper>
            {user?.profileImage ? (
              <S.ProfileImage src={user.profileImage} alt={user.name} />
            ) : (
              <S.ProfileImagePlaceholder />
            )}
          </S.ProfileImageWrapper>
          <S.UserName>{user?.name || "사용자"}</S.UserName>
          <S.ButtonWrapper>
            <BkLTextButton onClick={handleRegisterProfile}>
              프로필 등록
            </BkLTextButton>
          </S.ButtonWrapper>
        </S.ProfileSection>
      </S.Container>
    );
  }

  // 편집 모드
  // pathPart가 'edit'이면 Side Section만, 그 외 파트 slug면 포트폴리오 섹션만
  const hasActivePart = partFromUrl !== null;
  
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
        <S.LeftPanel $hideOnMobile={hasActivePart} $isDropdownOpen={isPartDropdownOpen}>
        <S.EditProfileSection $isDropdownOpen={isPartDropdownOpen}>
          <S.EditProfileImageWrapper>
            {profileImage ? (
              <S.EditProfileImage src={profileImage} alt={user?.name || "프로필"} />
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
                // 등록 버튼을 통해 추가된 파트인지 확인 (location.state의 part 정보와 비교)
                // location.state를 직접 사용하여 최신 상태 반영
                // /profile/edit 경로에서는 마지막에 저장한 파트만 clicked 상태로 표시
                const currentState = location.state as PortfolioState | null;
                // activePart가 null이고, 현재 파트가 location.state의 part와 일치할 때만 clicked 상태
                const isRegisteredPart = activePart === null && currentState?.part === part;
                return (
                  <S.PartButtonWrapper 
                    key={part} 
                    $isActive={activePart === part}
                    $isRegistered={isRegisteredPart}
                  >
                    <WtLPawButton
                      key={`${part}-${activePart}`}
                      onClick={() => {
                        const partMap: Record<PartOption, string> = {
                          'PM': 'pm',
                          '디자인': 'design',
                          '프론트엔드': 'frontend',
                          '백엔드': 'backend'
                        };
                        const partSlug = partMap[part];
                        setActivePart(part);
                        // 등록된 상태라면 state를 유지하여 view 모드로 표시
                        navigate(`/profile/edit/${partSlug}`, { 
                          replace: false,
                          state: portfolioState || undefined
                        });
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
                      setSelectedParts((prev) => [...prev, selectedPart]);
                      const partMap: Record<PartOption, string> = {
                        'PM': 'pm',
                        '디자인': 'design',
                        '프론트엔드': 'frontend',
                        '백엔드': 'backend'
                      };
                      const partSlug = partMap[selectedPart];
                      setActivePart(selectedPart);
                      navigate(`/profile/edit/${partSlug}`, { replace: false });
                    }
                    setIsPartDropdownOpen(false);
                  }}
                />
              </div>
            </S.PartSelectionWrapper>
          </S.FormSection>

          <S.SaveButtonWrapper $isDropdownOpen={isPartDropdownOpen}>
            <BkMTextButton 
              onClick={handleSave} 
              disabled={isSaveDisabled}
            >
              저장
            </BkMTextButton>
          </S.SaveButtonWrapper>
        </S.EditProfileSection>
      </S.LeftPanel>

      <S.RightPanel $hideOnMobile={!hasActivePart}>
        {activePart === "PM" || pathPart === 'pm' ? (
          <PMPortfolioForm 
            name={name}
            intro={intro}
            dbtiInfo={dbtiInfo}
            profileImage={profileImage}
            selectedParts={selectedParts}
            portfolioData={
              // portfolioState에 PM 포트폴리오 데이터가 있으면 전달 (part 정보와 무관하게)
              portfolioState && 
              (portfolioState.part === "PM" || 
               (portfolioState.experienceSummary !== undefined && 
                portfolioState.dailyAvailability !== undefined)) 
                ? portfolioState 
                : null
            }
            onRegister={() => {
              // PMPortfolioForm의 onRegister 콜백 (타입 호환을 위해 별도로 제공)
              const updated = !selectedParts.includes("PM") 
                ? [...selectedParts, "PM"] as PartOption[]
                : selectedParts;
              setSelectedParts(updated);
              return updated;
            }}
          />
        ) : activePart === "디자인" || pathPart === 'design' ? (
          <DesignPortfolioForm 
            name={name}
            intro={intro}
            dbtiInfo={dbtiInfo}
            profileImage={profileImage}
            selectedParts={selectedParts}
            portfolioData={
              // portfolioState에 디자인 포트폴리오 데이터가 있으면 전달 (part 정보와 무관하게)
              portfolioState && 
              (portfolioState.part === "디자인" || 
               (portfolioState.experienceSummary !== undefined && 
                portfolioState.figmaAssessment !== undefined)) 
                ? portfolioState 
                : null
            }
            onRegister={() => {
              // DesignPortfolioForm의 onRegister 콜백 (타입 호환을 위해 별도로 제공)
              const updated = !selectedParts.includes("디자인") 
                ? [...selectedParts, "디자인"] as PartOption[]
                : selectedParts;
              setSelectedParts(updated);
              return updated;
            }}
          />
        ) : activePart === "프론트엔드" || pathPart === 'frontend' ? (
          <FrontendPortfolioForm 
            name={name}
            intro={intro}
            dbtiInfo={dbtiInfo}
            profileImage={profileImage}
            selectedParts={selectedParts}
            portfolioData={
              portfolioState && 
              (portfolioState.part === "프론트엔드" || 
               (portfolioState.experienceSummary !== undefined && 
                portfolioState.github !== undefined)) 
                ? {
                    ...portfolioState,
                    selectedTechs: portfolioState.selectedTechs as ("JavaScript" | "Android Studio" | "React")[] | undefined
                  }
                : null
            }
            onRegister={() => {
              // FrontendPortfolioForm의 onRegister 콜백 (타입 호환을 위해 별도로 제공)
              const updated = !selectedParts.includes("프론트엔드") 
                ? [...selectedParts, "프론트엔드"] as PartOption[]
                : selectedParts;
              setSelectedParts(updated);
              return updated;
            }}
          />
        ) : activePart === "백엔드" || pathPart === 'backend' ? (
          <BackendPortfolioForm 
            name={name}
            intro={intro}
            dbtiInfo={dbtiInfo}
            profileImage={profileImage}
            selectedParts={selectedParts}
            portfolioData={
              portfolioState && 
              (portfolioState.part === "백엔드" || 
               (portfolioState.experienceSummary !== undefined && 
                portfolioState.github !== undefined)) 
                ? {
                    ...portfolioState,
                    selectedTechs: portfolioState.selectedTechs as ("Java" | "Python" | "Django" | "Spring Boot")[] | undefined
                  }
                : null
            }
            onRegister={() => {
              // BackendPortfolioForm의 onRegister 콜백 (타입 호환을 위해 별도로 제공)
              const updated = !selectedParts.includes("백엔드") 
                ? [...selectedParts, "백엔드"] as PartOption[]
                : selectedParts;
              setSelectedParts(updated);
              return updated;
            }}
          />
        ) : (
          <S.EmptyMessageWrapper>
            {!intro ? (
              <S.EmptyMessage>
                한 줄 소개를 작성해 나를 표현해봐요.
              </S.EmptyMessage>
            ) : !dbtiInfo ? (
              <S.EmptyMessage>
                DBTI 테스트를 통해 내 프로젝트 성향을 알아봐요.
              </S.EmptyMessage>
            ) : (
              <S.EmptyMessage>
                파트를 추가하고 포트폴리오를 작성해봐요.
              </S.EmptyMessage>
            )}
          </S.EmptyMessageWrapper>
        )}
      </S.RightPanel>
      </S.EditContainer>
    </S.EditWrapper>
    </>
  );
}
