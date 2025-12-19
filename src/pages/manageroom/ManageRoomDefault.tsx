import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import * as S from './ManageRoomDefault.styles';
import RoleTabs from '@/components/Tabs/RoleTabs';
import WtLMemberList from '../../components/managerlist/WtLMemberList';
import SegmentControl from '@/components/SegmentControl/SegmentControlTransparent';
import DropBox from '@/components/DropBox/DropBox';
import VT700LButton from '@/components/ButtonDynamic/VT700LButton';
import DefaultIMG_Profile from '/public/DefaultIMG_Profile.webp';

import { type Participant, ROLE_TABS, type RoleType } from '../room/RoomParticipants';

const TOP_TABS = ['전체', '꼬리 다 흔들지 않은 인원'] as const;
type TopTab = (typeof TOP_TABS)[number];
type RoleTab = (typeof ROLE_TABS)[number];
type TabValue = RoleTab;

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
}

interface Props {
  participants: Participant[];
  matching_at: string;
  Wagging?: boolean; // 처음 진입 시 서버 상태로 내려주면 사용, 없으면 false로 시작
}

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TEST_TOKEN = import.meta.env.VITE_TEST_AUTH_TOKEN;
const TEST_TOKEN2 = '6744a2a5e8555e3f0c69bb3f6b269c761c1540d9';

const ManageRoomDefault = ({ participants, matching_at, Wagging}: Props) => {

  const [localParticipants, setLocalParticipants] = useState<Participant[]>(participants);

  useEffect(() => {
    setLocalParticipants(participants);
  }, [participants]);

  const [selectedRoleTab, setSelectedRoleTab] = useState<RoleType>('전체');
  const [selectedTopTab, setSelectedTopTab] = useState<TopTab>('전체');

  const [isMatchedByServer, setIsMatchedByServer] = useState(false);
  const [isWagging, setIsWagging] = useState(Wagging);

  const calcRemainingTime = (): RemainingTime => {
    const now = new Date().getTime();
    const deadline = new Date(matching_at.replace(' ', 'T') + '+09:00');
    const diff = deadline.getTime() - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, isEnded: false };
  };

  const [remainingTime, setRemainingTime] = useState<RemainingTime>(() => calcRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => setRemainingTime(calcRemainingTime()), 1000);
    return () => clearInterval(timer);
    // matching_at이 바뀌는 케이스 있으면 deps에 넣는 게 안전
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEnded = remainingTime.isEnded || isMatchedByServer;

  useEffect(() => {
    setSelectedRoleTab('전체');
    setSelectedTopTab('전체');
  }, [isEnded]);

  const handleChangeRoleTab = (value: string) => {
    setSelectedRoleTab(value as TabValue);
  };

  const handleRemoveParticipant = (id: number) => {
    setLocalParticipants(prev => prev.filter(p => p.id !== id));
  };

  const handleWaggingClick = async () => {
    if (isWagging) return;
    const room_id = 14

    setIsWagging(true);

    try {
    await axios.post(
      `${VITE_API_BASE_URL}/api/matching/${room_id}/wagging-start/`,
      {}, // body가 없으면 빈 객체
      {
        headers: {
          Authorization: `Bearer ${TEST_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );
    } catch (error) {
      console.error('꼬리 흔들기 API 호출 실패:', error);

    }

    console.log(`꼬리 흔들기 요청 보낸 후 ${isWagging}`)
  };


  // 필터링된 참가자 리스트
  const filteredParticipants = useMemo(() => {
    return localParticipants.filter(p => {
      // 1) 역할 탭 필터
      if (selectedRoleTab !== '전체') {
        // TODO: Participant에 역할 필드명이 role인지 part인지 프로젝트에 맞게 수정
        const participantRole = (p as any).role ?? (p as any).part;
        if (participantRole !== selectedRoleTab) return false;
      }

      // 2) Top 탭: "꼬리 다 흔들지 않은 인원"
      if (selectedTopTab === '꼬리 다 흔들지 않은 인원') {
        // TODO: 참가자의 완료 여부 필드명에 맞게 수정
        // 예: p.waggingFinished === true면 완료, false면 미완료
        const finished = Boolean((p as any).waggingFinished);
        if (finished) return false;
      }

      return true;
    });
  }, [localParticipants, selectedRoleTab, selectedTopTab]);

  const totalMembers = localParticipants.length;
  const tabs = ROLE_TABS;

  return (
    <S.Container>
      <S.TopSection>
        <S.Title>매칭 시작까지</S.Title>
        <S.CountdownText>
          {remainingTime.days}일 {remainingTime.hours}시간 {remainingTime.minutes}분
        </S.CountdownText>

        <S.SubTitle>멋쟁이사자처럼 13기 장기프로젝트 - 운영진</S.SubTitle>
      </S.TopSection>

      {!isWagging ? (
        <VT700LButton
          children="꼬리 흔들기 시작"
          disabled={isWagging}
          onClick={handleWaggingClick}
        />
      ) : (
        <SegmentControl
          options={TOP_TABS as unknown as string[]}
          onChange={val => setSelectedTopTab(val as TopTab)}
        />
      )}

      <S.ListSection>
        <S.ListHeaderRow>
          <RoleTabs tabs={tabs as unknown as string[]} onChange={handleChangeRoleTab} />
        </S.ListHeaderRow>

        <S.MidSection>
          <S.TotalCount>전체 {totalMembers}명</S.TotalCount>

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
