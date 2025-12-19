import * as S from './Room.styles';
import RoomBeforeMatch from './RoomBeforeMatch';
import RoomAfterMatch from './RoomAfterMatch';
import { useRoomSocket } from '@/hooks/useRoomSocket';

const TEST_TOKEN = import.meta.env.VITE_TEST_AUTH_TOKEN;
const TEST_TOKEN2 = '6744a2a5e8555e3f0c69bb3f6b269c761c1540d9';

const Room = () => {
  const roomId = 14;

  const {
    participants,
    recommendReason,
    matchingAt,
    isMatched,
    isWagging,
  } = useRoomSocket(roomId, TEST_TOKEN2);

  console.log(`룸에서 ${isWagging}`);

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
