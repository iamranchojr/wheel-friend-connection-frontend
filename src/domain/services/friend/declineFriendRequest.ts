import { Friend, castToFriend } from '@/domain/models';
import http from '@/lib/http';

export const declineFriendRequest = async (
  friendId: number,
): Promise<Friend> => {
  const response = await http.put(`/friends/${friendId}/decline`);
  return castToFriend(response.data);
};
