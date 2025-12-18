import axiosInstance from '@/lib/AxiosInstance';


// DBTI 검사 요청 타입 (28개의 0-4점 배열)
export interface DBTIRequest {
  answers: number[];
}

// DBTI 검사 응답 타입
export interface DBTIResponse {
  status: string;
  code: number;
  data: {
    username: string;
    devti: number | string;
  };
  message: string;
  detail: string | null;
}

// DBTI 에러 응답 타입
export interface DBTIErrorResponse {
  status: string;
  code: number;
  data: null;
  message: string;
  detail: string;
}

/**
 * DBTI 점수 배열이 유효한지 검증하는 함수
 * @param scores - 검증할 점수 배열
 * @returns 유효성 검증 결과
 */

export const validateDBTIScores = (scores: number[]): { isValid: boolean; error?: string } => {
  // 배열 길이 검증 (정확히 28개)
  if (!Array.isArray(scores)) {
    return { isValid: false, error: 'Scores must be an array' };
  }
  
  if (scores.length !== 28) {
    return { isValid: false, error: 'Scores array must contain exactly 28 elements' };
  }

  // 각 점수 범위 검증 (0-4점)
  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    if (!Number.isInteger(score) || score < 0 || score > 4) {
      return { isValid: false, error: `Score at index ${i} must be an integer between 0 and 4` };
    }
  }

  return { isValid: true };
};


/**
 * DBTI 검사 결과를 제출하는 API 함수
 * @param scores - 28개의 DBTI 점수 배열 (0-4점)
 * @returns DBTI 검사 결과
 */
export const submitDBTI = async (scores: number[]): Promise<DBTIResponse> => {
  try {
    // 클라이언트 사이드 검증
    const validation = validateDBTIScores(scores);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // API 요청
    return await sendDBTIRequest('post', scores);
  } catch (error: any) {
    // Axios 에러 응답 처리
    if (error.response?.data) {
      throw error.response.data;
    }
    
    // 클라이언트 사이드 검증 에러 또는 네트워크 에러 처리
    throw {
      status: 'error',
      code: 400,
      data: null,
      message: 'Request validation failed',
      detail: error.message || 'Unknown error occurred'
    } as DBTIErrorResponse;
  }
};

/**
 * DBTI 검사 결과를 업데이트하는 API 함수 (다시 테스트)
 * @param scores - 28개의 DBTI 점수 배열 (0-4점)
 * @returns DBTI 검사 결과
 */
export const updateDBTI = async (scores: number[]): Promise<DBTIResponse> => {
  try {
    // 클라이언트 사이드 검증
    const validation = validateDBTIScores(scores);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // API 요청 (PUT)
    return await sendDBTIRequest('put', scores);
  } catch (error: any) {
    // Axios 에러 응답 처리
    if (error.response?.data) {
      throw error.response.data;
    }
    
    // 클라이언트 사이드 검증 에러 또는 네트워크 에러 처리
    throw {
      status: 'error',
      code: 400,
      data: null,
      message: 'Request validation failed',
      detail: error.message || 'Unknown error occurred'
    } as DBTIErrorResponse;
  }
};

/**
 * 별점(1-5개)을 점수(0-4점)로 변환하는 헬퍼 함수
 * @param stars - 별의 개수 (1-5)
 * @returns 점수 (0-4)
 */
export const starsToScore = (stars: number): number => {
  return Math.max(0, Math.min(4, stars - 1));
};

/**
 * 점수(0-4점)를 별점(1-5개)으로 변환하는 헬퍼 함수
 * @param score - 점수 (0-4)
 * @returns 별의 개수 (1-5)
 */
export const scoreToStars = (score: number): number => {
  return Math.max(1, Math.min(5, score + 1));
};

const sendDBTIRequest = async (method: 'post' | 'put', scores: number[]): Promise<DBTIResponse> => {
  const request = (body: number[] | { answers: number[] }) => (
    method === 'post'
      ? axiosInstance.post<DBTIResponse>('/api/profile/devti/', body)
      : axiosInstance.put<DBTIResponse>('/api/profile/devti/', body)
  );

  try {
    const response = await request(scores);
    return response.data;
  } catch (error: any) {
    if (shouldRetryWithAnswersPayload(error)) {
      const retryResponse = await request({ answers: scores });
      return retryResponse.data;
    }
    throw error;
  }
};

const shouldRetryWithAnswersPayload = (error: any): boolean => {
  const detail = error?.response?.data?.detail;
  if (!detail) return false;

  if (detail.answers) {
    return true;
  }

  const nonFieldErrors = detail.non_field_errors;
  if (Array.isArray(nonFieldErrors)) {
    return nonFieldErrors.some((msg: unknown) => (
      typeof msg === 'string' && msg.toLowerCase().includes('dictionary')
    ));
  }

  return false;
};
