// 전역 상태 관리
class GlobalState {
  private static instance: GlobalState;
  private _currentRoomId: number = 0;
  private _matchingStartTime: string = '';

  private constructor() {}

  static getInstance(): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState();
    }
    return GlobalState.instance;
  }

  // room_id getter
  get currentRoomId(): number {
    return this._currentRoomId;
  }

  // room_id setter
  setCurrentRoomId(roomId: number): void {
    this._currentRoomId = roomId;
  }

  // room_id 초기화
  clearCurrentRoomId(): void {
    this._currentRoomId = 0;
  }

  // matching_start_time getter
  get matchingStartTime(): string {
    return this._matchingStartTime;
  }

  // matching_start_time setter
  setMatchingStartTime(startTime: string): void {
    this._matchingStartTime = startTime;
  }

  // matching_start_time 초기화
  clearMatchingStartTime(): void {
    this._matchingStartTime = '';
  }

  // 모든 상태 초기화
  clearAll(): void {
    this._currentRoomId = 0;
    this._matchingStartTime = '';
  }
}

// 전역 인스턴스 export
export const globalState = GlobalState.getInstance();

// 편의 함수들 export
export const getCurrentRoomId = (): number => globalState.currentRoomId;
export const setCurrentRoomId = (roomId: number): void => globalState.setCurrentRoomId(roomId);
export const clearCurrentRoomId = (): void => globalState.clearCurrentRoomId();

export const getMatchingStartTime = (): string => globalState.matchingStartTime;
export const setMatchingStartTime = (startTime: string): void => globalState.setMatchingStartTime(startTime);
export const clearMatchingStartTime = (): void => globalState.clearMatchingStartTime();
export const clearAllGlobalState = (): void => globalState.clearAll();
