import * as S from './ManageRoomDefault.styles';
import ManageRoomDefault from './ManageRoomDefault';
import ManageRoomMatched from './ManageRoomMatched';
import { useRoomSocket } from '@/hooks/useRoomSocket';
import { getCurrentRoomId } from '@/utils/globalState';

const TEST_TOKEN = import.meta.env.VITE_TEST_AUTH_TOKEN;
const TEST_TOKEN2 = '6744a2a5e8555e3f0c69bb3f6b269c761c1540d9';

const ManageRoomPage = () => {
  const roomId = getCurrentRoomId();

  const {
    participants,
    matchingAt,
    isMatched,
    isWagging,
    carrotParticipantIds
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
