import * as S from './JoinRoom.styles'

import { useState } from 'react';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import { useNavigate } from 'react-router-dom';

export default function JoinRoom() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const isDisabled = text.trim().length === 0;

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
    </S.Container>
  );
}
