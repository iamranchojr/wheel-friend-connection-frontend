import { User } from '@/domain/models';
import { castToUserList } from '@/domain/models';
import http from '@/lib/http';
import { Fetcher } from 'swr';

interface UsersFriendsWithCurrentUserFetcherParams {
  key: string;
  queryParams?: {
    seekId?: number;
    limit?: number;
  };
}

export const usersFriendsWithCurrentUserFetcher: Fetcher<
  User[],
  UsersFriendsWithCurrentUserFetcherParams
> = (params) => {
  let path = '/users/list-users-who-are-friends-with-current-user?';

  if (params.queryParams) {
    if (params.queryParams.seekId) {
      path += `seek_id=${params.queryParams.seekId}`;
    }

    if (params.queryParams.seekId) {
      path += `&limit=${params.queryParams.limit}`;
    }
  }

  return http.get(path).then(({ data }) => {
    return castToUserList(data);
  });
};
