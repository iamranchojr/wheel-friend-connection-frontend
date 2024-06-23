'use client';

import UserStatusItem from '@/components/UserStatusItem';

export default function StatusUpdates() {
  return (
    <div>
      <div className="text-[25px] font-medium">Status Updates</div>
      <div className="max-w-[50%] mx-auto mt-8">
        {[0, 1, 2].map((i, index) => (
          <div key={index} className="mb-5">
            <UserStatusItem />
          </div>
        ))}
      </div>
    </div>
  );
}
