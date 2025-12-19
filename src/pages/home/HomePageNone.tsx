import { useNavigate } from 'react-router-dom';
import * as S from './HomePageNone.styles';
import List from '../../components/Home/List';

export default function HomePageNone() {
  const navigate = useNavigate();

  const handleNavigateToNewRoomCode = () => {
    navigate('/new-room/code');
  };

  const handleNavigateToNewRoom = () => {
    navigate('/new-room');
  };


  const listItems = [
    {
      id: 1,
      content: [
        '참여 중인 매칭룸이 없어요.',
        '프로젝트 참가자라면, 입장 코드를 입력하여 매칭룸에 참여할 수 있어요.'
      ],
      buttonText: '매칭룸 참여',
      onClick: handleNavigateToNewRoomCode,
    },
    {
      id: 2,
      content: '프로젝트 운영진이라면, 새 매칭룸을 만들어봐요!',
      buttonText: '새 매칭룸',
      onClick: handleNavigateToNewRoom,
    },
  ];

  return (
    <S.Container>
      <S.Title>참여 중인 매칭룸</S.Title>
      <S.ListWrapper>
        <List items={listItems} />
      </S.ListWrapper>
    </S.Container>
  );
}