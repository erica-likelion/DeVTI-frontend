import * as S from './HomePage.styles';

/**
 * Home Page Component
 * TODO: 실제 홈페이지 내용으로 교체
 */
export default function HomePage() {
  return (
    <S.Container>
      <S.Title>개비티아이 FE 아지트</S.Title>
      <S.Description>
        개비티아이🐩 프론트 파이팅
      </S.Description>
      <S.InfoBox>
        <h3>뿌용뿌용</h3>
        <p>메인 홈으로 사용될 페이지를 스타일이랑, tsx 파일 분리를 예시로 보여주기 위해 임시로 만들어둔 페이지 입니다! 폴더 내 파일 구성과, 파일 내 로직은 봄, 가을 축제와 거의 똑같이 만들어뒀어요!!</p>
      </S.InfoBox>
      <S.Note>
        레이아웃 연결을 확인하기 위해 만든 페이지이니 파일 구조랑, 레이아웃 및 라우터 연결이 잘 되어 있는지 확인 부탁드려요!
      </S.Note>
    </S.Container>
  );
}