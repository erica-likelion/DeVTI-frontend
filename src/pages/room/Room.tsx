// Room.tsx
import { useEffect, useState, useRef, useMemo, useCallback  } from 'react';
import * as S from './Room.styles';
import { createParticipantsFromApi, type ApiUsersResponse } from './RoomParticipants';
import { type Participant } from '../room/RoomParticipants';


import RoomBeforeMatch from './RoomBeforeMatch';
import RoomAfterMatch from './RoomAfterMatch';

type WsEnvelope =
  | { type: 'participants.list'; payload: ApiUsersResponse } // 예: payload 안에 users, matching_at, recommend_reason 등이 있다고 가정
  | { type: 'participant.new'; payload: { user: any } }      // 예: 새 유저 1명 정보
  | { type: 'room.state_change'; payload: { state: 'WAGGING' | 'MATCHED' | string } };

const VITE_WSS_BASE_URL = import.meta.env.VITE_WSS_BASE_URL; // ex) wss://devti.site/ws
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TEST_TOKEN = import.meta.env.VITE_TEST_AUTH_TOKEN;

console.log(TEST_TOKEN)

const Room = () => {
  const roomId = 1;

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [recommendReason, setRecommendReason] = useState('');
  const [matchingAt, setMatchingAt] = useState('');
  const [isMatched, setIsMatched] = useState(false);
  const [isWagging, setIsWagging] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);

  // ✅ WAGGING 때 REST 재호출 중복 방지
  const didRefetchOnWaggingRef = useRef(false);

  const wsUrl = useMemo(() => {
    return `${VITE_WSS_BASE_URL}/ws/room/${roomId}/?token=${TEST_TOKEN}`; // 필요하면 roomId/token 붙이기
  }, [roomId]);

  // ✅ REST로 participants 다시 불러오는 함수
  const fetchParticipants = useCallback(async () => {
    try {
      const res = await fetch(`${VITE_API_BASE_URL}/api/users/${roomId}`, {
        headers: {
          Authorization: `Bearer ${TEST_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data: ApiUsersResponse = await res.json();
      setRecommendReason(data.recommend_reason ?? '');
      setParticipants(createParticipantsFromApi(data));
      setMatchingAt(data.matching_at ?? '');
    } catch (e) {
      console.error(e);
    }
  }, [roomId]);

  useEffect(() => {
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
          matching_at={matchingAt}
          isWagging={isWagging}
        />
      )}
    </S.Container>
  );
};

export default Room;