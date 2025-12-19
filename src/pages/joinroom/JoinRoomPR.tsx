import * as S from './JoinRoomPR.styles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BlackLTextButton from '@/components/ButtonStatic/BkLTextButton';
import DropBox from '@/components/DropBox/DropBox';
import SegmentControl from '@/components/SegmentControl/SegmentControlTransparent';
import { joinRoom, type RoomErrorResponse } from '@/services/room';

export default function JoinRoomPR() {
    const navigate = useNavigate();
    const location = useLocation();
    const participantCode = location.state?.participantCode;

    type PartOption = 'PM' | '디자인' | '프론트엔드' | '백엔드';
    type TeamVibeDisplay = '배우면서 즐겁게' | '열정적으로 하루 종일' | '어디에서나 잘할 수 있어요';
    type ActiveHoursDisplay = '낮' | '밤';
    type MeetingPreferenceDisplay = '대면' | '비대면';

    const [selectedPart, setSelectedPart] = useState<PartOption | ''>('');
    const [selectedTeamStyle, setSelectedTeamStyle] = useState<TeamVibeDisplay | ''>('');
    const [selectedActivityTime, setSelectedActivityTime] = useState<ActiveHoursDisplay | ''>('');
    const [selectedMeetingStyle, setSelectedMeetingStyle] = useState<MeetingPreferenceDisplay | ''>('');
    const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
    const [isTeamStyleDropdownOpen, setIsTeamStyleDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const partOptions: PartOption[] = ['PM', '디자인', '프론트엔드', '백엔드'];
    const teamStyleOptions: TeamVibeDisplay[] = ['배우면서 즐겁게', '열정적으로 하루 종일', '어디에서나 잘할 수 있어요'];
    const activityTimeOptions: ActiveHoursDisplay[] = ['낮', '밤'];
    const meetingStyleOptions: MeetingPreferenceDisplay[] = ['대면', '비대면'];

    const isAllSelected = selectedPart && selectedTeamStyle && selectedActivityTime && selectedMeetingStyle;

    // 옵션을 API 형식으로 변환하는 함수들
    const getPartCode = (part: PartOption): 'PM' | 'DE' | 'FE' | 'BE' => {
        switch (part) {
            case 'PM': return 'PM';
            case '디자인': return 'DE';
            case '프론트엔드': return 'FE';
            case '백엔드': return 'BE';
            default: return 'PM';
        }
    };

    const getTeamVibe = (teamStyle: TeamVibeDisplay): 'professional' | 'learning' | 'anywhere' => {
        switch (teamStyle) {
            case '배우면서 즐겁게': return 'learning';
            case '열정적으로 하루 종일': return 'professional';
            case '어디에서나 잘할 수 있어요': return 'anywhere';
            default:
                return 'learning';
        }
    };

    const getActiveHours = (activityTime: ActiveHoursDisplay): 'day' | 'night' => {
        return activityTime === '낮' ? 'day' : 'night';
    };

    const getMeetingPreference = (meetingStyle: MeetingPreferenceDisplay): 'online' | 'offline' => {
        return meetingStyle === '대면' ? 'offline' : 'online';
    };

    const handleJoinRoom = async () => {
        if (!participantCode) {
            alert('참가 코드가 없습니다. 다시 시도해주세요.');
            navigate('/join-room');
            return;
        }
        
        if (!selectedPart || !selectedTeamStyle || !selectedActivityTime || !selectedMeetingStyle) {
            alert('모든 선택지를 완료해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            await joinRoom({
                participant_code: participantCode,
                part: getPartCode(selectedPart),
                team_vibe: getTeamVibe(selectedTeamStyle),
                active_hours: getActiveHours(selectedActivityTime),
                meeting_preference: getMeetingPreference(selectedMeetingStyle)
            });

            // 성공 시 완료 페이지나 대시보드로 이동
            alert('매칭룸 입장이 완료되었습니다!');
            navigate('/');
        } catch (error) {
            const roomError = error as RoomErrorResponse;
            
            if (roomError.code === 400) {
                alert('입력값이 올바르지 않습니다. 다시 확인해주세요.');
            } else if (roomError.code === 403) {
                alert('이미 참여한 방이거나 권한이 없습니다.');
            } else if (roomError.code === 404) {
                alert('유효하지 않은 참가 코드입니다.');
            } else {
                alert('매칭룸 입장에 실패했습니다. 다시 시도해주세요.');
            }
            console.error('Room join error:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
                                setSelectedPart(option as PartOption);
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
                                setSelectedTeamStyle(option as TeamVibeDisplay);
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
                            onChange={(value: string) => setSelectedActivityTime(value as ActiveHoursDisplay)}
                        />
                    </S.Input>
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.Label>희망 회의 방식</S.Label>
                    <S.Input>
                        <SegmentControl 
                            options={meetingStyleOptions}
                            value={selectedMeetingStyle}
                            onChange={(value: string) => setSelectedMeetingStyle(value as MeetingPreferenceDisplay)}
                        />
                    </S.Input>
                </S.InputWrapper>
            </S.ListWrapper>
            <BlackLTextButton 
                onClick={handleJoinRoom}
                disabled={!isAllSelected || isLoading}
            >
                {isLoading ? '입장 중...' : 'PR 확정하고 매칭룸 입장'}
            </BlackLTextButton>
        </S.Container>
    );
}
