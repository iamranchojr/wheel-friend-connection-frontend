import * as yup from 'yup';
import { userSchema } from './User';
import { tokenSchema } from './Token';

const authResponseSchema = yup
  .object({
    user: userSchema.required(),
    token: tokenSchema.required(),
  })
  .camelCase();

export interface AuthResponse
  extends yup.InferType<typeof authResponseSchema> {}

export const castToAuthResponse = (data: any): AuthResponse =>
  authResponseSchema.cast(data);
