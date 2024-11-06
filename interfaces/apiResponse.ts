// interfaces/apiResponse.ts
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }