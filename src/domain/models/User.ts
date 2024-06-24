import * as yup from 'yup';

export const userSchema = yup
  .object({
    id: yup.number().required(),
    name: yup.string().required(),
    bio: yup.string().nullable(),
    status: yup.string().nullable(),
    username: yup.string().nullable(),
    isActive: yup.boolean(),
    email: yup.string().email().nullable(),
    emailVerifiedAt: yup.date().nullable(),
    createdAt: yup.date().nullable(),
    updatedAt: yup.date().nullable(),
  })
  .camelCase();

export interface User extends yup.InferType<typeof userSchema> {}

export const castToUser = (data: any): User => userSchema.cast(data);
