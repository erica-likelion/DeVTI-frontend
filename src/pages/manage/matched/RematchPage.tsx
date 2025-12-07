import * as S from './RematchPage.styles';
import { WtMTextButton } from '@/components/ButtonStatic';
import WtMMemberList from '@/components/list/WtMMemberList';
import BlackMTextButton from '@/components/ButtonStatic/BkMTextButton';
import type { Team, Part } from '../MatchingResult';

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


interface ManageRoomMatchedTeamProps {
  teams: Team[];
}

const RematchPage = ({ teams }: ManageRoomMatchedTeamProps) => {

  const maxRematchCount = 2;
  const usedRematchCount = 0;
  const remainingRematchCount = maxRematchCount - usedRematchCount;

  return (
    <S.ListArea>
      {teams.map((team) => (
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
              disabled={false}
            />
          ))}
        </S.MemberListWrapper>
    ))}

    <S.TextArea>
      <S.Text>AI 매칭의 정확도를 위해 리매칭 횟수는 최대 2회로 제한됩니다.</S.Text>
      <S.Text>잔여 횟수: {remainingRematchCount}회</S.Text>
    </S.TextArea>

    <BlackMTextButton children="리매칭" onClick={() => {}} />
    
    </S.ListArea>
  );
};

export default RematchPage;
