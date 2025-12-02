import * as S from './NewRoomCode.styles';
import { InputField } from '@/components/Input';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import CopyBlackGray from '../../assets/icons/Copy/CopyBlackGray.svg';
import { copyToClipboard } from '../../utils/copyToClipboard';


export default function NewRoomCode() {


    const handleCopy = async (text: string) => {
        await copyToClipboard(text);
    };

    const roomName = "멋쟁이사자처럼 13기 장기프로젝트" // 임시 배정
    const publicCode = "일반 입장 코드"; // 임시 배정 -> 복사 테스트용
    const adminCode = "운영진 입장 코드"; // 임시 배정 -> 복사 테스트용 

    

    return (
        <S.Container>
        <S.Title>{roomName}{'\n'}매칭룸을 생성했습니다!</S.Title>
        <S.ListWrapper>
            <S.InputWrapper>
                <S.Label>일반 입장 코드</S.Label>
                <S.Input>
                <InputField 
                    variant='output'
                    value= {publicCode}
                    icon={<img src={CopyBlackGray} alt="copy" />}
                    onIconClick={()=> handleCopy(publicCode)}
                    hasIcon={true}
                />
                </S.Input>
            </S.InputWrapper>
            <S.InputWrapper>
                <S.Label>운영진 입장 코드</S.Label>
                <InputField 
                    variant='output'
                    icon={<img src={CopyBlackGray} alt="copy" />}
                    value= {adminCode}
                    onIconClick={()=> handleCopy(adminCode)}
                    hasIcon={true}
                />
            </S.InputWrapper> 
        </S.ListWrapper>
            <BlackLTextButton>다음</BlackLTextButton>
        </S.Container>
    );
}