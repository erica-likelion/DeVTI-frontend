import { useMemo, useState } from 'react';
import * as S from './Room.styles';
import type { Participant } from './RoomParticipants';

import RoleTabs from '@/components/Tabs/RoleTabs';
import WtLMemberList from '@/components/list/WtLMemberList';
import InputFieldL from '@/components/Input/InputFieldL';
import DropBox from '@/components/DropBox/DropBox';
import VT500SButton from '@/components/ButtonDynamic/VT500SButton';
import DefaultIMG_Profile from '/public/DefaultIMG_Profile.webp';
import Modal from '@/components/modal/Modal';
import SideSheet from './SideSheet';

type ModalType = 'carrot' | null;


interface Props {
  participants: Participant[];
  recommendReason: string;
}

const RoomAfterMatch = ({ participants, recommendReason}: Props) => {

  const [isCarrotDisabled, setIsCarrotDisabled] = useState(false);


  const { teamCount, teamTabs } = useMemo(() => {
    const teams = participants
      .map(p => p.team)
      .filter((t): t is number => typeof t === 'number' && Number.isFinite(t));

    const maxTeam = teams.length > 0 ? Math.max(...teams) : 0;

    const tabs = ['전체', ...Array.from({ length: maxTeam }, (_, i) => `${i + 1}팀`)] as const;

    return {
      teamCount: maxTeam,
      teamTabs: tabs,
    };
  }, [participants]);

  type TeamTab = (typeof teamTabs)[number];
  const [selectedTab, setSelectedTab] = useState<TeamTab>('전체');

  const handleChangeTab = (value: string) => {
    setSelectedTab(value as TeamTab);
  };

  const visibleParticipants = useMemo(() => {
    if (selectedTab === '전체') return participants;

    const teamNumber = Number(selectedTab.replace('팀', ''));
    if (!Number.isFinite(teamNumber)) return participants;

    return participants.filter(p => p.team === teamNumber);
  }, [participants, selectedTab]);

  // 전체 인원 / 팀 수 계산
  const totalMembers = participants.length;

  const [modalType, setModalType] = useState<ModalType>(null);
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | number | null>(null);

  const openSideSheet = (id: string | number) => {
    setSelectedParticipantId(id);
    setIsSideSheetOpen(true);
  };

  const closeSideSheet = () => {
    setSelectedParticipantId(null);
    setIsSideSheetOpen(false);
  };
  
  const openCarrotModal = () => {
    if (isCarrotDisabled) return;  // 이미 한 번 흔들었으면 막기
    setModalType('carrot');
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModalType(null);
  };


  const handleCarrotClick = async () => {
    if (isCarrotDisabled) return;

    setIsCarrotDisabled(true);

    /*
    try {
      await axios.post('/api/matching/carrot/{participant_id}');
    } catch (error) {
      console.error('당근 흔들기 API 호출 실패:', error);
      // setIsCarrotDisabled(false);
    }
    */
    setModalType(null);
  };

  return (
    <S.Container>

      <S.TopSection>

        <S.Title>매칭이 완료되었습니다!</S.Title>
        <S.CountdownText>
          전체 {totalMembers}명 / {teamCount}팀
        </S.CountdownText>

      </S.TopSection>


      <S.AISection>
        <S.AISectionHeader>
          <S.AITitle>
            우리 팀이 만나게 된 배경은
          </S.AITitle>
        </S.AISectionHeader>

        <InputFieldL text={recommendReason || '-'} />

        <S.MidSection>
          <S.SubTitle>
            내 팀이 마음에 들지 않는다면, 당근을 흔들어 운영진에게 알릴 수 있어요.
          </S.SubTitle>
          <VT500SButton
            children="당근 흔들기"
            disabled={isCarrotDisabled}
            onClick={openCarrotModal}
          />
        </S.MidSection> 
      </S.AISection>

      <S.ListSection>
        <S.ListHeaderRow>
          <RoleTabs tabs={teamTabs as unknown as string[]} onChange={handleChangeTab} />
        </S.ListHeaderRow>

        <S.MemberList>
          <S.MidSection>
            <S.TotalCount>
               `전체 ${totalMembers}명`
            </S.TotalCount>

            <DropBox
              value={'이름순'}
              size="M"
              isOpen={false}
              options={['AI 추천순']}
              disabled
            />
          </S.MidSection>

          {visibleParticipants.map(participant => (
            <WtLMemberList
              key={participant.id}
              icon={DefaultIMG_Profile}
              header={participant.username}
              keywords={participant.keywords}
              rightButton={false}
              disabled={participant.wagging}
              onClick={() => openSideSheet(participant.id)}

            />
          ))}
        </S.MemberList>
      </S.ListSection>


      <Modal isOpen={modalType === 'carrot'} buttonLabel="당근 흔들기" onClose={handleCloseModal} onPrimary={handleCarrotClick}>
        <span>정말 팀을 바꾸고 싶으신가요? </span>
        <span>이 결정은 번복할 수 없습니다.</span>
      </Modal>

      <S.SheetWrapper $open={isSideSheetOpen}>
        <SideSheet participantId={selectedParticipantId} onClose={closeSideSheet} />
      </S.SheetWrapper>

    </S.Container>
  );
};

export default RoomAfterMatch;
