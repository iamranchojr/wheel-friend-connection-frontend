import { User } from '@/domain/models';
import { castToUserList } from '@/domain/models';
import http from '@/lib/http';
import { Fetcher } from 'swr';

interface UsersFetcherParams {
  key: string;
  queryParams?: {
    query?: string;
    seekId?: number;
    limit?: number;
  };
}

export const usersFetcher: Fetcher<User[], UsersFetcherParams> = (params) => {
  let path = '/users/list?';

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
    return castToUserList(data);
  });
};
