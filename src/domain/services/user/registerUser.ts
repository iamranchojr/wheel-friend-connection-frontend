import { AuthResponse, castToAuthResponse } from '@/domain/models';
import http from '@/lib/http';
import * as yup from 'yup';

export const registerUserSchema = yup.object({
  name: yup.string().label('Name').required(),
  email: yup.string().email().label('Email address').required(),
  password: yup.string().label('Password').min(8).required(),
  bio: yup.string().label('Bio').notRequired().nullable(),
});

export interface RegisterUserPayload
  extends yup.InferType<typeof registerUserSchema> {}

export const registerUser = async (
  payload: RegisterUserPayload,
): Promise<AuthResponse> => {
  const response = await http.post('/users/register/', payload);
  return castToAuthResponse(response.data);
};
