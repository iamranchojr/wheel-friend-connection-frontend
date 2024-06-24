import { AuthResponse, castToAuthResponse } from '@/domain/models';
import http from '@/lib/http';
import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string().email().label('Email address').required(),
  password: yup.string().label('Password').required(),
});

export interface LoginPayload extends yup.InferType<typeof loginSchema> {}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  // create form data
  const formData = new FormData();
  formData.append('username', payload.username);
  formData.append('password', payload.password);

  const response = await http.post('/auth/login/', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return castToAuthResponse(response.data);
};
