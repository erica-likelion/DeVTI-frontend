import * as S from './JoinRoom.styles'

import WtLMemberList from '@/components/list/WtLMemberList';
import img from '/DefaultIMG_Profile.webp';



const JoinRoom = () => {
  return (
    <S.Container >
      <WtLMemberList icon={img} header="김사자" keywords={[['낮', '대면'], ['PM'], ['배우면서 즐겁게']]} onClick={() => console.log('Clicked!')} />
      <WtLMemberList icon={img} header="김사자" keywords={[['낮', '대면'], ['PM'], ['배우면서 즐겁게']]} rightButton="꼬리 흔들기" onClick={() => console.log('Clicked!')} />
    </S.Container>
  );
};

export default JoinRoom;