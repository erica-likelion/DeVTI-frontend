import * as S from './NewRoomCode.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import CopyIconButton from '@/components/ButtonStatic/CopyIconButton';


interface LocationState {
    roomName: string;
    participantCode: string;
    adminCode: string;
}

export default function NewRoomCode() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // NewRoom에서 전달받은 데이터
    const state = location.state as LocationState | null;
    
    // state가 없으면 NewRoom으로 리다이렉트
    if (!state) {
        navigate('/new-room');
        return null;
    }

    const { roomName, participantCode, adminCode } = state;

    const handleGoToManage = () => {
        // 매칭룸 관리 페이지로 이동
        navigate('/manage/default');
    };

    return (
        <S.Container>
        <S.TitleWrapper>
            <S.RoomName>{roomName}</S.RoomName>
            <S.TitleText>매칭룸을 생성했습니다!</S.TitleText>
        </S.TitleWrapper>
        <S.ListWrapper>
            <S.InputWrapper>
                <S.Label>일반 입장 코드</S.Label>
                <S.Input>
                <InputField 
                    variant='output'
                    value={participantCode}
                    icon={<CopyIconButton text={participantCode} />}
                    hasIcon={true}
                />
                </S.Input>
            </S.InputWrapper>
            <S.InputWrapper>
                <S.Label>운영진 입장 코드</S.Label>
                <S.Input>
                    <InputField 
                        variant='output'
                        icon={<CopyIconButton text={adminCode} />}
                        value={adminCode}
                        hasIcon={true}
                    />
                </S.Input>
            </S.InputWrapper> 
        </S.ListWrapper>
            <BlackLTextButton onClick={handleGoToManage}>
                매칭룸 관리로 이동
            </BlackLTextButton>
        </S.Container>
    );
}