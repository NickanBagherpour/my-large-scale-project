import { NextResponse } from 'next/server';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  errorDetails?: string;
  statusCode?: number;
};

export const createResponse = <T>(data: ApiResponse<T>) => {
  return NextResponse.json(data, { status: data.statusCode || (data.success ? 200 : 500) });
};
