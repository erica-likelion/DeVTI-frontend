import { useEffect, useState } from 'react';
import * as S from './Room.styles';
import RoleTabs from '@/components/Tabs/RoleTabs';
import WtLMemberList from '@/components/list/WtLMemberList';
import InputFieldL from '@/components/Input/InputFieldL';
import DropBox from '@/components/DropBox/DropBox';
import VT500SButton from '@/components/ButtonDynamic/VT500SButton';
import VT700LButton from '@/components/ButtonDynamic/VT700LButton';
import DefaultIMG_Profile from '/public/DefaultIMG_Profile.webp';
import Modal from '@/components/modal/Modal';
import SideSheet from './SideSheet';

import {
  PARTICIPANTS as INITIAL_PARTICIPANTS,
  type Participant,
  type RoleType,
} from './RoomParticipants';
import { BkLTextButton } from '@/components/ButtonStatic';

const ROLE_TABS = ['전체', 'PM', '디자인', '프론트엔드', '백엔드'] as const;
const TEAM_TABS = ['전체', '1팀', '2팀', '3팀', '4팀'] as const;

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
}

// 마감 시간(임시)
const MATCH_DEADLINE = new Date('2025-12-31T23:59:59+09:00');

type RoleTab = (typeof ROLE_TABS)[number];
type TeamTab = (typeof TEAM_TABS)[number];
type TabValue = RoleTab | TeamTab;
type ModalType = 'wagging' | 'carrot' | null;


const calcRemainingTime = (): RemainingTime => {
  const now = new Date().getTime();
  const diff = MATCH_DEADLINE.getTime() - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEnded: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isEnded: false,
  };
};


const Room = () => {

  const [participants] = useState<Participant[]>(INITIAL_PARTICIPANTS);
  const [selectedTab, setSelectedTab] = useState<TabValue>('전체');
  const [remainingTime, setRemainingTime] = useState<RemainingTime>(
    () => calcRemainingTime(),
  );
  const [isMatchedByServer, setIsMatchedByServer] = useState(false);

  // 🔹 꼬리 흔들기 상태 (room.state_change → WAGGING 에서 true)
  const [isWagging, setIsWagging] = useState(false);
  const [Waggingfinished, setWaggingFinished] = useState(false);
  const [isCarrotDisabled, setIsCarrotDisabled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calcRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 타이머가 끝났거나 서버에서 매칭 완료 신호를 받으면 isEnded = true
  const isEnded = remainingTime.isEnded || isMatchedByServer;

  useEffect(() => {
    setSelectedTab('전체');
  }, [isEnded]);

  const tabs = isEnded ? TEAM_TABS : ROLE_TABS;

  const handleChangeTab = (value: string) => {
    setSelectedTab(value as TabValue);
  };


  // 전체 인원 / 팀 수 계산
  const totalMembers = participants.length;
  const teamCount = new Set(
    participants
      .map(p => p.team)
      .filter((t): t is number => typeof t === 'number'),
  ).size;

  let filteredParticipants = participants;

  if (!isEnded) {
    // 매칭 전 
    if (selectedTab !== '전체') {
      filteredParticipants = participants.filter(
        p => p.role === (selectedTab as RoleType),
      );
    }
  } else {
    // 매칭 후 
    if (selectedTab !== '전체') {
      const teamNo = parseInt((selectedTab as string).replace('팀', ''), 10);
      filteredParticipants = participants.filter(p => p.team === teamNo);
    }
  }


  const [modalType, setModalType] = useState<ModalType>(null);
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | number | null>(null);
  const [giveWagging, setgiveWagging] = useState(false);
    
  const GiveWagging = async (waggeeId: number) => {
    
    try {
      await fetch('https://devti.site/api/matching/wagging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wagger: 1, waggee: waggeeId }),
      });
    } catch (e) {
      console.error(e);
    }

  };

  const openSideSheet = (id: string | number) => {
    setSelectedParticipantId(id);
    setIsSideSheetOpen(true);
  };

  const closeSideSheet = () => {
    setSelectedParticipantId(null);
    setIsSideSheetOpen(false);
  };
  
     // 모달 열기
  const openWaggingModal = () => {
    setModalType('wagging');
  };

  const openCarrotModal = () => {
    if (isCarrotDisabled) return;  // 이미 한 번 흔들었으면 막기
    setModalType('carrot');
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setModalType(null);
  };

  // 꼬리 흔들기 확정시
  const handleWaggingFinished = () => {
    setWaggingFinished(true);
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

  // 공통 모달 핸들러
  const handleModalPrimary = () => {
    if (modalType === 'wagging') {
      handleWaggingFinished();
    } else if (modalType === 'carrot') {
      handleCarrotClick();
    }
  };



  /* 
    //백엔드 연결 용

    useEffect(() => {
      const socket = new WebSocket(WS_URL);

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        switch (msg.type) {
          case 'participants.list':
            setParticipants(
              createParticipantsFromList(msg.payload) // RoomParticipants.ts 에서 import
            );
            break;

          case 'participant.new':
            setParticipants(prev => [
              ...prev,
              mapSocketParticipant(msg.payload, prev.length + 1),
            ]);
            break;

          if (new_state === 'WAGGING') {
            setIsWagging(true);  
          }
            break;

          case 'matching.result':
            setParticipants(prev => applyMatchingResult(prev, msg.payload));
            setIsMatchedByServer(true);
            break;
        }
      };

      return () => socket.close();
    }, []);
  */

  const handleWagging = () => {
    setIsWagging(true);
  }

  const handleEndMatching = () => {
    setIsMatchedByServer(true);
  }


  return (
    <S.Container>

      <S.TopSection>
        {isEnded ? (
          <>
            <S.Title>매칭이 완료되었습니다!</S.Title>
            <S.CountdownText>
              전체 {totalMembers}명 / {teamCount}팀
            </S.CountdownText>
          </>
        ) : (
          <>
            <S.Title>매칭 시작까지</S.Title>
            <S.CountdownText>
              {remainingTime.days}일 {remainingTime.hours}시간{' '}
              {remainingTime.minutes}분 {remainingTime.seconds}초
            </S.CountdownText>
          </>
        )}

        <S.SubTitle>
          {isEnded
            ? ''
            : !isWagging ? '아직 팀원들이 다 입장하지 않았어요. 팀원들을 조금만 기다려볼까요?' : '매칭이 시작되기 전까지 꼬리를 흔들어 팀원을 찾아봐요'}
        </S.SubTitle>

      </S.TopSection>
      { isWagging && !isEnded ? 
        <VT700LButton children="꼬리 다 흔들었어요" disabled={Waggingfinished} onClick={openWaggingModal}/>
       : ""}


      <S.AISection>
        <S.AISectionHeader>
          <S.AITitle>
            {isEnded ? '우리 팀이 만나게 된 배경은' : 'AI 추천'}
          </S.AITitle>
        </S.AISectionHeader>

        <InputFieldL
          text="Lorem ipsum dolor sit amet consectetur. Hendrerit tellus bibendum risus auctor commodo dolor blandit lacinia. Nulla eu non phasellus et elit. Condimentum et nulla scelerisque justo quisque mauris risus mauris sapien. Fames a et tellus ipsum non arcu bibendum. Amet amet viverra sit felis. Nunc ultrices laoreet purus aliquet lectus dictumst elementum. Molestie molestie neque risus dignissim sed eget aenean eu. Nisl eget dignissim velit consequat eu at mauris neque. Placerat nunc sit ullamcorper in."
        />

        {isEnded && (
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
        )}
      </S.AISection>

      <S.ListSection>
        <S.ListHeaderRow>
          <RoleTabs tabs={tabs as unknown as string[]} onChange={handleChangeTab} />
        </S.ListHeaderRow>

        <S.MemberList>
          <S.MidSection>
            <S.TotalCount>
              {isEnded
                ? `전체 ${totalMembers}명`
                : `전체 ${filteredParticipants.length}명`}
            </S.TotalCount>

            <DropBox
              value={isEnded ? '이름순' : 'AI 추천순'}
              size="M"
              isOpen={false}
              options={['AI 추천순']}
              disabled
            />
          </S.MidSection>

          {filteredParticipants.map(participant => (
            <WtLMemberList
              key={participant.id}
              icon={DefaultIMG_Profile}
              header={participant.username}
              keywords={participant.keywords}
              rightButton={isWagging && !isEnded && !Waggingfinished ? participant.rightButton : false}
              disabled={participant.disabled}
              onClick={() => openSideSheet(participant.id)}
             onRightButtonClick={() => GiveWagging(participant.id)}
            />
          ))}
        </S.MemberList>

        <S.Temp>
          <BkLTextButton children="꼬리 흔들기 시작" onClick={handleWagging} />
          <BkLTextButton children="매칭 종료" onClick={handleEndMatching} />
        </S.Temp>
      </S.ListSection>

      

      <Modal isOpen={modalType === 'wagging'} buttonLabel="확정" onClose={handleCloseModal} onPrimary={handleModalPrimary}>
        <span>함께 하고 싶은 분들께 꼬리를 다 흔들었나요? </span>
        <span>한번 확정하면 다시 꼬리를 흔들 수 없어요</span>
      </Modal>

      <Modal isOpen={modalType === 'carrot'} buttonLabel="당근 흔들기" onClose={handleCloseModal} onPrimary={handleModalPrimary}>
        <span>정말 팀을 바꾸고 싶으신가요? </span>
        <span>이 결정은 번복할 수 없습니다.</span>
      </Modal>

      <S.SheetWrapper $open={isSideSheetOpen}>
        <SideSheet participantId={selectedParticipantId} onClose={closeSideSheet} />
      </S.SheetWrapper>

    </S.Container>
  );
};

export default Room;
