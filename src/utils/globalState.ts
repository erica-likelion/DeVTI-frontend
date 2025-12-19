// 전역 상태 관리
class GlobalState {
  private static instance: GlobalState;
  private _currentRoomId: number | null = null;
  private _matchingStartTime: string | null = null;

  private constructor() {}

  static getInstance(): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState();
    }
    return GlobalState.instance;
  }

  // room_id getter
  get currentRoomId(): number | null {
    return this._currentRoomId;
  }

  // room_id setter
  setCurrentRoomId(roomId: number | null): void {
    this._currentRoomId = roomId;
  }

  // room_id 초기화
  clearCurrentRoomId(): void {
    this._currentRoomId = null;
  }

  // matching_start_time getter
  get matchingStartTime(): string | null {
    return this._matchingStartTime;
  }

  // matching_start_time setter
  setMatchingStartTime(startTime: string | null): void {
    this._matchingStartTime = startTime;
  }

  // matching_start_time 초기화
  clearMatchingStartTime(): void {
    this._matchingStartTime = null;
  }

  // 모든 상태 초기화
  clearAll(): void {
    this._currentRoomId = null;
    this._matchingStartTime = null;
  }
}

// 전역 인스턴스 export
export const globalState = GlobalState.getInstance();

// 편의 함수들 export
export const getCurrentRoomId = (): number | null => globalState.currentRoomId;
export const setCurrentRoomId = (roomId: number | null): void => globalState.setCurrentRoomId(roomId);
export const clearCurrentRoomId = (): void => globalState.clearCurrentRoomId();

export const getMatchingStartTime = (): string | null => globalState.matchingStartTime;
export const setMatchingStartTime = (startTime: string | null): void => globalState.setMatchingStartTime(startTime);
export const clearMatchingStartTime = (): void => globalState.clearMatchingStartTime();
export const clearAllGlobalState = (): void => globalState.clearAll();