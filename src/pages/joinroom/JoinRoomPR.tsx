import * as S from './JoinRoomPR.styles';
import { useState } from 'react';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import DropBox from '@/components/DropBox/DropBox';
import SegmentControl from '@/components/SegmentControl/SegmentControlTransparent';

export default function JoinRoomPR() {

    const [selectedPart, setSelectedPart] = useState('');
    const [selectedTeamStyle, setSelectedTeamStyle] = useState('');
    const [selectedActivityTime, setSelectedActivityTime] = useState('');
    const [selectedMeetingStyle, setSelectedMeetingStyle] = useState('');
    const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
    const [isTeamStyleDropdownOpen, setIsTeamStyleDropdownOpen] = useState(false);

    const partOptions = ['PM', '디자인', '프론트엔드', '백엔드'];
    const teamStyleOptions = ['배우면서 즐겁게', '열정적으로 하루 종일', '어디에서나 잘할 수 있어요'];
    const activityTimeOptions = ['낮', '밤'];
    const meetingStyleOptions = ['대면', '비대면'];

    const isAllSelected = selectedPart && selectedTeamStyle && selectedActivityTime && selectedMeetingStyle;

    return (
        <S.Container>
            <S.TitleWrapper>
                <S.Title>프로젝트 PR</S.Title>
                <S.Content>매칭룸 입장 이후, 작성한 PR은 수정할 수 없어요.</S.Content>
            </S.TitleWrapper>
            <S.ListWrapper>
                <S.InputWrapper>
                    <S.Label>파트 선택</S.Label>
                    <S.Input>
                        <DropBox 
                            value={selectedPart}
                            placeholder="파트를 선택해주세요"
                            isOpen={isPartDropdownOpen}
                            options={partOptions}
                            size="L"
                            onClick={() => setIsPartDropdownOpen(!isPartDropdownOpen)}
                            onSelectOption={(option) => {
                                setSelectedPart(option);
                                setIsPartDropdownOpen(false);
                            }}
                        />
                    </S.Input>
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.Label>지향하는 팀 성향</S.Label>
                    <S.Input>
                        <DropBox 
                            value={selectedTeamStyle}
                            placeholder="팀 성향을 선택해주세요"
                            isOpen={isTeamStyleDropdownOpen}
                            options={teamStyleOptions}
                            size="L"
                            onClick={() => setIsTeamStyleDropdownOpen(!isTeamStyleDropdownOpen)}
                            onSelectOption={(option) => {
                                setSelectedTeamStyle(option);
                                setIsTeamStyleDropdownOpen(false);
                            }}
                        />
                    </S.Input>
                </S.InputWrapper> 
                <S.InputWrapper>
                    <S.Label>활동 시간</S.Label>
                    <S.Input>
                        <SegmentControl 
                            options={activityTimeOptions}
                            value={selectedActivityTime}
                            onChange={setSelectedActivityTime}
                        />
                    </S.Input>
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.Label>희망 회의 방식</S.Label>
                    <S.Input>
                        <SegmentControl 
                            options={meetingStyleOptions}
                            value={selectedMeetingStyle}
                            onChange={setSelectedMeetingStyle}
                        />
                    </S.Input>
                </S.InputWrapper>
            </S.ListWrapper>
            <BlackLTextButton disabled={!isAllSelected}>PR 확정하고 매칭룸 입장</BlackLTextButton>
        </S.Container>
    );
}