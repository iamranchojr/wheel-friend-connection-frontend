import { Friend, castToFriend } from '@/domain/models';
import http from '@/lib/http';

export const fetchFriendWithOtherUser = async (
  otherUserId: number,
): Promise<Friend> => {
  const path = `/friends/get-with-other-user?other_user_id=${otherUserId}`;
  const response = await http.get(path);
  return castToFriend(response.data);
};
