import { RiUserSmileLine } from '@remixicon/react';
import Badge from './Badge';
import Button from './Button';

export enum FriendStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
}

interface FriendProps {
  status: FriendStatus;
  sentByCurrentUser: boolean;
}

export default function Friend({ status, sentByCurrentUser }: FriendProps) {
  return (
    <div className="flex justify-between items-center gap-3 border rounded-lg p-4">
      <div className="flex gap-3">
        <div>
          <RiUserSmileLine size={40} className="text-gray-500" />
        </div>
        <div>
          <div className="text-[19px] font-medium">Sam</div>
          <div className="text-gray-700 text-[15px]">
            You sent a friend request on 24 Jan 2024
          </div>
          {/* <div className="text-gray-700">Young. Gited. and Black</div> */}
        </div>
      </div>

      <div>
        {status == FriendStatus.Pending && sentByCurrentUser ? (
          <div className="flex gap-2">
            <Button variant="success">Accept</Button>
            <Button variant="danger">Decline</Button>
          </div>
        ) : (
          <Badge label={status} variant="warning" />
        )}
      </div>
    </div>
  );
}
