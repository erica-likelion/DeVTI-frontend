import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import * as S from "./ProfilePage.styles";
import PMPortfolioForm from "./components/PMPortfolioForm";
import DesignPortfolioForm from "./components/DesignPortfolioForm";
import FrontendPortfolioForm from "./components/FrontendPortfolioForm";
import BackendPortfolioForm from "./components/BackendPortfolioForm";
import BkLTextButton from "@/components/ButtonStatic/BkLTextButton";
import BkMTextButton from "@/components/ButtonStatic/BkMTextButton";
import WtMIconButton from "@/components/ButtonStatic/WtMIconButton";
import InputField from "@/components/Input/InputField";
import WtLPawButton from "@/components/ButtonDynamic/WtLPawButton";
import DropBox from "@/components/DropBox";
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

export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  
  // URL에서 상태 복원
  const isEditMode = location.pathname.startsWith('/profile/edit');
  const pathPart = location.pathname.split('/').pop();
  const partFromUrl = pathPart && slugToPart[pathPart] ? slugToPart[pathPart] : null;
  
  const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
  const [selectedParts, setSelectedParts] = useState<PartOption[]>([]);
  const [activePart, setActivePart] = useState<PartOption | null>(partFromUrl);
  
  // URL 변경 시 activePart 업데이트
  useEffect(() => {
    const currentPathPart = location.pathname.split('/').pop();
    const currentPartFromUrl = currentPathPart && slugToPart[currentPathPart] ? slugToPart[currentPathPart] : null;
    
    if (currentPartFromUrl) {
      setActivePart(currentPartFromUrl);
    } else if (location.pathname.startsWith('/profile/edit') && (currentPathPart === 'edit' || !currentPathPart)) {
      // /profile/edit일 때는 activePart를 null로
      setActivePart(null);
    }
  }, [location.pathname]);
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
  const [name, setName] = useState<string>(user?.name || "");
  const [intro, setIntro] = useState<string>("");
  const [dbtiInfo, setDbtiInfo] = useState<string | null>(null); // DBTI 정보 상태
  const partSelectorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이름이 공백인지 확인 (trim으로 공백 제거 후 확인)
  const isNameEmpty = !name.trim();
  
  // 저장 버튼 활성화 조건: 이름, 한줄소개, DBTI, 파트 전부 입력/선택되어야 함
  const isSaveDisabled = isNameEmpty || !intro.trim() || !dbtiInfo || selectedParts.length === 0;

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
    // TODO: 프로필 저장 로직
    console.log("프로필 저장");
    navigate('/profile', { replace: false });
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
    // DBTI 정보가 없으면 센터 시트 열기
    if (!dbtiInfo) {
      // TODO: 센터 시트 열기 (아직 구현되지 않음)
      // 임시로 DBTI 정보 설정 (DBTI 페이지가 만들어지면 제거)
      setDbtiInfo("test"); // 임시 값
      console.log("센터 시트 열기");
      // 예: setIsCenterSheetOpen(true);
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
    <S.EditWrapper>
      <S.EditContainer>
        <S.LeftPanel $hideOnMobile={hasActivePart}>
        <S.EditProfileSection>
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
              {selectedParts.map((part) => (
                <S.PartButtonWrapper 
                  key={part} 
                  $isActive={activePart === part}
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
                      navigate(`/profile/edit/${partSlug}`, { replace: false });
                    }}
                    disabled={false}
                  >
                    {part}
                  </WtLPawButton>
                </S.PartButtonWrapper>
              ))}
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

          <S.SaveButtonWrapper>
            <BkMTextButton onClick={handleSave} disabled={isSaveDisabled}>
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
          />
        ) : activePart === "디자인" || pathPart === 'design' ? (
          <DesignPortfolioForm />
        ) : activePart === "프론트엔드" || pathPart === 'frontend' ? (
          <FrontendPortfolioForm />
        ) : activePart === "백엔드" || pathPart === 'backend' ? (
          <BackendPortfolioForm />
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
  );
}
