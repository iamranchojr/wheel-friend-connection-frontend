import { User, castToUser } from '@/domain/models';
import http from '@/lib/http';

export const updateUserStatus = async (new_status: string): Promise<User> => {
  const response = await http.put('/users/me/update-status/', {
    new_status,
  });
  return castToUser(response.data);
};
