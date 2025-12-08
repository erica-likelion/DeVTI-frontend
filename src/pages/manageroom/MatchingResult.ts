// matchingResult.mock.ts

export type Part = 'PM' | 'FE' | 'BE' | 'DE' | 'AI';

export type TeamVibe =
  | '배우면서 즐겁게'
  | '열정적으로 하루 종일'
  | '어디에서나 잘할 수 있어요';

export type ActiveHours = '낮' | '밤' | '유동적';
export type MeetingPreference = '대면' | '비대면' | '상관없음';

export interface Member {
  user_id: string;
  username: string;
  part: Part;
  team_vibe: TeamVibe;
  active_hours: ActiveHours;
  meeting_preference: MeetingPreference;
}

export interface Team {
  team_number: number;
  members: Member[];
}

export interface MatchingResultPayload {
  teams: Team[];
}

export interface MatchingResult {
  type: 'matching.result';
  payload: MatchingResultPayload;
}

export const MATCHING_RESULT_DUMMY: MatchingResult = {
  type: 'matching.result',
  payload: {
    teams: [
      {
        team_number: 1,
        members: [
          {
            user_id: '0001',
            username: '류현진',
            part: 'PM',
            team_vibe: '배우면서 즐겁게',
            active_hours: '낮',
            meeting_preference: '대면',
          },
          {
            user_id: '0002',
            username: '노시환',
            part: 'FE',
            team_vibe: '배우면서 즐겁게',
            active_hours: '낮',
            meeting_preference: '대면',
          },
          {
            user_id: '0003',
            username: '채은성',
            part: 'BE',
            team_vibe: '배우면서 즐겁게',
            active_hours: '밤',
            meeting_preference: '비대면',
          },
          {
            user_id: '0004',
            username: '문동주',
            part: 'DE',
            team_vibe: '열정적으로 하루 종일',
            active_hours: '유동적',
            meeting_preference: '상관없음',
          },
        ],
      },
      {
        team_number: 2,
        members: [
          {
            user_id: '0005',
            username: '최정',
            part: 'PM',
            team_vibe: '열정적으로 하루 종일',
            active_hours: '밤',
            meeting_preference: '비대면',
          },
          {
            user_id: '0006',
            username: '한유섬',
            part: 'FE',
            team_vibe: '열정적으로 하루 종일',
            active_hours: '밤',
            meeting_preference: '대면',
          },
          {
            user_id: '0007',
            username: '박성한',
            part: 'BE',
            team_vibe: '어디에서나 잘할 수 있어요',
            active_hours: '낮',
            meeting_preference: '대면',
          },
          {
            user_id: '0008',
            username: '최지훈',
            part: 'DE',
            team_vibe: '어디에서나 잘할 수 있어요',
            active_hours: '유동적',
            meeting_preference: '상관없음',
          },
          {
            user_id: '0009',
            username: '김광현',
            part: 'AI',
            team_vibe: '열정적으로 하루 종일',
            active_hours: '밤',
            meeting_preference: '비대면',
          },
        ],
      },
      {
        team_number: 3,
        members: [
          {
            user_id: '0010',
            username: '문현빈',
            part: 'PM',
            team_vibe: '배우면서 즐겁게',
            active_hours: '낮',
            meeting_preference: '대면',
          },
          {
            user_id: '0011',
            username: '정은원',
            part: 'FE',
            team_vibe: '배우면서 즐겁게',
            active_hours: '낮',
            meeting_preference: '상관없음',
          },
          {
            user_id: '0012',
            username: '하주석',
            part: 'BE',
            team_vibe: '어디에서나 잘할 수 있어요',
            active_hours: '밤',
            meeting_preference: '비대면',
          },
          {
            user_id: '0013',
            username: '최재훈',
            part: 'DE',
            team_vibe: '어디에서나 잘할 수 있어요',
            active_hours: '유동적',
            meeting_preference: '대면',
          },
        ],
      },
      {
        team_number: 4,
        members: [
          {
            user_id: '0014',
            username: '이태양',
            part: 'PM',
            team_vibe: '열정적으로 하루 종일',
            active_hours: '유동적',
            meeting_preference: '상관없음',
          },
          {
            user_id: '0015',
            username: '김서현',
            part: 'FE',
            team_vibe: '열정적으로 하루 종일',
            active_hours: '밤',
            meeting_preference: '비대면',
          },
          {
            user_id: '0016',
            username: '박상원',
            part: 'BE',
            team_vibe: '어디에서나 잘할 수 있어요',
            active_hours: '낮',
            meeting_preference: '대면',
          },
          {
            user_id: '0017',
            username: '엄상백',
            part: 'DE',
            team_vibe: '열정적으로 하루 종일',
            active_hours: '유동적',
            meeting_preference: '상관없음',
          },
          {
            user_id: '0018',
            username: '오태곤',
            part: 'AI',
            team_vibe: '어디에서나 잘할 수 있어요',
            active_hours: '밤',
            meeting_preference: '비대면',
          },
        ],
      },
      {
        team_number: 5,
        members: [
          {
            user_id: '0019',
            username: '김인환',
            part: 'PM',
            team_vibe: '배우면서 즐겁게',
            active_hours: '낮',
            meeting_preference: '대면',
          },
          {
            user_id: '0020',
            username: '심우준',
            part: 'FE',
            team_vibe: '배우면서 즐겁게',
            active_hours: '유동적',
            meeting_preference: '상관없음',
          },
          {
            user_id: '0021',
            username: '김강민',
            part: 'BE',
            team_vibe: '어디에서나 잘할 수 있어요',
            active_hours: '낮',
            meeting_preference: '대면',
          },
          {
            user_id: '0022',
            username: '최주환',
            part: 'DE',
            team_vibe: '열정적으로 하루 종일',
            active_hours: '밤',
            meeting_preference: '비대면',
          },
          {
            user_id: '0023',
            username: '이재원',
            part: 'AI',
            team_vibe: '어디에서나 잘할 수 있어요',
            active_hours: '유동적',
            meeting_preference: '상관없음',
          },
        ],
      },
    ],
  },
};
