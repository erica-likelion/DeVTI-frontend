import * as S from './NewRoom.styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import { createRoom, formatDateTimeForAPI, type RoomErrorResponse } from '@/services/room';

export default function NewRoom() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [roomName, setRoomName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateRoom = async () => {
        if (!roomName.trim()) {
            alert('매칭룸 이름을 입력해주세요.');
            return;
        }

        if (!selectedDate) {
            alert('매칭 시작 날짜를 선택해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            // 선택된 날짜를 Date 객체로 변환 후 API 형식으로 포맷
            const matchingDate = new Date(selectedDate);
            const formattedDate = formatDateTimeForAPI(matchingDate);

            const result = await createRoom({
                room_name: roomName.trim(),
                matching_at: formattedDate
            });

            // 성공 시 코드 페이지로 이동하며 코드들 전달
            navigate('/new-room/code', {
                state: {
                    roomName: roomName.trim(),
                    participantCode: result.data.participant_code,
                    adminCode: result.data.admin_code
                }
            });

        } catch (error) {
            const roomError = error as RoomErrorResponse;
            
            if (roomError.code === 400) {
                // detail이 객체이고 room_name 필드가 있는지 확인
                if (typeof roomError.detail === 'object' && 
                    roomError.detail !== null && 
                    !Array.isArray(roomError.detail) && 
                    'room_name' in roomError.detail) {
                    alert('매칭룸 이름이 올바르지 않습니다.');
                } else {
                    alert('입력값이 올바르지 않습니다.');
                }
            } else {
                alert('매칭룸 생성에 실패했습니다. 다시 시도해주세요.');
            }
            console.error('Room creation error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S.Container>
        <S.Title>새 매칭룸</S.Title>
        <S.ListWrapper>
            <S.InputWrapper>
                <S.Label>매칭룸 이름</S.Label>
                <S.Input>
                    <InputField 
                        type="text"
                        placeholder=""
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        hasIcon={false}
                    />
                </S.Input>
            </S.InputWrapper>
            <S.InputWrapper>
                <S.Label>매칭 시작 설정</S.Label>
                <S.Input>
                    <InputField 
                        placeholder=""
                        showCalendar={true}
                        onDateSelect={(date) => setSelectedDate(date)}
                        value={selectedDate}
                        hasIcon={true}
                    />
                    </S.Input>
            </S.InputWrapper> 
        </S.ListWrapper>
            <BlackLTextButton 
                onClick={handleCreateRoom}
                disabled={isLoading}
            >
                {isLoading ? '생성 중...' : '다음'}
            </BlackLTextButton>
        </S.Container>
    );
}