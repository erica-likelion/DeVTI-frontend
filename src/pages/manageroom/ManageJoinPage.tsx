import * as S from './ManageJoinPage.styles';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import { useState, type ChangeEvent } from 'react';


export default function ManageJoinPage() {
    const [adminCode, setAdminCode] = useState('');
    const correctAdminCode = 'admin123'; // 임시 정답 코드
    const isValidCode = adminCode === correctAdminCode;

    const handleAdminCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAdminCode(e.target.value);
    };

    return (
        <S.Container>
        <S.Title>매칭룸 관리하기</S.Title>
            <S.InputWrapper>
                <S.Label>운영진 입장 코드</S.Label>
                <S.Input>
                <InputField 
                    variant='input'
                    value={adminCode}
                    onChange={handleAdminCodeChange}
                    hasIcon={false}
                />
                </S.Input>
            </S.InputWrapper>
            <BlackLTextButton disabled={!isValidCode}>다음</BlackLTextButton>
        </S.Container>
    );
}