// pages/Room.tsx (또는 적절한 위치)
import { useState } from 'react';
import * as S from './ManageRoomMatched.styles';

import SegmentControl from '@/components/SegmentControl/SegmentControlTransparent';
import BlackMTextButton from '@/components/ButtonStatic/BkMTextButton';
import { WtMTextButton } from '@/components/ButtonStatic';
import WtMMemberList from '@/components/list/WtMMemberList';

const TOP_TABS = ['매칭 팀', '대시보드', '리매칭'] as const;
type TopTab = (typeof TOP_TABS)[number];

import {
  MATCHING_RESULT_DUMMY,
  type Team,
  type Member,
  type Part,
} from './MatchingResult';

  const formatPartLabel = (part: Part): string => {
    switch (part) {
      case 'PM':
        return 'PM';
      case 'FE':
        return '프론트엔드';
      case 'BE':
        return '백엔드';
      case 'DE':
        return '디자인';
      case 'AI':
        return 'AI';
      default:
        return part;
    }
  }


const Room = () => {
  const [selectedTopTab, setSelectedTopTab] = useState<TopTab>('매칭 팀');

  const teams: Team[] = MATCHING_RESULT_DUMMY.payload.teams;

  return (
    <S.Container>
      {/* Top Area */}
      <S.TopArea>
        <S.TitleBlock>
          <S.Title>매칭이 완료되었어요!</S.Title>
          <S.Subtitle>전체 00명 / 00팀</S.Subtitle>
        </S.TitleBlock>

        <BlackMTextButton children="매칭 확정" />
      </S.TopArea>

  
      <SegmentControl
        options={TOP_TABS as unknown as string[]}
        value={selectedTopTab}
        onChange={(val) => setSelectedTopTab(val as TopTab)}
      />


      <S.ListArea>
        {teams.map((team) => {
          
          return (
						<S.MemberListWrapper key={team.team_number}>
							<S.TeamArea>
								<S.TeamName>{`${team.team_number} 팀`}</S.TeamName>
								<WtMTextButton>AI 매칭 근거</WtMTextButton>
							</S.TeamArea>
							{team.members.map((member) => (
								<WtMMemberList
									key={member.user_id}
									header={member.username}
									keywords={[

										[formatPartLabel(member.part)],
										[member.team_vibe],
										[
											`${member.active_hours}`,
											`${member.meeting_preference}`,
										],
									]}
									// 필요하면 disabled / onClick 도 여기서 내려주면 됨
									disabled={false}
								/>
							))}
        </S.MemberListWrapper>
      );
    })}
      </S.ListArea>
    </S.Container>
  );
};

export default Room;
