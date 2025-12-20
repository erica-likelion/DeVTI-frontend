import * as S from './ManageRoomDefault.styles';
import ManageRoomDefault from './ManageRoomDefault';
import ManageRoomMatched from './ManageRoomMatched';
import { useRoomSocket } from '@/hooks/useRoomSocket';
import { getCurrentRoomId } from '@/utils/globalState';
import { getAuthToken } from '@/lib/AxiosInstance';

const ManageRoomPage = () => {
  const roomId = getCurrentRoomId();
  const token = getAuthToken();

  // roomId/token 없으면 소켓 연결 자체를 막아야 안전함
  const safeRoomId = roomId ?? 0;       // 훅 내부에서 0이면 연결 안 하게 만들면 가장 깔끔
  const safeToken = token ?? '';        // 빈 문자열이면 연결 안 하게

  const {
    participants,
    matchingAt,
    isMatched,
    isWagging,
  } = useRoomSocket(safeRoomId, safeToken);

  return (
    <S.Container>
      {!isMatched ? (
        <ManageRoomDefault
          participants={participants}
          matching_at={matchingAt}
          Wagging={isWagging}
        />
      ) : (
        <ManageRoomMatched />
      )}
    </S.Container>
  );
};

export default ManageRoomPage;
