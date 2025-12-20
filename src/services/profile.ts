import axiosInstance from "@/lib/AxiosInstance";

type PartType = "PM" | "FE" | "BE" | "DE";

// 공통 프로필 응답 타입
interface CommonProfileResponse {
  username: string;
  email: string;
  devti: string;
  comment: string;
  available_parts: PartType[];
}

// PM 프로필 응답 타입
interface PMProfileResponse extends CommonProfileResponse {
  part: "PM";
  experienced: string;
  strength: string;
  daily_time_capacity: number;
  weekly_time_capacity: number;
  design_understanding: number;
  development_understanding: number;
}

// FE 프로필 응답 타입
interface FEProfileResponse extends CommonProfileResponse {
  part: "FE";
  experienced: string;
  strength: string;
  github_url: string;
  development_score: [string, number][]; // [["리액트", 4.5], ...]
}

// BE 프로필 응답 타입
interface BEProfileResponse extends CommonProfileResponse {
  part: "BE";
  experienced: string;
  strength: string;
  github_url: string;
  development_score: [string, number][]; // [["스프링부트", 5.0], ...]
}

// DE 프로필 응답 타입
interface DEProfileResponse extends CommonProfileResponse {
  part: "DE";
  experienced: string | null;
  strength: string;
  portfolio_url: string;
  design_score: number;
}

// 프로필 응답 타입 (유니온)
type ProfileResponse =
  | CommonProfileResponse
  | PMProfileResponse
  | FEProfileResponse
  | BEProfileResponse
  | DEProfileResponse;

// 공통 프로필 업데이트 요청 타입
interface CommonProfileUpdateRequest {
  username?: string;
  comment?: string;
}

// PM 프로필 업데이트 요청 타입
interface PMProfileUpdateRequest {
  experienced?: string | null; // 신입인 경우 null 전송
  strength?: string | string[]; // 스웨거 스펙에 따라 배열도 허용
  daily_time_capacity?: number;
  weekly_time_capacity?: number;
  design_understanding?: number;
  development_understanding?: number;
}

// FE 프로필 업데이트 요청 타입
interface FEProfileUpdateRequest {
  experienced?: string | null; // 신입인 경우 null 전송
  strength?: string | string[]; // 스웨거 스펙에 따라 배열도 허용
  github_url?: string;
  development_score?: [string, number][] | string; // 배열 또는 "상"
}

// BE 프로필 업데이트 요청 타입
interface BEProfileUpdateRequest {
  experienced?: string | null; // 신입인 경우 null 전송
  strength?: string | string[]; // 스웨거 스펙에 따라 배열도 허용
  github_url?: string;
  development_score?: [string, number][];
}

// DE 프로필 업데이트 요청 타입
interface DEProfileUpdateRequest {
  experienced?: string | null; // 신입인 경우 null 전송
  strength?: string | string[]; // 스웨거 스펙에 따라 배열도 허용
  portfolio_url?: string;
  design_score?: number;
}

// 프로필 업데이트 요청 타입 (유니온)
type ProfileUpdateRequest =
  | CommonProfileUpdateRequest
  | PMProfileUpdateRequest
  | FEProfileUpdateRequest
  | BEProfileUpdateRequest
  | DEProfileUpdateRequest;

const handleProfileError = (error: any, defaultMessage: string) => {
  // 413 오류 (파일 크기 초과) 처리
  if (error?.response?.status === 413) {
    return "업로드한 파일이 너무 큽니다. 10MB 이하의 파일을 선택해주세요.";
  }
  
  const data = error?.response?.data;
  if (data) {
    // 상세 에러 정보를 콘솔에 출력
    console.error("서버 에러 응답:", JSON.stringify(data, null, 2));
    const msg =
      data.message ||
      data.detail?.non_field_errors?.[0] ||
      data.detail ||
      defaultMessage;
    return typeof msg === "string" ? msg : JSON.stringify(msg);
  }
  return error?.message || defaultMessage;
};

// GET /api/profile
// part가 없으면 기본 프로필, 있으면 해당 파트 프로필 반환
export const getProfile = async (part?: PartType, silentNotFound = false) => {
  try {
    const response = await axiosInstance.get("/api/profile", {
      params: part ? { part } : undefined,
    });

    if (response.data?.status === "success") {
      return { success: true, data: response.data.data as ProfileResponse };
    }
    return { success: false, error: "프로필 조회에 실패했습니다" };
  } catch (error: any) {
    // 404 오류는 정상적인 상황 (프로필이 아직 등록되지 않음)
    if (error?.response?.status === 404) {
      return {
        success: false,
        error: `${part ? `${part} 파트` : '공통'} 프로필 데이터가 없습니다`,
        isNotFound: true
      };
    }
    
    // silentNotFound가 true가 아닌 경우에만 에러 로깅
    if (!silentNotFound) {
      console.error('Profile fetch error:', error);
    }
    
    return {
      success: false,
      error: handleProfileError(error, "프로필 조회에 실패했습니다"),
    };
  }
};

// POST /api/profile
export const createProfile = async (
  data: ProfileUpdateRequest | FormData,
  part: PartType
) => {
  try {
    // FormData인 경우 (파일 업로드가 필요한 경우)
    if (data instanceof FormData) {
      const response = await axiosInstance.post("/api/profile/", data, {
        params: { part },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.status === "success") {
        return { success: true, data: response.data.data as ProfileResponse };
      }
      return { success: false, error: "프로필 생성에 실패했습니다", statusCode: response.status };
    } else {
      // 일반 객체인 경우 (JSON)
      const response = await axiosInstance.post("/api/profile/", data, {
        params: { part },
      });

      if (response.data?.status === "success") {
        return { success: true, data: response.data.data as ProfileResponse };
      }
      return { success: false, error: "프로필 생성에 실패했습니다", statusCode: response.status };
    }
  } catch (error: any) {
    const statusCode = error?.response?.status;
    return {
      success: false,
      error: handleProfileError(error, "프로필 생성에 실패했습니다"),
      statusCode,
    };
  }
};

// PUT /api/profile
// part가 없으면 공통 프로필 수정, 있으면 해당 파트 프로필 수정
export const updateProfile = async (
  data: ProfileUpdateRequest | FormData,
  part?: PartType
) => {
  try {
    // 토큰 확인
    const token = localStorage.getItem('access_token');
    console.log("토큰 존재 여부:", !!token);
    console.log("PUT 요청:", "/api/profile/", { part, data });
    
    // FormData인 경우 (파일 업로드가 필요한 경우)
    if (data instanceof FormData) {
      const response = await axiosInstance.put("/api/profile/", data, {
        params: part ? { part } : undefined,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data?.status === "success") {
        return { success: true, data: response.data.data as ProfileResponse };
      }
      return { success: false, error: "프로필 업데이트에 실패했습니다", statusCode: response.status };
    } else {
      // 일반 객체인 경우 (JSON)
      const response = await axiosInstance.put("/api/profile/", data, {
        params: part ? { part } : undefined,
      });

      if (response.data?.status === "success") {
        return { success: true, data: response.data.data as ProfileResponse };
      }
      return { success: false, error: "프로필 업데이트에 실패했습니다", statusCode: response.status };
    }
  } catch (error: any) {
    const statusCode = error?.response?.status;
    return {
      success: false,
      error: handleProfileError(error, "프로필 업데이트에 실패했습니다"),
      statusCode,
    };
  }
};
