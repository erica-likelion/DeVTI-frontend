import * as S from './JoinRoom.styles'

import { useState } from 'react';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import { useNavigate } from 'react-router-dom';
import { validateParticipantCode, type RoomErrorResponse } from '@/services/room';
import { setCurrentRoomId } from '@/utils/globalState';

export default function JoinRoom() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isDisabled = text.trim().length === 0;

  const handleNext = async () => {
    if (!text.trim()) {
      alert('참가 코드를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // 참가 코드 검증
      const response = await validateParticipantCode(text.trim());
      
      // room_id를 전역 변수에 저장
      setCurrentRoomId(response.data.room_id);
      
      // 검증 성공시 PR 페이지로 이동하며 코드 전달
      navigate('/join-room/pr', {
        state: {
          participantCode: text.trim()
        }
      });
    } catch (error) {
      const roomError = error as RoomErrorResponse;
      
      if (roomError.code === 400) {
        // detail 배열에서 프로필 미등록 확인
        if (Array.isArray(roomError.detail) && roomError.detail.includes('작성된 프로필이 없습니다.')) {
          alert('프로필 등록을 먼저 완료해주세요.');
          navigate('/profile/edit');
          return;
        }
        alert('올바르지 않은 코드입니다.');
      } else if (roomError.code === 403) {
        alert('이미 참여한 방이거나 권한이 없습니다.');
      } else if (roomError.code === 404) {
        alert('유효하지 않은 참가 코드입니다.');
      } else {
        alert('코드 검증에 실패했습니다. 다시 시도해주세요.');
      }
      console.error('Validate code error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

      <BlackLTextButton 
        disabled={isDisabled || isLoading} 
        onClick={handleNext}
      >
        {isLoading ? '검증 중...' : '다음'}
      </BlackLTextButton>
    </S.Container>
  );
}
