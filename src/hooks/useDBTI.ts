import { useState } from 'react';
import { submitDBTI, updateDBTI, type DBTIResponse, type DBTIErrorResponse } from '@/services/dbti';

interface UseDBTIReturn {
  submitTest: (scores: number[]) => Promise<void>;
  updateTest: (scores: number[]) => Promise<void>;
  isLoading: boolean;
  result: DBTIResponse | null;
  error: DBTIErrorResponse | null;
  reset: () => void;
}

/**
 * DBTI 검사 제출을 위한 커스텀 훅
 * @returns DBTI 관련 상태와 함수들
 */
export const useDBTI = (): UseDBTIReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DBTIResponse | null>(null);
  const [error, setError] = useState<DBTIErrorResponse | null>(null);

  const submitTest = async (scores: number[]): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await submitDBTI(scores);
      setResult(response);
    } catch (err: any) {
      setError(err as DBTIErrorResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTest = async (scores: number[]): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await updateDBTI(scores);
      setResult(response);
    } catch (err: any) {
      setError(err as DBTIErrorResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = (): void => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    submitTest,
    updateTest,
    isLoading,
    result,
    error,
    reset,
  };
};