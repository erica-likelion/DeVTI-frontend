import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import DesignPortfolioView from "./components/DesignPortfolioView";
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
  experienceSummary: string;
  strengths: string;
  designWorkFile?: string | null; // 파일명
  figmaAssessment: Record<string, number>;
  isNewcomer: boolean;
}

export default function DesignPortfolioViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const state = location.state as LocationState | null;

  // state가 없으면 프로필 페이지로 리다이렉트
  if (!state) {
    navigate("/profile");
    return null;
  }

  // 편집 모드 상태 관리
  const [profileImage, setProfileImage] = useState<string | null>(state.profileImage || null);
  const [name, setName] = useState<string>(state.name || "");
  const [intro, setIntro] = useState<string>(state.intro || "");
  const [dbtiInfo, setDbtiInfo] = useState<string | null>(state.dbtiInfo || null);
  const [selectedParts, setSelectedParts] = useState<PartOption[]>(["디자인"]);
  const [activePart, setActivePart] = useState<PartOption>("디자인");
  const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
  const partSelectorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

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
      setDbtiInfo("test"); // 임시 값
    } else {
      navigate("/profile/edit/dbti");
    }
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
        <S.LeftPanel $hideOnMobile={true}>
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
                {selectedParts.map((part) => (
                  <S.PartButtonWrapper 
                    key={part} 
                    $isActive={activePart === part}
                  >
                    <WtLPawButton
                      key={`${part}-${activePart}`}
                      onClick={() => {
                        setActivePart(part);
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
                        setSelectedParts((prev) => [...prev, option as PartOption]);
                        setActivePart(option as PartOption);
                      }
                      setIsPartDropdownOpen(false);
                    }}
                  />
                </div>
              </S.PartSelectionWrapper>
            </S.FormSection>

            <S.SaveButtonWrapper>
              <BkMTextButton onClick={handleSave} disabled={false}>
                저장
              </BkMTextButton>
            </S.SaveButtonWrapper>
          </S.EditProfileSection>
        </S.LeftPanel>

        <S.RightPanel>
          <DesignPortfolioView
            experienceSummary={state.experienceSummary}
            strengths={state.strengths}
            designWorkFile={state.designWorkFile || null}
            figmaAssessment={state.figmaAssessment}
            isNewcomer={state.isNewcomer}
            name={name}
            intro={intro}
            dbtiInfo={dbtiInfo}
            profileImage={profileImage}
          />
        </S.RightPanel>
      </S.EditContainer>
    </S.EditWrapper>
    </>
  );
}

