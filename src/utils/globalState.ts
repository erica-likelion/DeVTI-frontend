// 전역 상태 관리
class GlobalState {
  private static instance: GlobalState;
  private _currentRoomId: number | null = null;

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
}

// 전역 인스턴스 export
export const globalState = GlobalState.getInstance();

// 편의 함수들 export
export const getCurrentRoomId = (): number | null => globalState.currentRoomId;
export const setCurrentRoomId = (roomId: number | null): void => globalState.setCurrentRoomId(roomId);
export const clearCurrentRoomId = (): void => globalState.clearCurrentRoomId();