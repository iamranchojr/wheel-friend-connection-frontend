import * as yup from 'yup';

export enum TokenType {
  Bearer = 'bearer',
}

export const tokenSchema = yup
  .object({
    accessToken: yup.string().required(),
    tokenType: yup
      .mixed<TokenType>()
      .nullable()
      .test((value) => Object.values(TokenType).includes(value as TokenType)),
  })
  .camelCase();

export interface Token extends yup.InferType<typeof tokenSchema> {}

export const castToToken = (data: any): Token => tokenSchema.cast(data);
