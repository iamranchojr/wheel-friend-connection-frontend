import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from './store';

export enum HttpErrorType {
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  conflict,
  serverError,
  networkError,
}

export interface HttpError {
  message: string;
  errorType: HttpErrorType;
}

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // if headers are present and user is authenticated
  if (config.headers && useAuthStore.getState().authToken) {
    // set authorization header
    config.headers['authorization'] = `Bearer ${
      useAuthStore.getState().authToken
    }`;
  }

  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ error?: string; detail?: any }>) => {
    const statusCode = error.response?.status;

    if (statusCode) {
      switch (statusCode) {
        case 400 || 422:
          return Promise.reject({
            message: parseErrorResponse(error, 'Bad request'),
            errorType: HttpErrorType.badRequest,
          } as HttpError);
        case 401 || 403:
          // clear state and that should trigger log out
          useAuthStore.getState().logOut();
          break;
        case 403:
          return Promise.reject({
            message: parseErrorResponse(error, 'Access denied'),
            errorType: HttpErrorType.forbidden,
          } as HttpError);
        case 404:
          return Promise.reject({
            message: parseErrorResponse(error, 'Not found'),
            errorType: HttpErrorType.notFound,
          } as HttpError);
        case 409:
          return Promise.reject({
            message: parseErrorResponse(error, 'Conflict'),
            errorType: HttpErrorType.conflict,
          } as HttpError);

        case 500:
          return Promise.reject({
            message: parseErrorResponse(error, 'Server error'),
            errorType: HttpErrorType.serverError,
          } as HttpError);
        default:
          return Promise.reject({
            message: parseErrorResponse(error, 'Network error'),
            errorType: HttpErrorType.networkError,
          } as HttpError);
      }
    }

    return Promise.reject({
      message: 'A network error occurred.',
      errorType: HttpErrorType.networkError,
    } as HttpError);
  }
);

const parseErrorResponse = (
  error: AxiosError<{ error?: string; detail?: any }>,
  defaultMessage: string
): string => {
  if (Array.isArray(error.response?.data)) {
    let combinedError = '';
    error.response?.data.forEach((error) => `${(combinedError += error)}. `);
    return combinedError;
  } else if (error.response?.data?.error) {
    return error.response.data.error;
  } else if (error.response?.data?.detail) {
    return error.response.data.detail.toString();
  }

  return defaultMessage;
};

export default http;
