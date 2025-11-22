export interface ApiResponse {
    statusCode: number;
    statusText: string;
    responseTime: number;
    body: any;
    headers?: { [key: string]: string };
    error?: string;
  }