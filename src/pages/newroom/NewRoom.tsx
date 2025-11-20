import * as S from './NewRoom.styles';
import { useState } from 'react';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';

export default function NewRoom() {

    const [selectedDate, setSelectedDate] = useState('');
    const [text, setText] = useState('');


    

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
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        hasIcon={false}
                    />
                </S.Input>
            </S.InputWrapper>
            <S.InputWrapper>
                <S.Label>매칭 시작 설정</S.Label>
                <InputField 
                    placeholder=""
                    showCalendar={true}
                    onDateSelect={(date) => setSelectedDate(date)}
                    value={selectedDate}
                    hasIcon={true}
                />
            </S.InputWrapper> 
        </S.ListWrapper>
            <BlackLTextButton>다음</BlackLTextButton>
        </S.Container>
    );
}