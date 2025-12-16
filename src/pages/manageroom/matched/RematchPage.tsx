import * as S from './RematchPage.styles';
import { useState } from 'react';
import { WtMTextButton } from '@/components/ButtonStatic';
import WtMMemberList from '@/components/list/WtMMemberList';
import BlackMTextButton from '@/components/ButtonStatic/BkMTextButton';
import Modal from '@/components/modal/Modal';
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  
    //모달 열기
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    // 모달 닫기
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    // 매칭 확정시
    const handleReMatching = () => {
      // TODO: 매칭 확정 API 호출 / 상태 업데이트 등
      setIsModalOpen(false);
    };

  return (
    <S.ListArea>
      {teams.map((team) => (
        <S.MemberListWrapper key={team.team_number} >
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

    <S.TextArea>
      <S.Text>AI 매칭의 정확도를 위해 리매칭 횟수는 최대 2회로 제한됩니다.</S.Text>
      <S.Text>잔여 횟수: {remainingRematchCount}회</S.Text>
    </S.TextArea>

    <BlackMTextButton children="리매칭" onClick={handleOpenModal} />
    

    <Modal isOpen={isModalOpen} buttonLabel="확인" onClose={handleCloseModal} onPrimary={handleReMatching}>
      <span>정말 리매칭하시겠어요? </span>
      <span>리매칭 횟수가 차감되며, 이전 팀 매칭으로 되돌릴 수 없습니다.</span>
    </Modal>
    </S.ListArea>
  );
};

export default RematchPage;
