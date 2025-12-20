import * as S from './ManageRoomDefault.styles';
import ManageRoomDefault from './ManageRoomDefault';
import ManageRoomMatched from './ManageRoomMatched';
import { useRoomSocket } from '@/hooks/useRoomSocket';
import { getCurrentRoomId } from '@/utils/globalState';

const TEST_TOKEN = import.meta.env.VITE_TEST_AUTH_TOKEN;

const ManageRoomPage = () => {
  const roomId = getCurrentRoomId();

  const {
    participants,
    matchingAt,
    isMatched,
    isWagging,
  } = useRoomSocket(roomId, TEST_TOKEN);

  return (
    <S.Container>
      {!isMatched ? (
        <ManageRoomDefault participants={participants} matching_at={matchingAt} Wagging={isWagging} />
      ) : (
        <ManageRoomMatched  />
      )}
    </S.Container>
  );
};

export default ManageRoomPage;
