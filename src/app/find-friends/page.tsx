'use client';

import Spinner from '@/components/Spinner';
import UserCard from '@/components/UserCard';
import { User } from '@/domain/models';
import { usersFetcher } from '@/domain/services/user';
import { HttpError } from '@/lib/http';
import { useState } from 'react';
import useSWRInfinite from 'swr/infinite';

const PAGE_LIMIT = 50;

export default function FindFriends() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [query, setQuery] = useState('');

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
        query,
        limit: PAGE_LIMIT,
      },
    };
  }, usersFetcher);

  const users: User[] = [];

  if (usersData) {
    for (const data of usersData) {
      users.push(...data);
    }
  }

  return (
    <div>
      <div className="text-[25px] font-medium">Find Friends</div>
      <div className="max-w-[50%] mt-5">
        {isFetchingUsers && <Spinner color="#000" size={20} />}

        {usersFetchError && (
          <div className="text-red-500">
            {(usersFetchError as HttpError).message}
          </div>
        )}

        {users.map((user, i) => (
          <div key={i} className="mb-3">
            <UserCard
              user={user}
              expand={selectedUser == i}
              onViewClicked={() => {
                if (selectedUser == i) {
                  setSelectedUser(null);
                } else {
                  setSelectedUser(i);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
