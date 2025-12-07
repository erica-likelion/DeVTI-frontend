// 대시보드 페이지 임시 상수 데이터

// 기본값
export const DEFAULT_TOTAL_MEMBERS = 53;
export const DEFAULT_TOTAL_TEAMS = 5;

// 파트별 분포 데이터
export const PART_DATA = [
  { name: 'PM', value: 12 },
  { name: '디자인', value: 8 },
  { name: '프론트엔드', value: 15 },
  { name: '백엔드', value: 18 },
];

// 팀별 파트 분포 데이터
export const TEAM_DATA = [
  { name: '1팀', PM: 4, 디자인: 3, 프론트엔드: 1, 백엔드: 2 },
  { name: '2팀', PM: 3, 디자인: 1, 프론트엔드: 2, 백엔드: 1 },
  { name: '3팀', PM: 1, 디자인: 1, 프론트엔드: 1, 백엔드: 1 },
  { name: '4팀', PM: 3, 디자인: 1, 프론트엔드: 2, 백엔드: 1 },
  { name: '5팀', PM: 3, 디자인: 1, 프론트엔드: 2, 백엔드: 1 },
];

// PM 타 직무 이해도 데이터
export const PM_UNDERSTANDING_DATA = [
  { name: '1팀', 'PM-디자인 이해도': 4, 'PM-개발 이해도': 2, 디자인: 2 },
  { name: '2팀', 'PM-디자인 이해도': 4, 'PM-개발 이해도': 1, 디자인: 3 },
  { name: '3팀', 'PM-디자인 이해도': 2, 'PM-개발 이해도': 1, 디자인: 1 },
  { name: '4팀', 'PM-디자인 이해도': 4, 'PM-개발 이해도': 1, 디자인: 2 },
  { name: '5팀', 'PM-디자인 이해도': 3, 'PM-개발 이해도': 1, 디자인: 2 },
];

// 팀별 역량 데이터 (Radar Chart용)
export const TEAM_SKILL_DATA = {
  팀1: [
    { skill: 'React', value: 5 },
    { skill: 'Vue.js', value: 5 },
    { skill: 'Node.js', value: 5 },
    { skill: 'Python', value: 5 },
    { skill: 'Spring', value: 5 },
  ],
  팀2: [
    { skill: 'React', value: 3 },
    { skill: 'Vue.js', value: 4 },
    { skill: 'Node.js', value: 2 },
    { skill: 'Python', value: 5 },
    { skill: 'Spring', value: 3 },
  ],
  팀3: [
    { skill: 'React', value: 2 },
    { skill: 'Vue.js', value: 1 },
    { skill: 'Node.js', value: 3 },
    { skill: 'Python', value: 4 },
    { skill: 'Spring', value: 5 },
  ],
  팀4: [
    { skill: 'React', value: 5 },
    { skill: 'Vue.js', value: 3 },
    { skill: 'Node.js', value: 4 },
    { skill: 'Python', value: 3 },
    { skill: 'Spring', value: 2 },
  ],
  팀5: [
    { skill: 'React', value: 3 },
    { skill: 'Vue.js', value: 2 },
    { skill: 'Node.js', value: 4 },
    { skill: 'Python', value: 5 },
    { skill: 'Spring', value: 4 },
  ],
};