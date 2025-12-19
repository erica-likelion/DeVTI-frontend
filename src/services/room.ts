import axiosInstance from '@/lib/AxiosInstance';

// Room 생성 요청 타입
export interface CreateRoomRequest {
  room_name: string;
  matching_at: string; // YYYY-MM-DDTHH:MM:SSZ format
}

// Room 생성 성공 응답 타입
export interface CreateRoomResponse {
  status: 'success';
  code: 201;
  data: {
    participant_code: string;
    admin_code: string;
  };
  message: null;
  detail: null;
}

// Room 참가 코드 검증 요청 타입
export interface ValidateParticipantCodeRequest {
  participant_code: string;
}

// Room 참가 코드 검증 성공 응답 타입
export interface ValidateParticipantCodeResponse {
  status: 'success';
  code: 200;
  data: {
    room_id: number;
    available_parts: string[]; // ["FE", "DE", "PM", "DES"] 등
  };
  message: string;
  detail: null;
}

// Room 참여 요청 타입
export interface JoinRoomRequest {
  participant_code: string;
  part: 'PM' | 'DE' | 'FE' | 'BE'; // PM, DE, FE, BE 중 택1
  team_vibe: 'professional' | 'learning'; // professional, learning 중 택1
  active_hours: 'day' | 'night'; // day, night 중 택1
  meeting_preference: 'online' | 'offline'; // online, offline 중 택1
}

// Room 참여 성공 응답 타입
export interface JoinRoomResponse {
  status: 'success';
  code: 201;
  data: null;
  message: string;
  detail: null;
}

// Admin 코드로 참여 요청 타입
export interface JoinAsAdminRequest {
  admin_code: string;
}

// Admin 참여 성공 응답 타입
export interface JoinAsAdminResponse {
  status: 'success';
  code: 201;
  data: null;
  message: string;
  detail: null;
}

// 참여중인 매칭룸 정보 타입
export interface MyRoomInfo {
  id: number;
  name: string;
  role: 'ADMIN' | 'PARTICIPANT';
  status: 'PENDING' | 'WAGGING' | 'MATCHING' | 'COMPLETED' | 'CLOSED';
}

// 참여중인 매칭룸 리스트 응답 타입
export interface GetMyRoomsResponse {
  status: 'success';
  code: 200;
  data: MyRoomInfo[];
  message: null;
  detail: null;
}

// Room API 에러 응답 타입
export interface RoomErrorResponse {
  status: 'error';
  code: number;
  data: null;
  message: string;
  detail: Record<string, string[]> | string | string[];
}

/**
 * 새로운 매칭룸을 생성하는 API 함수
 * 요청한 사용자를 해당 방의 ADMIN으로 자동 등록
 * @param roomData - 방 이름과 매칭 시간
 * @returns 방 생성 결과 (참가자 코드, 관리자 코드)
 */
export const createRoom = async (roomData: CreateRoomRequest): Promise<CreateRoomResponse> => {
  try {
    const response = await axiosInstance.post<CreateRoomResponse>('/api/room/', roomData);
    return response.data;
  } catch (error: any) {
    // Axios 에러 응답 처리
    if (error.response?.data) {
      throw error.response.data as RoomErrorResponse;
    }
    
    // 네트워크 에러 또는 기타 에러 처리
    throw {
      status: 'error',
      code: error.response?.status || 500,
      data: null,
      message: error.message || 'Unknown error occurred',
      detail: 'Network error or server unavailable'
    } as RoomErrorResponse;
  }
};

/**
 * 날짜와 시간을 API 형식(YYYY-MM-DDTHH:MM:SSZ)으로 변환하는 헬퍼 함수
 * @param date - Date 객체
 * @returns ISO 형식의 문자열
 */
export const formatDateTimeForAPI = (date: Date): string => {
  return date.toISOString();
};

/**
 * 문자열 날짜를 Date 객체로 변환하는 헬퍼 함수
 * @param dateString - YYYY-MM-DDTHH:MM:SSZ 형식의 문자열
 * @returns Date 객체
 */
export const parseDateTimeFromAPI = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * 참가 코드의 유효성을 검증하는 API 함수
 * 유효성, 중복 참여 여부, 프로필 완성 여부를 확인
 * @param participantCode - 참가자가 입력한 입장 코드
 * @returns 검증 결과 (room_id, available_parts)
 */
export const validateParticipantCode = async (
  participantCode: string
): Promise<ValidateParticipantCodeResponse> => {
  try {
    const requestData: ValidateParticipantCodeRequest = {
      participant_code: participantCode
    };
    
    const response = await axiosInstance.post<ValidateParticipantCodeResponse>(
      '/api/room/validate-code/',
      requestData
    );
    return response.data;
  } catch (error: any) {
    
    // Axios 에러 응답 처리
    if (error.response?.data) {
      throw error.response.data as RoomErrorResponse;
    }
    
    // 네트워크 에러 또는 기타 에러 처리
    throw {
      status: 'error',
      code: error.response?.status || 500,
      data: null,
      message: error.message || 'Unknown error occurred',
      detail: 'Network error or server unavailable'
    } as RoomErrorResponse;
  }
};

/**
 * 매칭룸에 참여하는 API 함수
 * PARTICIPANT 역할로 방에 참여
 * @param joinData - 참여에 필요한 정보 (코드, 파트, 선호도 등)
 * @returns 참여 완료 응답
 */
export const joinRoom = async (joinData: JoinRoomRequest): Promise<JoinRoomResponse> => {
  try {
    const response = await axiosInstance.post<JoinRoomResponse>('/api/room/join/', joinData);
    return response.data;
  } catch (error: any) {
    
    // Axios 에러 응답 처리
    if (error.response?.data) {
      throw error.response.data as RoomErrorResponse;
    }
    
    // 네트워크 에러 또는 기타 에러 처리
    throw {
      status: 'error',
      code: error.response?.status || 500,
      data: null,
      message: error.message || 'Unknown error occurred',
      detail: 'Network error or server unavailable'
    } as RoomErrorResponse;
  }
};

/**
 * 현재 사용자가 참여중인 모든 매칭룸 목록을 조회하는 API 함수
 * @returns 참여중인 매칭룸 리스트 (빈 배열 가능)
 */
export const getMyRooms = async (): Promise<GetMyRoomsResponse> => {
  try {
    const response = await axiosInstance.get<GetMyRoomsResponse>('/api/room/');
    return response.data;
  } catch (error: any) {
    
    // Axios 에러 응답 처리
    if (error.response?.data) {
      throw error.response.data as RoomErrorResponse;
    }
    
    // 네트워크 에러 또는 기타 에러 처리
    throw {
      status: 'error',
      code: error.response?.status || 500,
      data: null,
      message: error.message || 'Unknown error occurred',
      detail: 'Network error or server unavailable'
    } as RoomErrorResponse;
  }
};

/**
 * admin_code를 사용하여 매칭룸에 ADMIN으로 참여하는 API 함수
 * @param adminCode - 관리자 코드
 * @returns ADMIN 참여 완료 응답
 */
export const joinAsAdmin = async (adminCode: string): Promise<JoinAsAdminResponse> => {
  try {
    const requestData: JoinAsAdminRequest = {
      admin_code: adminCode
    };
    
    const response = await axiosInstance.post<JoinAsAdminResponse>('/api/room/join-admin/', requestData);
    return response.data;
  } catch (error: any) {
    
    // Axios 에러 응답 처리
    if (error.response?.data) {
      throw error.response.data as RoomErrorResponse;
    }
    
    // 네트워크 에러 또는 기타 에러 처리
    throw {
      status: 'error',
      code: error.response?.status || 500,
      data: null,
      message: error.message || 'Unknown error occurred',
      detail: 'Network error or server unavailable'
    } as RoomErrorResponse;
  }
};

/**
 * 매칭룸을 삭제하는 API 함수
 * ADMIN 권한을 가진 사용자만 삭제 가능
 * @param roomId - 삭제할 방의 ID
 * @returns 성공시 void (204 No Content)
 */
export const deleteRoom = async (roomId: string | number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/room/${roomId}/`);
    // 204 응답이므로 응답 데이터 없음
  } catch (error: any) {
    // Axios 에러 응답 처리
    if (error.response?.data) {
      throw error.response.data as RoomErrorResponse;
    }
    
    // 네트워크 에러 또는 기타 에러 처리
    throw {
      status: 'error',
      code: error.response?.status || 500,
      data: null,
      message: error.message || 'Unknown error occurred',
      detail: 'Network error or server unavailable'
    } as RoomErrorResponse;
  }
};