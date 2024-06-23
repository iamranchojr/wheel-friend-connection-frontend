'use client';

import FriendCard, { FriendStatus } from '@/components/FriendCard';

export default function MyFriends() {
  return (
    <div>
      <div className="text-[25px] font-medium">My Friends</div>
      <div className="max-w-[50%] mx-auto mt-8">
        {[0, 1, 2].map((i, index) => (
          <div key={index} className="mb-5">
            <FriendCard
              status={FriendStatus.Pending}
              sentByCurrentUser={i == 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
