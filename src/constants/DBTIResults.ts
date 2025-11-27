export interface DBTIResultData {
  id: number;
  name: string;
  keywords: string[];
  image: string;
  goodAt: string;
  bestPosition: string;
  habit: string;
  risk: string;
  bestie: number[];
}

export interface BestieInfo {
  id: number;
  name: string;
  image: string;
  reason: string;
}

export const DBTI_RESULTS: Record<number, DBTIResultData> = {
  1: {
    id: 1,
    name: "햇살형 공감설계자, 골든 리트리버",
    keywords: ["사람 좋아", "팀 분위기 메이커", "유저 공감의 화신"],
    image: "/dbti-golden-retriever.png",
    goodAt: "온보딩/문서화(DX), 디자인-개발 핸드셰이크, 사용자 인터뷰 요약, 프로토타입 데모",
    bestPosition: "프론트엔드 + 프로덕트(UX) 엔지니어, DevRel, Design system",
    habit: "가독성·네이밍 집착, 스토리북/샌드박스 좋아함, PR 설명이 친절하고 이모지 많음",
    risk: "스코프가 자주 넓어짐(“이것도 넣으면 유저가 좋아하지 않을까?”), shiny object syndrome.",
    bestie: [2, 3, 4]
  },
  2: {
    id: 2,
    name: "지능형 리더십, 보더콜리",
    keywords: ["전략적 사고", "문제 해결", "리더십"],
    image: "/dbti-border-collie.png",
    goodAt: "복잡한 문제를 체계적으로 분석하고 해결책을 찾는 것",
    bestPosition: "백엔드 개발자, 데이터 분석가",
    habit: "스코프가 자주 넓어짐(“이것도 넣으면 유저가 좋아하지 않을까?”), shiny object syndrome.",
    risk: "너무 완벽을 추구하여 팀원들에게 부담을 줄 수 있음",
    bestie: [1, 5, 6]
  },
  3: {
    id: 3,
    name: "충성심 가득한 보안관, 도베르만",
    keywords: ["책임감", "신뢰성", "보안 의식"],
    image: "/dbti-doberman.png",
    goodAt: "시스템의 안정성과 보안을 책임지고 관리하는 것",
    bestPosition: "데브옵스 엔지니어, 보안 전문가",
    habit: "스코프가 자주 넓어짐(“이것도 넣으면 유저가 좋아하지 않을까?”), shiny object syndrome.",
    risk: "변화에 대한 적응이 다소 느릴 수 있음",
    bestie: [1, 4, 2]
  },
  4: {
    id: 4,
    name: "호기심 많은 탐험가, 비글",
    keywords: ["호기심", "창의성", "실험 정신"],
    image: "/dbti-beagle.png",
    goodAt: "새로운 기술과 아이디어를 탐구하고 실험하는 것",
    bestPosition: "프론트엔드 개발자, UX 리서처",
    habit: "스코프가 자주 넓어짐(“이것도 넣으면 유저가 좋아하지 않을까?”), shiny object syndrome.",
    risk: "집중력이 분산되어 프로젝트 완료가 지연될 수 있음",
    bestie: [1, 3, 5]
  }
};

export const getBestieInfo = (id: number): BestieInfo | null => {
  const result = DBTI_RESULTS[id];
  if (!result) return null;
  
  return {
    id: result.id,
    name: result.name,
    image: result.image,
    reason: getBestieReason(1, id) // 골든 리트리버와의 궁합 이유
  };
};

export const getBestieReason = (mainId: number, bestieId: number): string => {
  const reasons: Record<string, string> = {
    '1-2': '큰 그림·원칙으로 골든리트리버의 확산형 아이디어에 뼈대 제공',
    '1-3': '실행력이 좋아 아이디어를 끝까지 밀어줌',
    '1-4': '발상 폭발 듀오(단, 시간제한 필수..)'
  };
  return reasons[`${mainId}-${bestieId}`] || '서로의 장점을 보완하며 좋은 시너지를 발휘합니다';
};

export const getDBTIResult = (id: number): DBTIResultData | null => {
  return DBTI_RESULTS[id] || null;
};