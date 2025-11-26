export interface DBTIResultData {
  id: number;
  name: string;
  keywords: string[];
  image: string;
}

export const DBTI_RESULTS: Record<number, DBTIResultData> = {
  1: {
    id: 1,
    name: "햇살형 공감설계자, 골든 리트리버",
    keywords: ["사람좋아", "팀 분위기 메이커", "유저 공감의 화신"],
    image: "/dbti-golden-retriever.png"
  },
  2: {
    id: 2,
    name: "보더콜리",
    keywords: ["똑똑한", "리더십", "체계적인"],
    image: "/dbti-border-collie.png"
  },
  3: {
    id: 3,
    name: "비글",
    keywords: ["소통적인", "활발한", "친근한"],
    image: "/dbti-beagle.png"
  },
  4: {
    id: 4,
    name: "시바이누",
    keywords: ["독립적인", "창의적인", "개성있는"],
    image: "/dbti-shiba-inu.png"
  },
  5: {
    id: 5,
    name: "래브라도르",
    keywords: ["성실한", "안정적인", "믿음직한"],
    image: "/dbti-labrador.png"
  },
  6: {
    id: 6,
    name: "허스키",
    keywords: ["에너지넘치는", "도전적인", "자유로운"],
    image: "/dbti-husky.png"
  },
  7: {
    id: 7,
    name: "푸들",
    keywords: ["우아한", "세심한", "완벽주의"],
    image: "/dbti-poodle.png"
  },
  8: {
    id: 8,
    name: "닥스훈트",
    keywords: ["끈질긴", "집중력", "목표지향"],
    image: "/dbti-dachshund.png"
  }
};

export const getDBTIResult = (id: number): DBTIResultData | null => {
  return DBTI_RESULTS[id] || null;
};