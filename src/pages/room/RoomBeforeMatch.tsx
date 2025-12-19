import { useEffect, useState } from 'react';
import * as S from './Room.styles';

import RoleTabs from '@/components/Tabs/RoleTabs';
import WtLMemberList from '@/components/list/WtLMemberList';
import InputFieldL from '@/components/Input/InputFieldL';
import DropBox from '@/components/DropBox/DropBox';
import VT700LButton from '@/components/ButtonDynamic/VT700LButton';
import DefaultIMG_Profile from '/public/DefaultIMG_Profile.webp';
import Modal from '@/components/modal/Modal';
import SideSheet from './SideSheet';
import { getMatchingStartTime } from '@/utils/globalState';

import { BkLTextButton } from '@/components/ButtonStatic';

import {
  type Participant,
  ROLE_TABS,
  type RoleType,
} from './RoomParticipants';

interface Props {
  participants: Participant[];
  recommendReason: string;
  isWagging: boolean;
}

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
}

type RoleTab = (typeof ROLE_TABS)[number];
type TabValue = RoleTab;
type ModalType = 'wagging' | null;


const RoomBeforeMatch = ({ participants, recommendReason, isWagging }: Props) => {
  const [selectedTab, setSelectedTab] = useState<RoleType>('전체');
  const [isMatchedByServer, setIsMatchedByServer] = useState(false);
  const [Waggingfinished, setWaggingFinished] = useState(false);

  const calcRemainingTime = (): RemainingTime => {
    const now = new Date().getTime();
    const matching_at = getMatchingStartTime();
    
    if (!matching_at) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isEnded: true,
      };
    }
    
    const deadline = new Date(matching_at.replace(' ', 'T') + '+09:00');
    const diff = deadline.getTime() - now;

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

  const [remainingTime, setRemainingTime] = useState<RemainingTime>(() => calcRemainingTime());

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

  const tabs = ROLE_TABS;

  const handleChangeTab = (value: string) => {
    setSelectedTab(value as TabValue);
  };


  // 전체 인원 / 팀 수 계산
  const totalMembers = participants.length;


  const [modalType, setModalType] = useState<ModalType>(null);
  const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | number | null>(null);
  // const [giveWagging, setgiveWagging] = useState(false);
    
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

  // 꼬리 흔들기 확정시
  const handleWaggingFinished = () => {
    setWaggingFinished(true);
    setModalType(null);
  };


  const handleEndMatching = () => {
    setIsMatchedByServer(true);
  }


  return (
    <S.Container>
      <S.TopSection>
            <S.Title>매칭 시작까지</S.Title>
            <S.CountdownText>
              {remainingTime.days}일 {remainingTime.hours}시간{' '}
              {remainingTime.minutes}분 {remainingTime.seconds}초
            </S.CountdownText>
        <S.SubTitle>
          {!isWagging ? '아직 팀원들이 다 입장하지 않았어요. 팀원들을 조금만 기다려볼까요?' : '매칭이 시작되기 전까지 꼬리를 흔들어 팀원을 찾아봐요'}
        </S.SubTitle>
      </S.TopSection>

      { isWagging ? 
        <VT700LButton children="꼬리 다 흔들었어요" disabled={Waggingfinished} onClick={openWaggingModal}/>
       : ""}


      <S.AISection>
        { isWagging ? 
        <>
        <S.AISectionHeader>
          <S.AITitle>
            'AI 추천'
          </S.AITitle>
        </S.AISectionHeader>

        
        <InputFieldL text={recommendReason} />
        </>
       : ""}

        

      </S.AISection>

      <S.ListSection>
        <S.ListHeaderRow>
          <RoleTabs tabs={tabs as unknown as string[]} onChange={handleChangeTab} />
        </S.ListHeaderRow>

        <S.MemberList>
          <S.MidSection>
            <S.TotalCount>
              {`전체 ${totalMembers}명`}
            </S.TotalCount>

            <DropBox
              value={'AI 추천순'}
              size="M"
              isOpen={false}
              options={['AI 추천순']}
              disabled
            />
          </S.MidSection>

          {participants.map(participant => (
            <WtLMemberList
              key={participant.id}
              icon={DefaultIMG_Profile}
              header={participant.username}
              keywords={participant.keywords}
              rightButton={isWagging && !Waggingfinished && !participant.wagging ? '꼬리 흔들기': false}
              disabled={participant.wagging}
              onClick={() => openSideSheet(participant.id)}
              onRightButtonClick={() => GiveWagging(participant.id)}
            />
          ))}
        </S.MemberList>

        <S.Temp>
          <BkLTextButton children="꼬리 흔들기 시작" />
          <BkLTextButton children="매칭 종료" onClick={handleEndMatching} />
        </S.Temp>
      </S.ListSection>

      

      <Modal isOpen={modalType === 'wagging'} buttonLabel="확정" onClose={handleWaggingFinished}>
        <span>함께 하고 싶은 분들께 꼬리를 다 흔들었나요? </span>
        <span>한번 확정하면 다시 꼬리를 흔들 수 없어요</span>
      </Modal>


      <S.SheetWrapper $open={isSideSheetOpen}>
        <SideSheet participantId={selectedParticipantId} onClose={closeSideSheet} />
      </S.SheetWrapper>

    </S.Container>
  );
};

export default RoomBeforeMatch;
