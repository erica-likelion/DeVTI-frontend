// 서버 응답에서 오는 part가 "FE"일 수도, "프론트엔드"일 수도 있어서 둘 다 커버
export type PartCode = 'PM' | 'FE' | 'BE' | 'DE';
export type PartLabel = 'PM' | '프론트엔드' | '백엔드' | '디자인';
export type Part = PartCode | PartLabel;

// /api/users/{room_id} 응답 타입
export interface ApiProfile {
  devti: string;
  comment: string;
  part: Part;
  experienced: string;
  strength: string;
  daily_time_capacity: number;
  weekly_time_capacity: number;
  design_understanding: number;
  development_understanding: number;
}

export interface ApiParticipant {
  id: number;
  username: string;
  part: Part;
  team_vibe: string;
  active_hours: string;
  meeting_preference: string;
  wagging: boolean;
  profile: ApiProfile;
}

export interface ApiUsersResponse {
  recommend_reason: string;
  matching_at: string;
  participants: ApiParticipant[];
}

// UI에서 쓰는 RoleType은 기존 그대로
export type RoleType = '전체' | 'PM' | '디자인' | '프론트엔드' | '백엔드';

export interface Participant {
  id: number;
  username: string;
  part: PartCode;     // 내부적으로는 코드로 통일 (PM/FE/BE/DE)
  role: RoleType;
  icon?: string;
  keywords: string[][];
  rightButton?: string | false;
  disabled?: boolean;
  team?: number;

  // 필요하면 사이드시트에서 쓰려고 보관 (선택)
  wagging?: boolean;
  profile?: ApiProfile;
}

const normalizePartToCode = (part: Part): PartCode => {
  switch (part) {
    case 'PM':
      return 'PM';
    case 'FE':
      return 'FE';
    case 'BE':
      return 'BE';
    case 'DE':
      return 'DE';
    case '프론트엔드':
      return 'FE';
    case '백엔드':
      return 'BE';
    case '디자인':
      return 'DE';
    default:
      return 'PM';
  }
};

const ROLE_LABEL_MAP: Record<PartCode, RoleType> = {
  PM: 'PM',
  FE: '프론트엔드',
  BE: '백엔드',
  DE: '디자인',
};

export const ROLE_TABS: readonly RoleType[] = [
  '전체',
  'PM',
  '디자인',
  '프론트엔드',
  '백엔드',
] as const;

export const mapApiParticipant = (raw: ApiParticipant): Participant => {
  const partCode = normalizePartToCode(raw.part);
  const roleLabel = ROLE_LABEL_MAP[partCode];

  return {
    id: raw.id,
    username: raw.username,
    part: partCode,
    role: roleLabel,
    icon: '/assets/icons/paw.svg',

    keywords: [
      [roleLabel],
      [raw.team_vibe],
      [raw.active_hours, raw.meeting_preference],
    ],

    // wagging 상태에 따라 버튼 문구/비활성 처리도 가능
    rightButton: raw.wagging ? false : '꼬리 흔들기',
    disabled: false,

    wagging: raw.wagging,
    profile: raw.profile,
    
  };
};

export const createParticipantsFromApi = (data: ApiUsersResponse): Participant[] =>
  data.participants.map(mapApiParticipant);
