import { useEffect, useState } from 'react';
import * as S from './ManageRoomDefault.styles';
import RoleTabs from '@/components/Tabs/RoleTabs';
import WtLMemberList from '../../components/managerlist/WtLMemberList';
import SegmentControl from '@/components/SegmentControl/SegmentControlTransparent';
import DropBox from '@/components/DropBox/DropBox';
import VT700LButton from '@/components/ButtonDynamic/VT700LButton';
import DefaultIMG_Profile from '/public/DefaultIMG_Profile.webp';

import {
  type Participant,
  type RoleType,
} from '../room/RoomParticipants';

const ROLE_TABS = ['전체', 'PM', '디자인', '프론트엔드', '백엔드'] as const;
const TOP_TABS = ['전체', '꼬리 다 흔들지 않은 인원'] as const;

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
type TopTab = (typeof TOP_TABS)[number];
type TabValue = RoleTab | TopTab; 

let tabs = ROLE_TABS;


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


const ManageRoomDefault = () => {

  const [participants, setParticipants] = useState<Participant[]>(Participant);
  const [selectedTab, setSelectedTab] = useState<TabValue>('전체');
  const [remainingTime, setRemainingTime] = useState<RemainingTime>(
    () => calcRemainingTime(),
  );
  const [isMatchedByServer] = useState(false);

	const handleRemoveParticipant = (id: number) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };

  // 🔹 꼬리 흔들기 상태 (room.state_change → WAGGING 에서 true)
  const [isWagging, setIsWagging] = useState(false);

  const handleWaggingClick = async () => {
    if (isWagging) return; 

    setIsWagging(true);

    /*
    try {
      await axios.post('/api/matching/carrot/{participant_id}');
    } catch (error) {
      console.error('꼬리 흔들기 API 호출 실패:', error);

      // setIsCarrotDisabled(false);
    }
    */
  };

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

  const handleChangeTab = (value: string) => {
    setSelectedTab(value as TabValue);
  };

  // 전체 인원 / 팀 수 계산
  const totalMembers = participants.length;
  let filteredParticipants = participants;

  if (selectedTab !== '전체') {
        filteredParticipants = participants.filter(
          p => p.role === (selectedTab as RoleType),
        );
      }

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



  return (
    <S.Container>

      <S.TopSection>
        <S.Title>매칭 시작까지</S.Title>
        <S.CountdownText>
          {remainingTime.days}일 {remainingTime.hours}시간{' '}
          {remainingTime.minutes}분 
        </S.CountdownText>

        <S.SubTitle>
          멋쟁이사자처럼 13기 장기프로젝트 - 운영진
        </S.SubTitle>
      </S.TopSection>

			{ !isWagging ? (
				<VT700LButton children="꼬리 흔들기 시작" disabled={isWagging} onClick={handleWaggingClick}/>
			) : (
				<SegmentControl
					options={TOP_TABS as unknown as string[]}
					onChange={(val) => setSelectedTab(val as TopTab)}/>
			)}
	

      <S.ListSection>
        <S.ListHeaderRow>
          <RoleTabs tabs={tabs as unknown as string[]} onChange={handleChangeTab} />
        </S.ListHeaderRow>

        <S.MidSection>
          <S.TotalCount>
         		전체 {totalMembers}명
          </S.TotalCount>

          <DropBox
            value={'최근 입장순'}
            size="M"
            isOpen={false}
            options={['최근 입장순']}
            disabled
          />
        </S.MidSection>

        <S.MemberList>
          {filteredParticipants.map(participant => (
            <WtLMemberList
              key={participant.id}
              icon={DefaultIMG_Profile}
              header={participant.username}
              keywords={participant.keywords}
              rightButton={'제거'}
              disabled={participant.disabled}
							onRightButtonClick={() => handleRemoveParticipant(participant.id)}
            />
          ))}
        </S.MemberList>
      </S.ListSection>
    </S.Container>
  );
};

export default ManageRoomDefault;