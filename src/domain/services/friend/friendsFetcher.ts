import { Friend, castToFriendList } from '@/domain/models';
import http from '@/lib/http';
import { Fetcher } from 'swr';

interface FriendsFetcherParams {
  key: string;
  queryParams?: {
    query?: string;
    seekId?: number;
    limit?: number;
  };
}

export const friendsFetcher: Fetcher<Friend[], FriendsFetcherParams> = (
  params,
) => {
  let path = '/friends/list?';

  if (params.queryParams) {
    if (params.queryParams.seekId) {
      path += `seek_id=${params.queryParams.seekId}`;
    }

    if (params.queryParams.seekId) {
      path += `&limit=${params.queryParams.limit}`;
    }

    if (params.queryParams.seekId) {
      path += `&query=${params.queryParams.query}`;
    }
  }

  return http.get(path).then(({ data }) => {
    return castToFriendList(data);
  });
};
