import { RiUserSmileLine } from '@remixicon/react';
import Badge from './Badge';
import Button from './Button';
import { Friend, FriendStatus } from '@/domain/models';
import { useAuthStore } from '@/lib/store';

interface FriendProps {
  friend: Friend;
}

export default function FriendCard({ friend }: FriendProps) {
  const { user: currentUser } = useAuthStore();

  return (
    <div className="flex justify-between items-center gap-3 border rounded-lg p-4">
      <div className="flex gap-3 items-center">
        <div>
          <RiUserSmileLine size={35} className="text-gray-500" />
        </div>
        <div>
          <div className="text-[19px] font-medium">
            {friend.senderId == currentUser?.id
              ? friend.recipient.name
              : friend.sender.name}
          </div>

          {friend.status == FriendStatus.Pending &&
            friend.senderId == currentUser?.id && (
              <div className="text-gray-700 text-[14px]">
                You sent a friend request on 24 Jan 2024
              </div>
            )}

          {friend.status == FriendStatus.Pending &&
            friend.recipientId == currentUser?.id && (
              <div className="text-gray-700 text-[14px]">
                You received a friend request on 24 Jan 2024
              </div>
            )}
          {/* <div className="text-gray-700">Young. Gited. and Black</div> */}
        </div>
      </div>

      <div>
        {friend.status == FriendStatus.Pending &&
          friend.recipientId == currentUser?.id && (
            <div className="flex gap-2">
              <Button variant="success">Accept</Button>
              <Button variant="danger">Decline</Button>
            </div>
          )}

        {friend.status == FriendStatus.Pending &&
          friend.senderId == currentUser?.id && (
            <Badge label={friend.status} variant="warning" />
          )}
      </div>
    </div>
  );
}
