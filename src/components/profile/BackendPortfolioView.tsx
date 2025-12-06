import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./BackendPortfolioView.styles";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import StarDisplay from "@/components/StarDisplay/StarDisplay";
import InputField from "@/components/Input/InputField";
import CheckboxButton from "@/components/ButtonDynamic/CheckboxButton";
import Modal from "@/components/modal/Modal";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";
import CopyBlackGray from "@/assets/icons/Copy/CopyBlackGray.svg";

// BackendPortfolioForm에서 사용한 것과 동일한 자가평가 항목
const JAVA_ITEMS: SelfAssessmentItem[] = [
  {
    key: "oopDesign",
    title: "객체 지향 (OOP) 설계",
    description:
      "상태와 행위를 캡슐화하기 위해 적절한 접근 제어자를 적용하고, 인터페이스나 추상 클래스를 활용하여 다형성(Polymorphism)을 기반으로 확장 가능한 코드를 설계할 수 있다.",
  },
  {
    key: "collectionFramework",
    title: "컬렉션 프레임워크의 이해",
    description:
      "List, Set, Map 계열의 컬렉션 프레임워크 클래스들의 특성(예: 성능, 순서, 중복 허용 여부)을 정확히 이해하고, 처리 목적에 가장 적합한 자료구조를 선택하여 데이터를 효율적으로 관리할 수 있다.",
  },
  {
    key: "errorHandling",
    title: "에러 핸들링 및 디버깅",
    description:
      '"try-catch-finally" 및 "throws"를 사용하여 예측 가능한 예외 상황과 런타임 오류에 대처할 수 있다.',
  },
  {
    key: "concurrency",
    title: "동시성 (Concurrency) 관리",
    description:
      '"Thread"와 "Runnable"의 차이를 이해하고, 멀티 스레드 환경에서 작업을 정의하고 실행할 수 있다.',
  },
  {
    key: "buildTools",
    title: "개발 환경 구축 및 의존성 관리",
    description:
      'Maven 또는 Gradle과 같은 빌드 자동화 도구를 사용하여 프로젝트를 설정하고, "pom.xml" 또는 "build.gradle" 파일을 통해 의존성을 체계적으로 관리할 수 있다.',
  },
] as const;

const PYTHON_ITEMS: SelfAssessmentItem[] = [
  {
    key: "dataStructures",
    title: "자료구조 활용 및 데이터 처리",
    description:
      "List, Dictionary, Set 등의 자료구조 특성을 이해하고, 상황에 적합한 자료구조를 선택해 데이터를 효율적으로 가공할 수 있다.",
  },
  {
    key: "pythonicCode",
    title: "Pythonic 코드 작성 능력",
    description:
      "반복문과 조건문뿐만 아니라, 리스트 컴프리헨션(List Comprehension) 등을 활용해 간결하고 'Pythonic'한 코드를 작성할 수 있다.",
  },
  {
    key: "oopDesign",
    title: "모듈화 및 객체 지향(OOP) 설계",
    description:
      "함수와 클래스(OOP)를 목적에 맞게 정의하고, 모듈과 패키지로 코드를 분리하여 구조화할 수 있다.",
  },
  {
    key: "environmentSetup",
    title: "개발 환경 구축 및 의존성 관리",
    description:
      '가상 환경(venv, poetry 등)을 스스로 세팅하고, "requirements.txt" 등을 통해 팀원들과 의존성을 맞출 수 있다.',
  },
  {
    key: "errorHandling",
    title: "에러 핸들링 및 디버깅",
    description:
      '"try-except" 문을 활용해 예외 상황을 처리하고, 에러 발생 시 트레이스백(Traceback)을 분석하여 원인을 스스로 파악할 수 있다.',
  },
] as const;

const DJANGO_ITEMS: SelfAssessmentItem[] = [
  {
    key: "modelMigration",
    title: "모델 정의 및 DB 마이그레이션 관리",
    description:
      '"models.py"에 필드를 정의하고, 마이그레이션(makemigrations, migrate) 명령어를 통해 DB에 테이블을 생성할 수 있다.',
  },
  {
    key: "viewPattern",
    title: "뷰(View) 패턴 이해 및 아키텍처 설계",
    description:
      "FBV(함수형 뷰), CBV(클래스형 뷰), ViewSet의 장단점을 이해하고, 프로젝트 규모와 복잡도에 맞춰 적절한 뷰 방식을 선택할 수 있다.",
  },
  {
    key: "frameworkExtension",
    title: "프레임워크 심층 이해 및 기능 확장",
    description:
      'DRF의 "GenericAPIView"나 "Mixin" 내부 동작을 이해하여, 필요시 프레임워크의 기능을 커스터마이징하거나 테스트 코드를 작성할 수 있다.',
  },
  {
    key: "deploymentArchitecture",
    title: "웹 서버 아키텍처 및 배포 구조 설계",
    description:
      "Gunicorn이나 uWSGI 같은 WSGI 서버의 역할이 무엇인지 알고, Nginx와 연동하여 배포 구조를 설계할 수 있다.",
  },
  {
    key: "securitySettings",
    title: "환경 설정 분리 및 보안 관리",
    description:
      '"settings.py"를 개발용과 배포용으로 분리하고, "SECRET_KEY"나 "DEBUG" 모드를 환경 변수로 안전하게 관리할 수 있다.',
  },
] as const;

const SPRING_BOOT_ITEMS: SelfAssessmentItem[] = [
  {
    key: "dependencyInjection",
    title: "의존성 주입 및 제어 역전 이해",
    description:
      '"@Component", "@Service", "@Repository", "@Controller" 등의 어노테이션을 목적에 맞게 사용하여 컴포넌트를 정의하고, "@Autowired"를 통해 원하는 위치에 필요한 의존성을 주입(Injection)할 수 있다.',
  },
  {
    key: "configuration",
    title: "Configuration 이해",
    description:
      'Spring Boot의 Auto-Configuration 원리를 이해하고, "application.properties" 또는 "application.yml" 파일을 통해 데이터베이스 연결 정보, 포트 번호 등 다양한 애플리케이션 환경을 설정하고 관리할 수 있다.',
  },
  {
    key: "dbIntegration",
    title: "DB 연동 및 관리",
    description:
      'Spring Data JPA의 개념을 이해하고, "@Entity"와 "@Repository" 인터페이스를 활용하여 데이터베이스 연동 및 기본적인 CRUD 작업을 구현할 수 있다.',
  },
  {
    key: "restfulApi",
    title: "RESTful API 구현",
    description:
      "RESTful API 엔드포인트를 구현하여, 클라이언트로부터 전달받은 요청 데이터를 처리하고 적절한 HTTP 상태 코드와 응답 데이터를 반환할 수 있다.",
  },
  {
    key: "deployment",
    title: "배포 및 운영 환경의 이해",
    description:
      "Spring Boot 어플리케이션을 Docker 컨테이너 이미지로 빌드하고 실행할 수 있다. 필요한 경우 NginX를 비롯한 리버스 프록시를 활용하여 Https 설정 및 무중단 배포 시스템을 구축할 수 있다.",
  },
] as const;

const TECH_ITEMS_MAP: Record<string, SelfAssessmentItem[]> = {
  Java: JAVA_ITEMS,
  Python: PYTHON_ITEMS,
  Django: DJANGO_ITEMS,
  "Spring Boot": SPRING_BOOT_ITEMS,
};

interface BackendPortfolioViewProps {
  experienceSummary: string;
  strengths: string;
  github?: string;
  selectedTechs?: string[];
  techAssessments?: Record<string, Record<string, number>>;
  isNewcomer: boolean;
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  selectedParts?: string[];
  showEditButtons?: boolean;
  onBack?: () => void;
}

/**
 * 평균 점수 계산 (0.5 단위로 내림)
 */
const calculateAverage = (scores: Record<string, number>, items: SelfAssessmentItem[]): number => {
  const validScores = items
    .map((item) => scores[item.key] ?? 0)
    .filter((score) => score > 0);
  
  if (validScores.length === 0) return 0;
  
  const sum = validScores.reduce((acc, score) => acc + score, 0);
  const average = sum / validScores.length;
  
  // 0.5 단위로 내림
  return Math.floor(average * 2) / 2;
};

export default function BackendPortfolioView({
  experienceSummary,
  strengths,
  github = "",
  selectedTechs = [],
  techAssessments = {},
  isNewcomer,
  name,
  intro,
  dbtiInfo,
  profileImage,
  selectedParts = [],
  showEditButtons = true,
  onBack,
}: BackendPortfolioViewProps) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 각 기술별 평균 점수 계산
  const techAverages = useMemo(() => {
    const averages: Record<string, number> = {};
    selectedTechs.forEach((tech) => {
      const items = TECH_ITEMS_MAP[tech] || [];
      averages[tech] = calculateAverage(techAssessments[tech] || {}, items);
    });
    return averages;
  }, [selectedTechs, techAssessments]);

  const handleEditClick = () => {
    navigate('/profile/edit/backend', {
      state: {
        name,
        intro,
        dbtiInfo,
        profileImage,
        selectedParts,
        part: "백엔드" as const,
        experienceSummary,
        strengths,
        github,
        selectedTechs,
        techAssessments,
        isNewcomer,
      },
    });
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    navigate('/profile/edit', {
      state: {
        name,
        intro,
        dbtiInfo,
        profileImage,
        selectedParts: selectedParts.filter(part => part !== "백엔드"),
      },
    });
  };

  const handleGithubCopy = async () => {
    if (github) {
      try {
        await navigator.clipboard.writeText(github);
        // TODO: 복사 성공 토스트 메시지 표시
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.PortfolioTitle>백엔드 포트폴리오</S.PortfolioTitle>
        {showEditButtons && (
          <S.ButtonWrapper>
            <S.EditButton onClick={handleEditClick}>수정</S.EditButton>
            <S.DeleteButton onClick={handleDeleteClick}>삭제</S.DeleteButton>
          </S.ButtonWrapper>
        )}
      </S.Header>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onPrimary={handleDeleteConfirm}
        buttonLabel="확인"
      >
        <div>포트폴리오를 삭제하시겠어요?</div>
        <div>이 작업은 복구할 수 없습니다.</div>
      </Modal>

      <S.ContentFrame>
        {/* 경력사항 */}
        <S.ExperienceSection>
          <S.SectionTitle>경력사항</S.SectionTitle>
          <InputField
            value={experienceSummary || ""}
            variant="output"
            disabled={true}
            multiline={true}
            rows={1}
          />
          <S.CheckboxWrapper>
            <CheckboxButton
              checked={isNewcomer}
              onChange={() => {}}
              disabled={false}
              onClick={(e) => e.preventDefault()}
            >
              신입
            </CheckboxButton>
          </S.CheckboxWrapper>
        </S.ExperienceSection>

        {/* 강점 */}
        <S.StrengthsSection>
          <S.SectionTitle>강점</S.SectionTitle>
          <InputField
            value={strengths || ""}
            variant="output"
            disabled={true}
            multiline={true}
            rows={1}
          />
        </S.StrengthsSection>

        {/* 깃허브 */}
        <S.GithubSection>
          <S.SectionTitle>깃허브</S.SectionTitle>
          {github ? (
            <InputField
              value={github}
              variant="output"
              disabled={true}
              icon={<img src={CopyBlackGray} alt="Copy" />}
              hasIcon={true}
              onIconClick={handleGithubCopy}
            />
          ) : (
            <S.EmptyText>-</S.EmptyText>
          )}
        </S.GithubSection>

        {/* 선택된 기술별 자가평가 */}
        {selectedTechs.length > 0 && (
          <S.SelfAssessmentSection>
            <S.SectionTitle>언어, 프레임워크 숙련도 자가평가</S.SectionTitle>
            {selectedTechs.map((tech) => (
              <S.TechAssessmentWrapper key={tech}>
                <S.TechHeader>
                  <S.TechName>{tech}</S.TechName>
                  <StarDisplay value={techAverages[tech] || 0} />
                </S.TechHeader>
                <SelfAssessmentGroup
                  title=""
                  items={TECH_ITEMS_MAP[tech] || []}
                  values={techAssessments[tech] || {}}
                  onChange={() => {}}
                  variant="output"
                />
              </S.TechAssessmentWrapper>
            ))}
          </S.SelfAssessmentSection>
        )}
      </S.ContentFrame>
    </S.Wrapper>
  );
}

