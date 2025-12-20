import * as S from './HomePageDefault.styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WtMList from '@/components/list/WtMList';
import { getMyRooms, type MyRoomInfo, type RoomErrorResponse } from '@/services/room';
import { handleError } from '@/utils/errorHandler';

export default function HomePage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<MyRoomInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getMyRooms();
        if (response.data.length === 0) {
          // 매칭룸이 없으면 /home/none으로 리다이렉트
          navigate('/home/none', { replace: true });
          return;
        }
        setRooms(response.data);
      } catch (error) {
        const roomError = error as RoomErrorResponse;
        // 404나 빈 데이터 관련 에러가 아닌 경우 에러 페이지로
        if (roomError.code && roomError.code >= 500) {
          handleError(error, { navigate });
          return;
        }
        // 404나 빈 데이터의 경우 /home/none으로 리다이렉트
        navigate('/home/none', { replace: true });
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [navigate]);

  const handleRoomClick = (room: MyRoomInfo) => {
    if (room.role === 'ADMIN') {
      // 운영진(내가 생성한 방)이면 관리 페이지로
      navigate('/manage/default');
    } else {
      // 참여자면 방 페이지로
      navigate(`/room/${room.id}`);
    }
  };

  if (isLoading) {
    return (
      <S.Container>
        <S.Title>참여중인 매칭룸</S.Title>
        <S.ListWrapper>
          <p>로딩 중...</p>
        </S.ListWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>참여중인 매칭룸</S.Title>
      <S.ListWrapper>
        {rooms.map((room) => (
          <WtMList
            key={room.id}
            header={room.name}
            body="운영진"
            showRightSection={room.role === 'ADMIN'}
            onClick={() => handleRoomClick(room)}
          />
        ))}
      </S.ListWrapper>
    </S.Container>
  );
};
