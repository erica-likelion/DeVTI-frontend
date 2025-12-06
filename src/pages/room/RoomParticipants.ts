// src/pages/Room/RoomParticipants.ts

// 서버에서 내려오는 part 코드
export type BackendPart = 'PM' | 'FE' | 'BE' | 'DE';

// UI에서 사용하는 직무 탭 타입
export type RoleType = '전체' | 'PM' | '디자인' | '프론트엔드' | '백엔드';

// 🔹 participants.list / participant.new 에서 오는 개별 참가자 형태
export interface SocketParticipantPayload {
  username: string;
  part: BackendPart;
  team_vibe: string;
  active_hours: string;
  meeting_preference: string;
}

// 🔹 matching.result 에서 오는 팀 정보
export interface MatchingResultTeamMember extends SocketParticipantPayload {}

export interface MatchingResultPayload {
  teams: {
    team_number: number;
    members: MatchingResultTeamMember[];
  }[];
}

// 🔹 실제 UI에서 사용하는 Participant 타입
export interface Participant {
  id: number; // 프론트에서 임의로 부여
  username: string;
  part: BackendPart;
  role: RoleType;          
  icon?: string;
  keywords: string[][];    
  rightButton?: string | false;
  disabled?: boolean;
  team?: number;          
}

const ROLE_LABEL_MAP: Record<BackendPart, RoleType> = {
  PM: 'PM',
  FE: '프론트엔드',
  BE: '백엔드',
  DE: '디자인',
};

// 🔧 단일 참가자 매핑 함수 (소켓 → UI Participant)
export const mapSocketParticipant = (
  raw: SocketParticipantPayload,
  index: number,
): Participant => {
  const roleLabel = ROLE_LABEL_MAP[raw.part];

  return {
    id: index,
    username: raw.username,
    part: raw.part,
    role: roleLabel,
    icon: '/assets/icons/paw.svg',
    keywords: [
      [roleLabel],                             
      [raw.team_vibe],                          
      [raw.active_hours, raw.meeting_preference] 
    ],
    rightButton: '꼬리 흔들기',
    disabled: false,
  };
};

// 🔧 participants.list
export const createParticipantsFromList = (payload: {
  participants: SocketParticipantPayload[];
}): Participant[] =>
  payload.participants.map((p, idx) => mapSocketParticipant(p, idx + 1));

// 🔧 matching.result
export const applyMatchingResult = (
  base: Participant[],
  matching: MatchingResultPayload,
): Participant[] => {
  const byUsername = new Map(base.map(p => [p.username, { ...p }]));

  matching.teams.forEach(team => {
    team.members.forEach(member => {
      const existing = byUsername.get(member.username);
      if (existing) {
        existing.team = team.team_number;
      } else {
        
        const newId = byUsername.size + 1;
        byUsername.set(
          member.username,
          {
            ...mapSocketParticipant(member, newId),
            team: team.team_number,
          },
        );
      }
    });
  });

  return Array.from(byUsername.values());
};

/* ------------------------------------------------------------------
   더미 데이터
   실제 WebSocket 붙일 때는 DUMMY_* 대신
   createParticipantsFromList / applyMatchingResult 를 그대로 사용
------------------------------------------------------------------- */

const DUMMY_PARTICIPANTS_LIST = {
  type: 'participants.list' as const,
  payload: {
    participants: [
      {
        username: '김사자',
        part: 'PM' as const,
        team_vibe: '배우면서 즐겁게',
        active_hours: '낮',
        meeting_preference: '대면',
      },
      {
        username: '노시환',
        part: 'FE' as const,
        team_vibe: '배우면서 즐겁게',
        active_hours: '낮',
        meeting_preference: '대면',
      },
      {
        username: '문현빈',
        part: 'FE' as const,
        team_vibe: '배우면서 즐겁게',
        active_hours: '낮',
        meeting_preference: '비대면',
      },
      {
        username: '채은성',
        part: 'BE' as const,
        team_vibe: '배우면서 즐겁게',
        active_hours: '밤',
        meeting_preference: '대면',
      },
      {
        username: '문동주',
        part: 'DE' as const,
        team_vibe: '배우면서 즐겁게',
        active_hours: '밤',
        meeting_preference: '대면',
      },
      {
        username: '하주석',
        part: 'PM' as const,
        team_vibe: '배우면서 즐겁게',
        active_hours: '밤',
        meeting_preference: '비대면',
      },
      {
        username: '정우주',
        part: 'BE' as const,
        team_vibe: '배우면서 즐겁게',
        active_hours: '밤',
        meeting_preference: '대면',
      },
      {
        username: '심우준',
        part: 'FE' as const,
        team_vibe: '배우면서 즐겁게',
        active_hours: '밤',
        meeting_preference: '비대면',
      },
    ],
  },
};

// 매칭 결과 더미 (matching.result 스펙 그대로)
const DUMMY_MATCHING_RESULT: MatchingResultPayload = {
  teams: [
    {
      team_number: 1,
      members: [
        {
          username: '김사자',
          part: 'PM',
          team_vibe: '배우면서 즐겁게',
          active_hours: '낮',
          meeting_preference: '대면',
        },
        {
          username: '노시환',
          part: 'FE',
          team_vibe: '배우면서 즐겁게',
          active_hours: '낮',
          meeting_preference: '대면',
        },
      ],
    },
    {
      team_number: 2,
      members: [
        {
          username: '문현빈',
          part: 'FE',
          team_vibe: '배우면서 즐겁게',
          active_hours: '낮',
          meeting_preference: '비대면',
        },
        {
          username: '채은성',
          part: 'BE',
          team_vibe: '배우면서 즐겁게',
          active_hours: '밤',
          meeting_preference: '대면',
        },
      ],
    },
    {
      team_number: 3,
      members: [
        {
          username: '문동주',
          part: 'DE',
          team_vibe: '배우면서 즐겁게',
          active_hours: '밤',
          meeting_preference: '대면',
        },
        {
          username: '하주석',
          part: 'PM',
          team_vibe: '배우면서 즐겁게',
          active_hours: '밤',
          meeting_preference: '비대면',
        },
      ],
    },
    {
      team_number: 4,
      members: [
        {
          username: '정우주',
          part: 'BE',
          team_vibe: '배우면서 즐겁게',
          active_hours: '밤',
          meeting_preference: '대면',
        },
        {
          username: '심우준',
          part: 'FE',
          team_vibe: '배우면서 즐겁게',
          active_hours: '밤',
          meeting_preference: '비대면',
        },
      ],
    },
  ],
};

// 🔹 현재 화면에서 사용하는 최종 더미 Participant 리스트
export const PARTICIPANTS: Participant[] = applyMatchingResult(
  createParticipantsFromList(DUMMY_PARTICIPANTS_LIST.payload),
  DUMMY_MATCHING_RESULT,
);
