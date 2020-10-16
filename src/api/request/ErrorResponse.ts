export interface ErrorResponse extends Error {
    httpMethod?: string;
    url?: string;
    response?: { status: number };
  }