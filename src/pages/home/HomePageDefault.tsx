import * as S from './HomePageDefault.styles';
import WtLMemberList from '../../components/list/WtLMemberList';
import img from '/DefaultIMG_Profile.webp';

export default function HomePage() {
  return (
    <S.Container>
      <S.Title>참여 중인 매칭룸</S.Title>
      <S.ListWrapper>
        <WtLMemberList icon={img} header="김사자" keywords={[['낮', '대면'], ['PM'], ['배우면서 즐겁게']]} rightButton="꼬리 흔들기" disabled={false} onClick={() => console.log('Clicked!')} />
      </S.ListWrapper>
    </S.Container>
  );
};
