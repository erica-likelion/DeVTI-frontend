import * as S from './JoinRoom.styles'
<<<<<<< HEAD
import { useState } from 'react';
import Modal from '@/components/modal/Modal';
=======

import { useState } from 'react';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import { useNavigate } from 'react-router-dom';
>>>>>>> origin

export default function JoinRoom() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const isDisabled = text.trim().length === 0;

<<<<<<< HEAD
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
=======
  return (
    <S.Container>
      <S.Title>매칭룸 참여하기</S.Title>

      <S.InputArea>
        <S.Label>일반 입장 코드</S.Label>
        <S.Input>
          <InputField 
            type="text"
            placeholder=""
            value={text}
            onChange={(e) => setText(e.target.value)}
            hasIcon={false}
          />
        </S.Input>
      </S.InputArea>

      <BlackLTextButton disabled={isDisabled} onClick={() => navigate(`/join-room/pr`) }>
        다음
      </BlackLTextButton>
>>>>>>> origin
    </S.Container>
  );
}
