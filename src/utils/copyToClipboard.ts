/**
 * 텍스트를 클립보드에 복사하는 유틸리티 함수
 * @param text 복사할 텍스트
 * @param onSuccess 복사 성공 시 실행할 콜백 함수 
 * @param onError 복사 실패 시 실행할 콜백 함수 
 * @returns Promise<boolean> 복사 성공 여부
 */
export const copyToClipboard = async (
  text: string,
  onSuccess?: () => void,
  onError?: (error: Error) => void
): Promise<boolean> => {
  if (!text) {
    onError?.(new Error('복사할 텍스트가 없습니다.'));
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    onSuccess?.();
    return true;
  } catch (err) {
    const error = err instanceof Error ? err : new Error('복사에 실패했습니다.');
    onError?.(error);
    return false;
  }
};

/**
 * InputField의 값을 복사하는 헬퍼 함수
 * @param value InputField의 값
 * @returns Promise<boolean> 복사 성공 여부
 */
export const copyInputValue = async (value: string): Promise<boolean> => {
  if (!value) {
    console.log('복사할 내용이 없습니다.');
    return false;
  }
  
  try {
    await navigator.clipboard.writeText(value);
    console.log('복사 완료:', value);
    return true;
  } catch (err) {
    console.error('복사 실패:', err);
    return false;
  }
};

/**
 * InputField에서 바로 사용할 수 있는 복사 함수 팩토리
 * @param getValue 값을 가져오는 함수
 * @returns 아이콘 클릭 핸들러 함수
 */
export const createCopyHandler = (getValue: () => string) => {
  return () => copyInputValue(getValue());
};