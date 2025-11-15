// 시간 문자열 포맷팅 함수
export const formatTimeInput = (input: string): string => {
  // 숫자와 :만 허용
  const cleanInput = input.replace(/[^\d:]/g, '');
  
  // : 하나까지만 허용
  const parts = cleanInput.split(':');
  if (parts.length > 2) {
    return `${parts[0]}:${parts[1]}`;
  }
  
  // 시 부분 자동 포맷팅
  if (parts.length === 1 && parts[0].length >= 3) {
    const hour = parts[0].slice(0, 2);
    const minute = parts[0].slice(2);
    return `${hour}:${minute}`;
  }
  
  return cleanInput;
};

// 시간 정규화 함수
export const normalizeTime = (timeStr: string): { hour: number; minute: number } => {
  const [hourStr, minuteStr] = timeStr.split(':');
  let hour = parseInt(hourStr || '0', 10);
  let minute = parseInt(minuteStr || '0', 10);
  
  // 시간 24시간 형식으로 조정
  hour = hour % 24;
  
  // 분이 59 초과시 시간에 추가하고 60으로 나눈 나머지
  if (minute >= 60) {
    const additionalHours = Math.floor(minute / 60);
    hour = (hour + additionalHours) % 24;
    minute = minute % 60;
  }
  
  return { hour, minute };
};

// 시간 유효성 검사 함수
export const isValidTimeFormat = (timeStr: string): boolean => {
  // HH:MM 또는 H:MM 또는 HH:M 또는 H:M 형식 허용
  const timeRegex = /^\d{1,2}(:\d{1,2})?$/;
  return timeRegex.test(timeStr);
};

// 종합 시간 처리 함수
export const processTimeInput = (input: string): { 
  formattedTime: string; 
  normalizedTime: { hour: number; minute: number }; 
  isValid: boolean; 
  errorMessage?: string;
} => {
  if (!input.trim()) {
    return {
      formattedTime: '',
      normalizedTime: { hour: 0, minute: 0 },
      isValid: false,
      errorMessage: '시간을 입력해주세요.'
    };
  }
  
  const formatted = formatTimeInput(input);
  
  if (!isValidTimeFormat(formatted)) {
    return {
      formattedTime: formatted,
      normalizedTime: { hour: 0, minute: 0 },
      isValid: false,
      errorMessage: '올바른 시간 형식을 입력해주세요. (예: 14:30)'
    };
  }
  
  const normalized = normalizeTime(formatted);
  const finalFormatted = `${normalized.hour.toString().padStart(2, '0')}:${normalized.minute.toString().padStart(2, '0')}`;
  
  return {
    formattedTime: finalFormatted,
    normalizedTime: normalized,
    isValid: true
  };
};

// 기존 validateTime 함수 (하위 호환성)
export const validateTime = (input: string): { isValid: boolean; errorMessage?: string; processedTime?: string } => {
  const result = processTimeInput(input);
  
  return {
    isValid: result.isValid,
    errorMessage: result.errorMessage,
    processedTime: result.formattedTime
  };
};