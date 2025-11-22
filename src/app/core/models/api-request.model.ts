import { HttpMethod } from './http-method.enum';

export interface ApiRequest {
  url: string;
  method: HttpMethod;
  headers: { [key: string]: string };
  body?: any;
}

export interface HeaderItem {
  key: string;
  value: string;
}