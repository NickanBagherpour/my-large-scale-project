import axios, { type AxiosError } from 'axios';

export function isAxiosError(error: Error | null): error is AxiosError {
  return axios.isAxiosError(error);
}
