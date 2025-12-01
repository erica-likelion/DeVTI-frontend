import * as S from './JoinRoom.styles'
import { useState } from 'react';
import Modal from '@/components/modal/Modal';


const JoinRoom = () => {

  const [handleOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  }
  return (
    <S.Container>
        <Modal isOpen={handleOpen} buttonLabel="확인" onClose={handleClose}>
          <span>입장 코드가 일치하지 않습니다.</span>
          <span>다시 입력해주세요.</span>
        </Modal>  
    </S.Container>
  );
};

export default JoinRoom;