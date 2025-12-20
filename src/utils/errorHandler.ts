export interface ErrorHandlerOptions {
  navigate: (path: string) => void;
}

/**
 * 에러 상태 코드에 따라 적절한 에러 페이지로 이동
 */
export const handleApiError = (error: any, { navigate }: ErrorHandlerOptions) => {
  // 네트워크 에러나 서버가 아예 응답하지 않는 경우
  if (!error.response) {
    navigate("/error/500");
    return;
  }

  const statusCode = error.response?.status;

  switch (statusCode) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 422:
      // 클라이언트 에러
      navigate("/error/400");
      break;
    case 500:
    case 502:
    case 503:
    case 504:
    default:
      // 서버 에러
      navigate("/error/500");
      break;
  }
};

/**
 * try-catch 블록에서 사용할 에러 처리
 */
export const handleError = (error: any, { navigate }: ErrorHandlerOptions) => {
  console.error("Error occurred:", error);
  
  // API 에러인 경우
  if (error.response || error.request) {
    handleApiError(error, { navigate });
  } else {
    // 일반적인 JavaScript 에러 (클라이언트 사이드 에러)
    navigate("/error/400");
  }
};