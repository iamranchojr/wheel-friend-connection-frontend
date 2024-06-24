'use client';

import FriendCard, { FriendStatus } from '@/components/FriendCard';
import Spinner from '@/components/Spinner';
import { Friend } from '@/domain/models';
import { friendsFetcher } from '@/domain/services/friend';
import { HttpError } from '@/lib/http';
import { useState } from 'react';
import useSWRInfinite from 'swr/infinite';

const PAGE_LIMIT = 50;

export default function MyFriends() {
  const [query, setQuery] = useState('');

  const {
    data: friendsData,
    error: friendsFetchError,
    isLoading: isFetchingFriends,
    size,
    setSize,
  } = useSWRInfinite((pageIndex: number, previousPageData?: Friend[]) => {
    let seekId = 0;

    if (previousPageData) {
      seekId = previousPageData[previousPageData.length - 1].id;
    }

    return {
      key: 'fetch_friends',
      queryParams: {
        seekId,
        query,
        limit: PAGE_LIMIT,
      },
    };
  }, friendsFetcher);

  const friends: Friend[] = [];

  if (friendsData) {
    for (const data of friendsData) {
      friends.push(...data);
    }
  }

  return (
    <div>
      <div className="text-[25px] font-medium">My Friends</div>
      <div className="max-w-[50%] mt-5">
        {isFetchingFriends && <Spinner color="#000" size={20} />}

        {friendsFetchError && (
          <div className="text-red-500">
            {(friendsFetchError as HttpError).message}
          </div>
        )}

        {friends.map((friend, index) => (
          <div key={index} className="mb-3">
            <FriendCard friend={friend} />
          </div>
        ))}
      </div>
    </div>
  );
}
