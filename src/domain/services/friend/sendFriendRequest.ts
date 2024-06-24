import { Friend, castToFriend } from '@/domain/models';
import http from '@/lib/http';

export const sendFriendRequest = async (
  recipientId: number,
  message?: string,
): Promise<Friend> => {
  const response = await http.post('/friends/request/', {
    recipient_id: recipientId,
    message,
  });
  return castToFriend(response.data);
};
