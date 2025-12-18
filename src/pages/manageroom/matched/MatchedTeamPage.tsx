import * as S from './MatchedTeamPage.styles';
import { WtMTextButton } from '@/components/ButtonStatic';
import WtMMemberList from '@/components/list/WtMMemberList';
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


interface MatchedTeamPageProps {
  teams: Team[];
}

const MatchedTeamPage = ({ teams }: MatchedTeamPageProps) => {

  return (
    <S.ListArea>
      {teams.map((team) => (
          <S.MemberListWrapper key={team.team_number}>
            <S.TeamArea>
              <S.TeamName>{`${team.team_number}팀`}</S.TeamName>
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
                disabled={true}
              />
            ))}
      </S.MemberListWrapper>
    ))}
    </S.ListArea>
  );
};

export default MatchedTeamPage;
