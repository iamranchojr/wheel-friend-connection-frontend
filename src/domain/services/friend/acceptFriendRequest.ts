import { Friend, castToFriend } from '@/domain/models';
import http from '@/lib/http';

export const acceptFriendRequest = async (
  friendId: number,
): Promise<Friend> => {
  const response = await http.put(`/friends/${friendId}/accept`);
  return castToFriend(response.data);
};
