import * as yup from 'yup';
import { userSchema } from './User';

export enum FriendStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Declined = 'Declined',
}

export const friendSchema = yup
  .object({
    id: yup.number().required(),
    status: yup
      .mixed<FriendStatus>()
      .required()
      .test((value) =>
        Object.values(FriendStatus).includes(value as FriendStatus),
      ),
    senderId: yup.number().required(),
    recipientId: yup.number().required(),
    sender: userSchema.required(),
    recipient: userSchema.required(),
    createdAt: yup.date().nullable(),
    updatedAt: yup.date().nullable(),
  })
  .camelCase();

export interface Friend extends yup.InferType<typeof friendSchema> {}

export const castToFriend = (data: any): Friend => friendSchema.cast(data);

export const castToFriendList = (data: any): Friend[] => {
  const parsedData = yup.array().of(friendSchema).cast(data);
  return parsedData ?? [];
};
