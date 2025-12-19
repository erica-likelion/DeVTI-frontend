import * as S from './ManageJoinPage.styles';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinAsAdmin, type RoomErrorResponse } from '@/services/room';


export default function ManageJoinPage() {
    const navigate = useNavigate();
    const [adminCode, setAdminCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAdminCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAdminCode(e.target.value);
    };

    const handleJoinAsAdmin = async () => {
        if (!adminCode.trim()) {
            alert('운영진 입장 코드를 입력해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            await joinAsAdmin(adminCode.trim());
            
            // 성공 시 관리 페이지로 이동
            navigate('/manage/default');
        } catch (error) {
            const roomError = error as RoomErrorResponse;
            
            if (roomError.code === 400) {
                alert('올바르지 않은 코드입니다. 다시 확인해주세요.');
            } else if (roomError.code === 403) {
                alert('이미 참여한 방입니다.');
            } else {
                alert('입장에 실패했습니다. 다시 시도해주세요.');
            }
            console.error('Admin join error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S.Container>
        <S.Title>매칭룸 관리하기</S.Title>
            <S.InputWrapper>
            <S.LabelWrapper>
                <S.Label>운영진 입장 코드</S.Label>
            </S.LabelWrapper>
                <S.Input>
                <InputField 
                    variant='input'
                    value={adminCode}
                    onChange={handleAdminCodeChange}
                    hasIcon={false}
                />
                </S.Input>
            </S.InputWrapper>
            <BlackLTextButton 
                onClick={handleJoinAsAdmin}
                disabled={!adminCode.trim() || isLoading}
            >
                {isLoading ? '입장 중...' : '다음'}
            </BlackLTextButton>
        </S.Container>
    );
}