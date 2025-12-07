// pages/Room.tsx (또는 적절한 위치)
import { useState } from 'react';
import * as S from './ManageRoomMatched.styles';

import SegmentControl from '@/components/SegmentControl/SegmentControlTransparent';
import BlackMTextButton from '@/components/ButtonStatic/BkMTextButton';
import MatchedTeamPage from './matched/MatchedTeamPage';
import RematchPage from './matched/RematchPage';
import DashboardPage from './matched/DashboardPage';

import {
  MATCHING_RESULT_DUMMY,
  type Team,
  type MatchingResult,
} from './MatchingResult';

const TOP_TABS = ['매칭 팀', '대시보드', '리매칭'] as const;
type TopTab = (typeof TOP_TABS)[number];


const ManageRoomMatched = () => {
  const [matchingResult] = useState<MatchingResult>(MATCHING_RESULT_DUMMY);

  const [selectedTopTab, setSelectedTopTab] =
    useState<TopTab>('매칭 팀');

  const teams: Team[] = matchingResult.payload.teams;

  const teamCount = teams.length;
  const totalMembers = teams.reduce(
    (sum, team) => sum + team.members.length,
    0
  );

  return (
    <S.Container>
      {/* Top Area */}
      <S.TopArea>
        <S.TitleBlock>
          <S.Title>매칭이 완료되었습니다!</S.Title>
          <S.Subtitle>전체 {totalMembers}명 / {teamCount}팀</S.Subtitle>
        </S.TitleBlock>

        <BlackMTextButton children="매칭 확정" />
      </S.TopArea>

  
      <SegmentControl
        options={TOP_TABS as unknown as string[]}
        value={selectedTopTab}
        onChange={(val) => setSelectedTopTab(val as TopTab)}
      />

      {selectedTopTab === '매칭 팀' && (
        <MatchedTeamPage teams={teams} />
      )}

      {selectedTopTab === '대시보드' && (
        <DashboardPage />
      )}


      {selectedTopTab === '리매칭' && (
        <RematchPage teams={teams} />
      )}
    </S.Container>
  );
};

export default ManageRoomMatched;
