import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BasePortfolioForm from "./BasePortfolioForm";
import SelfAssessmentGroup from "./SelfAssessmentGroup";
import DropBox from "@/components/DropBox";
import type { SelfAssessmentItem } from "./SelfAssessmentGroup";
import type {
  DailyAvailabilityKey,
  WeeklyAvailabilityKey,
} from "./BasePortfolioForm";
import * as S from "./BackendPortfolioForm.styles";

// Java 자가평가 항목
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

// Python 자가평가 항목
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

// Django 자가평가 항목
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

// Spring Boot 자가평가 항목
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

const BACKEND_TECH_OPTIONS = ["Java", "Python", "Django", "Spring Boot"] as const;

type BackendTech = (typeof BACKEND_TECH_OPTIONS)[number];

const TECH_ITEMS_MAP: Record<BackendTech, SelfAssessmentItem[]> = {
  Java: JAVA_ITEMS,
  Python: PYTHON_ITEMS,
  Django: DJANGO_ITEMS,
  "Spring Boot": SPRING_BOOT_ITEMS,
};

interface BackendPortfolioFormProps {
  name?: string;
  intro?: string;
  dbtiInfo?: string | null;
  profileImage?: string | null;
  selectedParts?: string[];
  portfolioData?: {
    experienceSummary?: string;
    strengths?: string;
    github?: string;
    selectedTechs?: BackendTech[];
    techAssessments?: Record<string, Record<string, number>>; // tech -> { key: score }
    isNewcomer?: boolean;
  } | null;
  onRegister?: () => string[];
}

export default function BackendPortfolioForm({
  name,
  intro,
  dbtiInfo,
  profileImage,
  selectedParts: propSelectedParts,
  portfolioData,
  onRegister,
}: BackendPortfolioFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { selectedParts?: string[] } | null;
  const currentSelectedParts = propSelectedParts || locationState?.selectedParts || [];
  
  const [experienceSummary, setExperienceSummary] = useState(
    portfolioData?.experienceSummary || ""
  );
  const [strengths, setStrengths] = useState(portfolioData?.strengths || "");
  const [github, setGithub] = useState(portfolioData?.github || "");
  const [selectedTechs, setSelectedTechs] = useState<BackendTech[]>(
    portfolioData?.selectedTechs || []
  );
  const [techAssessments, setTechAssessments] = useState<
    Record<string, Record<string, number>>
  >(portfolioData?.techAssessments || {});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const strengthsPlaceholder =
    "백엔드 개발자로서의 강점을 사례 중심으로 적어보세요.";

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // 기술 선택 핸들러
  const handleTechSelect = (tech: BackendTech) => {
    if (!selectedTechs.includes(tech)) {
      setSelectedTechs([...selectedTechs, tech]);
      // 초기 평가값 설정
      if (!techAssessments[tech]) {
        setTechAssessments({
          ...techAssessments,
          [tech]: {},
        });
      }
    }
    setIsDropdownOpen(false);
  };

  // 기술 제거 핸들러
  const handleTechRemove = (tech: BackendTech) => {
    setSelectedTechs(selectedTechs.filter((t) => t !== tech));
    const newAssessments = { ...techAssessments };
    delete newAssessments[tech];
    setTechAssessments(newAssessments);
  };

  // 자가평가 변경 핸들러
  const handleAssessmentChange = (tech: BackendTech, key: string, value: number) => {
    setTechAssessments({
      ...techAssessments,
      [tech]: {
        ...techAssessments[tech],
        [key]: value,
      },
    });
  };

  // 자가평가 유효성 검사: 선택된 모든 기술에 대해 모든 항목이 평가되어야 함
  const isAssessmentComplete = selectedTechs.every((tech) => {
    const items = TECH_ITEMS_MAP[tech];
    return items.every(
      (item) =>
        techAssessments[tech]?.[item.key] !== undefined &&
        techAssessments[tech]?.[item.key] > 0
    );
  });

  const isFormValid = selectedTechs.length > 0 && isAssessmentComplete;

  const handleRegister = (isNewcomerValue: boolean) => {
    let updatedSelectedParts = currentSelectedParts;
    if (onRegister) {
      updatedSelectedParts = onRegister();
    } else {
      updatedSelectedParts = currentSelectedParts.includes("백엔드")
        ? currentSelectedParts
        : [...currentSelectedParts, "백엔드"];
    }

    const backendData = {
      name,
      intro,
      dbtiInfo,
      profileImage,
      selectedParts: updatedSelectedParts,
      experienceSummary,
      strengths,
      github,
      selectedTechs,
      techAssessments,
      isNewcomer: isNewcomerValue,
    };
    localStorage.setItem("portfolio_백엔드", JSON.stringify(backendData));

    navigate("/profile/backend/view", {
      state: {
        ...backendData,
        part: "백엔드" as const,
      },
    });
  };

  // 사용 가능한 기술 옵션 (이미 선택된 것 제외)
  const availableTechOptions = BACKEND_TECH_OPTIONS.filter(
    (tech) => !selectedTechs.includes(tech)
  );

  return (
    <BasePortfolioForm
      title="백엔드 포트폴리오"
      experienceSummary={experienceSummary}
      strengths={strengths}
      github={github}
      dailyAvailability={null}
      weeklyAvailability={null}
      strengthsPlaceholder={strengthsPlaceholder}
      isFormValid={isFormValid}
      onExperienceChange={setExperienceSummary}
      onStrengthsChange={setStrengths}
      onGithubChange={setGithub}
      onDailyAvailabilityChange={() => {}}
      onWeeklyAvailabilityChange={() => {}}
      onRegister={handleRegister}
      initialIsNewcomer={portfolioData?.isNewcomer || false}
      showTimeAvailability={false}
      showGithub={true}
    >
      {/* 언어, 프레임워크 숙련도 자가평가 */}
      <S.SelfAssessmentSection>
        <S.SectionTitle>언어, 프레임워크 숙련도 자가평가</S.SectionTitle>
        <S.DropdownWrapper ref={dropdownRef}>
          <DropBox
            size="L"
            value=""
            placeholder="언어, 프레임워크선택"
            isOpen={isDropdownOpen}
            options={availableTechOptions}
            disabledOptions={selectedTechs}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            onSelectOption={(option) => handleTechSelect(option as BackendTech)}
          />
        </S.DropdownWrapper>

        {/* 선택된 기술별 자가평가 카드 표시 */}
        {selectedTechs.map((tech) => (
          <SelfAssessmentGroup
            key={tech}
            title={`${tech} 숙련도 자가평가`}
            items={TECH_ITEMS_MAP[tech]}
            values={techAssessments[tech] || {}}
            onChange={(key, value) => handleAssessmentChange(tech, key, value)}
          />
        ))}
      </S.SelfAssessmentSection>
    </BasePortfolioForm>
  );
}
