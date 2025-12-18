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

// JavaScript 자가평가 항목
export const JAVASCRIPT_ITEMS: SelfAssessmentItem[] = [
  {
    key: "basicSyntax",
    title: "기초 문법 및 타입 이해",
    description:
      "JavaScript의 기본 자료형(Number, String, Boolean, Object, Array)과 동적 타이핑 특성을 이해하고, 상황에 맞게 변수를 선언(var / let / const)하여 사용할 수 있다.",
  },
  {
    key: "scopeHoisting",
    title: "스코프, 호이스팅, 실행 컨텍스트 이해",
    description:
      "var / let / const의 스코프 차이와 호이스팅 동작 방식을 이해하고, 실행 컨텍스트 관점에서 코드 실행 흐름을 설명할 수 있다.",
  },
  {
    key: "asyncPromise",
    title: "비동기 처리 및 Promise 활용",
    description:
      "Promise, then / catch, async / await를 활용하여 비동기 로직을 작성하고, API 요청 흐름을 안정적으로 제어할 수 있다.",
  },
  {
    key: "dataProcessing",
    title: "배열, 객체 기반 데이터 가공 능력",
    description:
      "map, filter, reduce 등의 고차 함수를 활용하여 반복문 없이도 복잡한 데이터 구조를 효율적으로 처리할 수 있다.",
  },
  {
    key: "eventLoop",
    title: "이벤트 루프 및 런타임 동작 원리 이해",
    description:
      "Call Stack, Web API, Task Queue, Microtask Queue의 관계를 이해하고, 비동기 코드 실행 순서를 예측할 수 있다.",
  },
] as const;

// React 자가평가 항목
export const REACT_ITEMS: SelfAssessmentItem[] = [
  {
    key: "componentJsx",
    title: "컴포넌트 기본 구조 및 JSX 이해",
    description:
      "함수형 컴포넌트와 JSX 문법을 이해하고, 기본적인 컴포넌트를 작성하여 화면에 렌더링할 수 있다.",
  },
  {
    key: "stateProps",
    title: "상태(State)와 Props 관리",
    description:
      "useState를 활용하여 상태를 관리하고, Props를 통해 컴포넌트 간 데이터를 전달할 수 있다.",
  },
  {
    key: "sideEffectLifecycle",
    title: "Side Effect 및 라이프사이클 관리",
    description:
      "useEffect의 실행 시점과 의존성 배열을 이해하고, 데이터 패칭 및 이벤트 처리와 같은 Side Effect를 적절히 관리할 수 있다.",
  },
  {
    key: "routingSpa",
    title: "라우팅 및 SPA 구조 이해",
    description:
      "react-router-dom을 사용하여 페이지 전환을 구현하고, SPA 구조에서 공통 레이아웃과 페이지 컴포넌트를 설계할 수 있다.",
  },
  {
    key: "renderingOptimization",
    title: "렌더링 최적화 및 내부 동작 이해",
    description:
      "React의 렌더링 과정과 재조정(Reconciliation) 개념을 이해하고, memo, useCallback, useMemo를 활용하여 불필요한 리렌더링을 방지할 수 있다.",
  },
] as const;

export const FRONTEND_TECH_OPTIONS = ["JavaScript", "Android Studio", "React"] as const;

export type FrontendTech = (typeof FRONTEND_TECH_OPTIONS)[number];

export const FRONTEND_TECH_ITEMS_MAP: Record<FrontendTech, SelfAssessmentItem[]> = {
  JavaScript: JAVASCRIPT_ITEMS,
  "Android Studio": ANDROID_STUDIO_ITEMS,
  React: REACT_ITEMS,
};

