import * as S from './NewRoomCode.styles';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import CopyIconButton from '@/components/ButtonStatic/CopyIconButton';


export default function NewRoomCode() {



    const roomName = "멋쟁이사자처럼 13기 장기프로젝트" // 임시 배정
    const publicCode = "일반 입장 코드"; // 임시 배정 -> 복사 테스트용
    const adminCode = "운영진 입장 코드"; // 임시 배정 -> 복사 테스트용 

    

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
                    value= {publicCode}
                    icon={<CopyIconButton text={publicCode} />}
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
                        value= {adminCode}
                        hasIcon={true}
                    />
                </S.Input>
            </S.InputWrapper> 
        </S.ListWrapper>
            <BlackLTextButton>매칭룸 관리로 이동</BlackLTextButton>
        </S.Container>
    );
}