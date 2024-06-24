'use client';

import Spinner from '@/components/Spinner';
import UserStatusItem from '@/components/UserStatusItem';
import { User } from '@/domain/models';
import { usersFriendsWithCurrentUserFetcher } from '@/domain/services/user';
import { HttpError } from '@/lib/http';
import useSWRInfinite from 'swr/infinite';

const PAGE_LIMIT = 50;

export default function StatusUpdates() {
  const {
    data: usersData,
    error: usersFetchError,
    isLoading: isFetchingUsers,
    size,
    setSize,
  } = useSWRInfinite((pageIndex: number, previousPageData?: User[]) => {
    let seekId = 0;

    if (previousPageData) {
      seekId = previousPageData[previousPageData.length - 1].id;
    }

    return {
      key: 'fetch_users',
      queryParams: {
        seekId,
        limit: PAGE_LIMIT,
      },
    };
  }, usersFriendsWithCurrentUserFetcher);

  const users: User[] = [];

  if (usersData) {
    for (const data of usersData) {
      users.push(...data);
    }
  }

  return (
    <div>
      <div className="text-[25px] font-medium">Status Updates</div>
      <div className="max-w-[50%] mt-5">
        {isFetchingUsers && <Spinner color="#000" size={20} />}

        {usersFetchError && (
          <div className="text-red-500">
            {(usersFetchError as HttpError).message}
          </div>
        )}

        {users.map((user, index) => (
          <div key={index} className="mb-5">
            <UserStatusItem user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
