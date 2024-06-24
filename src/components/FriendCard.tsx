import { RiUserSmileLine } from '@remixicon/react';
import Badge from './Badge';
import Button from './Button';
import { Friend, FriendStatus } from '@/domain/models';
import { useAuthStore } from '@/lib/store';
import { useState } from 'react';
import { HttpError } from '@/lib/http';
import { toast } from 'react-toastify';
import {
  acceptFriendRequest,
  declineFriendRequest,
} from '@/domain/services/friend';

interface FriendProps {
  friend: Friend;
  onMutate: Function;
}

export default function FriendCard({ friend, onMutate }: FriendProps) {
  const { user: currentUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const onAcceptFriend = async () => {
    setLoading(true);

    try {
      await acceptFriendRequest(friend.id);
      onMutate();

      // show success message
      toast.success(
        `You have successfully accepted the friend request from ${friend.sender.name}`,
      );

      // broadcast realtime update
      broadcastWebsocketEventToSender(
        `${currentUser?.name} accepted your friend request. You can now view their status from status updates page|success`,
      );
    } catch (error) {
      const httpError = error as HttpError;
      toast.error(httpError.message);
    } finally {
      setLoading(false);
    }
  };

  const onDeclineFriend = async () => {
    setLoading(true);

    try {
      await declineFriendRequest(friend.id);
      onMutate();
      toast.success(
        `You have successfully declined the friend request from ${friend.sender.name}`,
      );

      // broadcast realtime update
      broadcastWebsocketEventToSender(
        `${currentUser?.name} declined your friend request. You can no longer send a friend request to this user|error`,
      );
    } catch (error) {
      const httpError = error as HttpError;
      toast.error(httpError.message);
    } finally {
      setLoading(false);
    }
  };

  // TODO: this can be moved into a utility function since it's now been defined in multi places
  const broadcastWebsocketEventToSender = (message: string) => {
    // connect to user websocket channel
    const websocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws/${friend.sender.id}`,
    );

    websocket.onopen = (event) => {
      // send message
      websocket.send(message);

      websocket.onmessage = (event) => {
        // disconnect once message is received
        websocket.close();
      };
    };
  };

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
                You sent a friend request on{' '}
                {friend.createdAt!.toLocaleDateString('en-CA', {
                  dateStyle: 'medium',
                })}
              </div>
            )}

          {friend.status == FriendStatus.Pending &&
            friend.recipientId == currentUser?.id && (
              <div className="text-gray-700 text-[14px]">
                You received a friend request on{' '}
                {friend.createdAt!.toLocaleDateString('en-CA', {
                  dateStyle: 'medium',
                })}
              </div>
            )}
          {friend.status == FriendStatus.Accepted && (
            <div>
              <div className="text-gray-700">
                {friend.senderId == currentUser?.id
                  ? friend.recipient.status
                  : friend.sender.status}
              </div>

              <div className="text-gray-700 text-[14px] mt-1">
                Friends since{' '}
                {friend.updatedAt!.toLocaleDateString('en-CA', {
                  dateStyle: 'medium',
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        {friend.status == FriendStatus.Pending &&
          friend.recipientId == currentUser?.id && (
            <div className="flex gap-2">
              <Button
                loading={loading}
                disabled={loading}
                variant="success"
                onClick={onAcceptFriend}>
                Accept
              </Button>
              <Button
                loading={loading}
                disabled={loading}
                variant="danger"
                onClick={onDeclineFriend}>
                Decline
              </Button>
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
