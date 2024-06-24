'use client';

import Button from '@/components/Button';
import { useAuthStore } from '@/lib/store';
import {
  RiEditBoxLine,
  RiLockLine,
  RiPencilLine,
  RiUserAddLine,
} from '@remixicon/react';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div>
      {user && (
        <div>
          <div className="text-[25px]">Hello {user.name}</div>
          <div className="text-[15px]">{user.email}</div>
          <div className="flex gap-2 text-[15px]">
            <div className="text-gray-700">{user.bio}.</div>
            <div className="flex cursor-pointer gap-1">
              Edit Bio <RiPencilLine size={18} />
            </div>
          </div>

          <div className="border-t mt-3 pt-3">
            <span className="text-gray-500">Your current status is</span>:&nbsp;
            {user.status ?? 'n/a'}
          </div>
          <div>
            <span className="text-gray-500">You have</span>: n/a friends
          </div>
          <div>
            <span className="text-gray-500">You have received</span>: n/a
            pending requests
          </div>
          <div>
            <span className="text-gray-500">You have sent</span>: n/a pending
            requests
          </div>

          <div className="mt-7 flex gap-4">
            <Button>
              Update status <RiEditBoxLine size={18} />
            </Button>
            <Button>
              Find friends <RiUserAddLine size={18} />
            </Button>
            <Button>
              Change password <RiLockLine size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
