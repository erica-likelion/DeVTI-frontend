// Room.tsx
import { useEffect, useState, useRef, useMemo, useCallback  } from 'react';
import * as S from './Room.styles';
import { createParticipantsFromApi, type ApiUsersResponse } from './RoomParticipants';
import { type Participant } from '../room/RoomParticipants';
import { getCurrentRoomId } from '@/utils/globalState';
import axiosInstance, { getAuthToken } from '@/lib/AxiosInstance';


import RoomBeforeMatch from './RoomBeforeMatch';
import RoomAfterMatch from './RoomAfterMatch';

type WsEnvelope =
  | { type: 'participants.list'; payload: ApiUsersResponse } // 예: payload 안에 users, matching_at, recommend_reason 등이 있다고 가정
  | { type: 'participant.new'; payload: { user: any } }      // 예: 새 유저 1명 정보
  | { type: 'room.state_change'; payload: { state: 'WAGGING' | 'MATCHED' | string } };

const VITE_WSS_BASE_URL = `wss://www.devti.site`; // ex) wss://devti.site/ws
const TEST_TOKEN = import.meta.env.VITE_TEST_AUTH_TOKEN;

console.log(TEST_TOKEN)

const Room = () => {
  const roomId = getCurrentRoomId();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [recommendReason, setRecommendReason] = useState('');
  const [isMatched, setIsMatched] = useState(false);
  const [isWagging, setIsWagging] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);

  // ✅ WAGGING 때 REST 재호출 중복 방지
  const didRefetchOnWaggingRef = useRef(false);

  const wsUrl = useMemo(() => {
    const token = getAuthToken();
    if (!roomId || !token) return '';
    return `${VITE_WSS_BASE_URL}/ws/room/${roomId}/?token=${token}`;
  }, [roomId]);

  const fetchParticipants = useCallback(async () => {
  try {
    if (!roomId) return;

    const { data } = await axiosInstance.get<ApiUsersResponse>(`/api/users/${roomId}`);

    setRecommendReason(data.recommend_reason ?? '');
    setParticipants(createParticipantsFromApi(data));
  } catch (e) {
    console.error(e);
  }
}, [roomId]);

  useEffect(() => {
    if (!wsUrl) return;
    const ws = new WebSocket(wsUrl);
    
    fetchParticipants();

    wsRef.current = ws;

    ws.onopen = () => {
      console.log('[WS] connected');
    };

    ws.onmessage = (event) => {
      try {
        const msg: WsEnvelope = JSON.parse(event.data);

        switch (msg.type) {
          case 'participants.list': {
            const data = msg.payload;
            console.log(data);
            setParticipants(createParticipantsFromApi(data));
            return;
          }

          case 'participant.new': {
            const newUser = msg.payload.user;
            console.log(newUser);

            setParticipants((prev) => {
              const nextOne: Participant = {
                id: newUser.id,
                name: newUser.name,
                role: newUser.role,
                team: newUser.team,
                keywords: newUser.keywords ?? [],
              } as any;

              const exists = prev.some((p) => p.id === nextOne.id);
              if (exists) {
                return prev.map((p) => (p.id === nextOne.id ? { ...p, ...nextOne } : p));
              }
              return [...prev, nextOne];
            });
            return;
          }

          case 'room.state_change': {
            const { state } = msg.payload;

            if (state === 'WAGGING') {
              setIsWagging(true);

              // ✅ WAGGING 시작 시점에 REST로 전체 재동기화 1회
              if (!didRefetchOnWaggingRef.current) {
                didRefetchOnWaggingRef.current = true;
                fetchParticipants();
              }
            }

            if (state === 'MATCHED') {
              setIsMatched(true);
            }

            return;
          }

          default:
            return;
        }
      } catch (e) {
        console.error('[WS] message parse error', e);
      }
    };

    ws.onerror = (e) => console.error('[WS] error', e);

    ws.onclose = () => {
      console.log('[WS] disconnected');
      wsRef.current = null;
    };

    return () => {
      ws.close();
    };
  }, [wsUrl, fetchParticipants]);

  return (
    <S.Container>
      {isMatched ? (
        <RoomAfterMatch participants={participants} recommendReason={recommendReason} />
      ) : (
        <RoomBeforeMatch
          participants={participants}
          recommendReason={recommendReason}
          isWagging={isWagging}
        />
      )}
    </S.Container>
  );
};

export default Room;