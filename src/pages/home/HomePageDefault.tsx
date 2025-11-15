
import * as S from './HomePageDefault.styles';
import { Keyword } from '@/components/keywords/Keyword';

export default function HomePage() {
  

  return (
    <S.Container>
      <S.Title>참여 중인 매칭룸</S.Title>
      <S.ListWrapper>
        <Keyword items={['디자인', '프론트엔드']} color="green" size='s' />
        <Keyword items={['백엔드']} color="purple" size="s" />  
      </S.ListWrapper>
    </S.Container>
  );
}