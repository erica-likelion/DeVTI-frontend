import type { SelfAssessmentItem } from "../SelfAssessmentGroup";

// Android Studio 자가평가 항목
export const ANDROID_STUDIO_ITEMS: SelfAssessmentItem[] = [
  {
    key: "layoutStructure",
    title: "레이아웃 구조 및 화면 설계 역량",
    description:
      "Android XML 기반의 레이아웃 구성 원리를 이해하고, ConstraintLayout·LinearLayout 등 상황에 맞는 UI 요소를 선택하여 화면을 설계할 수 있다.",
  },
  {
    key: "uiTags",
    title: "UI 태그 및 필수 속성 활용 능력",
    description:
      "Button, TextView, EditText 등 주요 UI 태그의 역할을 이해하고, id, layout_width, layout_height 같은 필수 속성을 올바르게 설정하여 UI 컴포넌트를 원하는 형태로 구현할 수 있다.",
  },
  {
    key: "dependencyManagement",
    title: "의존성 관리 및 빌드 환경 구성 능력",
    description:
      "Gradle 의존성 관리 및 빌드 설정을 이해하고, 외부 라이브러리를 프로젝트에 안정적으로 적용할 수 있다.",
  },
  {
    key: "listComposition",
    title: "로컬 데이터 및 네트워크 기반 리스트 구성 능력",
    description:
      "오프라인 캐싱 · paging 기반 리스트 · 데이터 동기화 구조를 설계할 수 있다.",
  },
  {
    key: "architectureDesign",
    title: "대규모 프로젝트 확장 고려 아키텍처 설계 역량",
    description:
      "멀티 모듈 분리(Feature Module · Core Module) 등을 통해 빌드 속도 개선 / 모듈 재사용성 향상 / 대규모 프로젝트 확장성 확보를 고려한 구조를 설계할 수 있다.",
  },
] as const;

// JavaScript와 React는 Android Studio와 동일한 질문으로 임시 처리
export const JAVASCRIPT_ITEMS: SelfAssessmentItem[] = ANDROID_STUDIO_ITEMS;
export const REACT_ITEMS: SelfAssessmentItem[] = ANDROID_STUDIO_ITEMS;

export const FRONTEND_TECH_OPTIONS = ["JavaScript", "Android Studio", "React"] as const;

export type FrontendTech = (typeof FRONTEND_TECH_OPTIONS)[number];

export const FRONTEND_TECH_ITEMS_MAP: Record<FrontendTech, SelfAssessmentItem[]> = {
  JavaScript: JAVASCRIPT_ITEMS,
  "Android Studio": ANDROID_STUDIO_ITEMS,
  React: REACT_ITEMS,
};

