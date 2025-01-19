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

/*
createErrorResponse(error, {
        error: 'Custom error message for this case',
        statusCode: 400, // Example of overriding status code
      }
* */

export const createErrorResponse = (error: unknown, customOverrides?: Partial<ApiResponse>) => {
  const baseResponse: ApiResponse = {
    success: false,
    error: 'An unknown error occurred',
    statusCode: 500,
    errorDetails: undefined,
  };

  if (error instanceof Error) {
    baseResponse.error = customOverrides?.error || error.message;
    baseResponse.errorDetails = customOverrides?.errorDetails || error.stack;
  }

  // Merge with custom overrides if provided
  const response = { ...baseResponse, ...customOverrides };

  return createResponse(response);
};
