// src/pages/room/matchingResultMapper.ts
import type { Participant } from './RoomParticipants';

export type MatchingResultResponse = {
  status: string;
  code: number;
  data: {
    status: string;
    code: number;
    data: {
      teams: MatchedUser[][];
      // + 다른 필드가 더 있으면 여기 추가
    };
    detail: unknown;
  };
  message: string;
  detail: unknown;
};

export type MatchedUser = {
  id: number;
  pr: {
    username: string;
    part: 'PM' | 'DE' | 'FE' | 'BE' | string;
    team_vibe?: string;
    active_hours?: string;
    meeting_preference?: string;
  };
  profile: {
    devti?: string;
    comment?: string;
    part?: string;
    experienced?: string;
    strength?: string;
    portfolio_url?: string | null;
    github_url?: string | null;
    design_score?: number;
    development_score?: Array<[string, number]>;
    daily_time_capacity?: number;
    weekly_time_capacity?: number;
    design_understanding?: number;
    development_understanding?: number;
  };
};

// ✅ 매칭결과 teams -> Participant[]
export const createParticipantsFromMatchingResult = (
  res: MatchingResultResponse,
): Participant[] => {
  const teams = res?.data?.data?.teams ?? [];

  return teams.flatMap((teamUsers, teamIndex) => {
    const teamNumber = teamIndex + 1;

    return teamUsers.map((u) => {
      // keywords는 너희 WtLMemberList가 string[][] 로 받으니까
      // "한 줄에 여러 키워드" 형태로 구성
      const keywordsRow: string[] = [];

      // 1) 강점
      if (u.profile?.strength) {
        // "React, TypeScript" -> ["React", "TypeScript"]
        keywordsRow.push(
          ...u.profile.strength
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
        );
      }

      // 2) 경험(짧게)
      if (u.profile?.experienced) keywordsRow.push(u.profile.experienced.trim());

      // 3) devti(있으면)
      if (u.profile?.devti?.trim()) keywordsRow.push(u.profile.devti.trim());

      // 4) vibe/meeting(있으면)
      if (u.pr?.team_vibe) keywordsRow.push(u.pr.team_vibe);
      if (u.pr?.meeting_preference) keywordsRow.push(u.pr.meeting_preference);

      // keywordsRow가 너무 길면 UI 깨질 수 있으니 적당히 컷(원하면 숫자 조절)
      const keywords = [keywordsRow.slice(0, 6)];

      return {
        id: u.id,
        username: u.pr?.username?.trim() || String(u.id),
        role: (u.pr?.part || 'FE') as any,  // 너희 RoleType에 맞게 캐스팅
        team: teamNumber,
        keywords,
        wagging: false, // ✅ 당근 흔들기 여부/기타 상태 없으니 기본 false
      } as Participant;
    });
  });
};
