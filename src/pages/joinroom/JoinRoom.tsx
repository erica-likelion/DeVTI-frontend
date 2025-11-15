import * as S from './JoinRoom.styles'

import RoleTabs from '../../components/Tabs/RoleTabs';


const JoinRoom = () => {
  return (
    <S.Container>
        <RoleTabs tabs={['전체', 'PM', '디자인', '프론트엔드', '백엔드']} onChange={(tab) => console.log(tab)} />



    </S.Container>
  );
};

export default JoinRoom;