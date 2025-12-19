// src/hooks/useRoomSocket.ts
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createParticipantsFromApi, type ApiUsersResponse } from '@/pages/room/RoomParticipants';
import type { Participant } from '@/pages/room/RoomParticipants';

type WsEnvelope =
  | { type: 'participants.list'; payload: ApiUsersResponse }
  | { type: 'participant.new'; payload: { user: any } }
  | { type: 'room.state_change'; payload: { state: 'WAGGING' | 'MATCHED' | string } }
  | { type: 'carrot.new'; payload: { participant_id: number } };

const VITE_WSS_BASE_URL = import.meta.env.VITE_WSS_BASE_URL;
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TEST_TOKEN = import.meta.env.VITE_TEST_AUTH_TOKEN;
const TEST_TOKEN2 = '6744a2a5e8555e3f0c69bb3f6b269c761c1540d9';

export function useRoomSocket(roomId: number, token: string) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [recommendReason, setRecommendReason] = useState('');
  const [matchingAt, setMatchingAt] = useState('');
  const [isMatched, setIsMatched] = useState(false);
  const [isWagging, setIsWagging] = useState(false);
	const [carrotParticipantIds, setCarrotParticipantIds] = useState<number[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const didRefetchOnWaggingRef = useRef(false);

  const wsUrl = useMemo(() => {
    return `${VITE_WSS_BASE_URL}/ws/room/${roomId}/?token=${token}`;
  }, [roomId]);

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
    wsRef.current = ws;

    // 최초 1회 REST로 동기화 (서버가 participants.list를 바로 안 줄 수도 있어서)
    fetchParticipants();

    ws.onmessage = (event) => {
      try {
        const msg: WsEnvelope = JSON.parse(event.data);

				console.log(msg);

        switch (msg.type) {
          case 'participants.list': {
            setParticipants(createParticipantsFromApi(msg.payload));
            setRecommendReason(msg.payload.recommend_reason ?? '');
            setMatchingAt(msg.payload.matching_at ?? '');

						console.log(participants);
            return;
          }

          case 'participant.new': {
						console.log("사람이 들어오네요~")
            const newUser = msg.payload.user;

            setParticipants((prev) => {
              const nextOne: Participant = {
                id: newUser.id,
                name: newUser.username,
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
						console.log(`웹소켓 상태 받은 후 ${state}`);

            if (state === 'WAGGING') {
              setIsWagging(true);

              // WAGGING 시점에 REST 1회 재동기화
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

          case 'carrot.new': {
            const { participant_id } = msg.payload;

            // ✅ 1) "당근 흔든 사람" 목록에 누적 (중복 방지)
            setCarrotParticipantIds((prev) => {
              if (prev.includes(participant_id)) return prev;
              return [...prev, participant_id];
            });

            return;
          }


          default:
            return;
        }
      } catch (e) {
        console.error('[WS] message parse error', e);
      }
    };

    ws.onclose = () => {
      wsRef.current = null;
			console.log("닫히네요~")
    };

    ws.onerror = (e) => console.error('[WS] error', e);

    return () => ws.close();
  }, [wsUrl, fetchParticipants]);

  return {
    participants,
    recommendReason,
    matchingAt,
    isMatched,
    isWagging,
		carrotParticipantIds,
    refetch: fetchParticipants,
  };
}
