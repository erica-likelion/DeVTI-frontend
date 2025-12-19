import * as S from './ManageJoinPage.styles';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import { useState, type ChangeEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinAsAdmin, type RoomErrorResponse } from '@/services/room';
import Modal from '@/components/modal/Modal';


export default function ManageJoinPage() {
    const navigate = useNavigate();
    const [adminCode, setAdminCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<ReactNode>(null);
    const [modalButtonLabel, setModalButtonLabel] = useState('확정');

    const handleAdminCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAdminCode(e.target.value);
    };

    const openModal = (message: ReactNode, buttonLabel = '확정') => {
        setModalMessage(message);
        setModalButtonLabel(buttonLabel);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleJoinAsAdmin = async () => {
        if (!adminCode.trim()) {
            openModal(
                <>
                    <span>운영진 입장 코드를 입력해주세요.</span>
                    <span>코드를 확인한 뒤 다시 시도해주세요.</span>
                </>,
                '확인'
            );
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
                openModal(
                    <>
                        <span>올바르지 않은 코드입니다.</span>
                        <span>다시 확인해주세요.</span>
                    </>,
                    '다시 입력'
                );
            } else if (roomError.code === 403) {
                openModal(
                    <>
                        <span>이미 참여한 방입니다.</span>
                        <span>권한을 확인해주세요.</span>
                    </>,
                    '확인'
                );
            } else {
                openModal(
                    <>
                        <span>입장에 실패했습니다.</span>
                        <span>다시 시도해주세요.</span>
                    </>,
                    '확인'
                );
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
            <Modal
                isOpen={isModalOpen}
                buttonLabel={modalButtonLabel}
                onClose={handleCloseModal}
            >
                {modalMessage}
            </Modal>
        </S.Container>
    );
}
