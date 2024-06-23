'use client';

import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { RiEditBoxLine, RiLockLine, RiUserAddLine } from '@remixicon/react';

export default function Home() {
  return (
    <div>
      <div className="text-[25px]">Hello Sam</div>
      <div>
        <span className="text-gray-500">Your current status is</span>: Young.
        Gifted. and Black
      </div>
      <div>
        <span className="text-gray-500">You have</span>: 10 friends
      </div>
      <div>
        <span className="text-gray-500">You have received</span>: 10 pending
        requests
      </div>
      <div>
        <span className="text-gray-500">You have sent</span>: 10 pending
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

      <TextInput />

      <br />

      <TextArea />
    </div>
  );
}
