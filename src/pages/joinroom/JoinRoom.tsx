import * as S from './JoinRoom.styles'

import { useState } from 'react';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import { useNavigate } from 'react-router-dom';
import { validateParticipantCode, type RoomErrorResponse } from '@/services/room';
import { setCurrentRoomId } from '@/utils/globalState';
import Modal from '@/components/modal/Modal';
import { handleError } from '@/utils/errorHandler';

export default function JoinRoom() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<React.ReactNode>(null);
  const [modalButtonLabel, setModalButtonLabel] = useState('확정');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const navigate = useNavigate();

  const isDisabled = text.trim().length === 0;

  const openModal = (
    message: React.ReactNode,
    options?: { action?: () => void; buttonLabel?: string }
  ) => {
    setModalMessage(message);
    setModalAction(() => options?.action ?? null);
    setModalButtonLabel(options?.buttonLabel ?? '확정');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleModalPrimary = () => {
    setIsModalOpen(false);
    const action = modalAction;
    setModalAction(null);
    action?.();
  };

  const handleNext = async () => {
    if (!text.trim()) {
      openModal(
        <>
          <span>참가 코드를 입력해주세요.</span>
          <span>입장 코드를 확인한 뒤 다시 시도해주세요.</span>
        </>,
        { buttonLabel: '확인' }
      );
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
      console.error('Validate code full error:', error);
      const roomError = error as RoomErrorResponse;
      console.error('Room error details:', roomError);
      
      if (roomError.code === 400) {
        // detail 배열에서 프로필 미등록 확인
        if (Array.isArray(roomError.detail) && roomError.detail.includes('작성된 프로필이 없습니다.')) {
          openModal(
            <>
              <span>프로필 미작성 상태입니다.</span>
              <span>프로필 작성 후, 채팅룸 입장이 가능합니다.</span>
            </>,
            { action: () => navigate('/profile'), buttonLabel: '프로필 작성' }
          );
          return;
        }
        openModal(
          <>
            <span>입장코드가 일치하지 않습니다.</span>
            <span>다시 입력해주세요.</span>
          </>,
          { buttonLabel: '확인' }
        );
      } else if (roomError.code === 403) {
        openModal(
          <>
            <span>이미 참여한 방이거나 권한이 없습니다.</span>
            <span>권한을 확인한 뒤 다시 시도해주세요.</span>
          </>,
          { buttonLabel: '확인' }
        );
      } else if (roomError.code === 404) {
        openModal(
          <>
            <span>입장 코드가 일치하지 않습니다.</span>
            <span>다시 입력해주세요.</span>
          </>,
          { buttonLabel: '확인' }
        );
      } else {
        // 서버 에러나 네트워크 에러인 경우 에러 페이지로 이동
        handleError(error, { navigate });
        return;
      }
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
      
      <Modal
        isOpen={isModalOpen}
        buttonLabel={modalButtonLabel}
        onClose={handleCloseModal}
        onPrimary={modalAction ? handleModalPrimary : undefined}
      >
        {modalMessage}
      </Modal>
    </S.Container>
  );
}
