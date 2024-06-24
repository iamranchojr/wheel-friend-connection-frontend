'use client';

import UserCard from '@/components/UserCard';
import { useState } from 'react';

export default function FindFriends() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  return (
    <div>
      <div className="text-[25px] font-medium">Find Friends</div>
      <div className="max-w-[50%] mt-5">
        {[0, 1, 2].map((i, index) => (
          <div key={index} className="mb-5">
            <UserCard
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
