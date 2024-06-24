import { RiArrowDownSLine, RiArrowUpSLine, RiUserLine } from '@remixicon/react';
import Button from './Button';
import { Friend, FriendStatus, User } from '@/domain/models';
import { useEffect, useState } from 'react';
import {
  fetchFriendWithOtherUser,
  sendFriendRequest,
} from '@/domain/services/friend';
import Spinner from './Spinner';
import { HttpError, HttpErrorType } from '@/lib/http';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/lib/store';

interface UserCardProps {
  user: User;
  expand?: boolean;
  onViewClicked: Function;
}

export default function UserCard({
  user,
  expand,
  onViewClicked,
}: UserCardProps) {
  const [validated, setValidated] = useState(false);
  const [fetchingFriend, setFetchingFriend] = useState(false);
  const [friend, setFriend] = useState<Friend | null>(null);
  const [sendingFriendRequest, setSendingFriendRequest] = useState(false);
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  const { user: currentUser } = useAuthStore();

  const fetchFriendWithCurrentUser = async () => {
    if (!fetchingFriend) {
      setFetchingFriend(true);

      try {
        const friend = await fetchFriendWithOtherUser(user.id);
        setFriend(friend);
        setValidated(true);
      } catch (error) {
        const httpError = error as HttpError;

        if (httpError.errorType == HttpErrorType.notFound) {
          setValidated(true);
        } else {
          toast.error(httpError.message);
        }
      } finally {
        setFetchingFriend(false);
      }
    }
  };

  const onSendFriendRequest = async () => {
    setSendingFriendRequest(true);
    try {
      const friend = await sendFriendRequest(user.id);
      setFriend(friend);
      setFriendRequestSent(true);

      // show success message
      toast.success(
        `Your friend request was successfully sent to ${user.name}`,
      );

      // broadcast realtime update
      broadcastWebsocketEventToRecipient();
    } catch (error) {
      const httpError = error as HttpError;
      toast.error(httpError.message);
    } finally {
      setSendingFriendRequest(false);
    }
  };

  const broadcastWebsocketEventToRecipient = () => {
    // connect to user websocket channel
    const websocket = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_API_HOST}/ws/${user.id}`,
    );

    websocket.onopen = (event) => {
      // send message
      websocket.send(
        `${currentUser?.name} sent you a friend request. Go to my friends to accept or decline|warning`,
      );

      websocket.onmessage = (event) => {
        // disconnect once message is received
        websocket.close();
      };
    };
  };

  useEffect(() => {
    if (expand && !validated && currentUser?.id != user.id) {
      fetchFriendWithCurrentUser();
    }
  }, [expand, validated]);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between gap-3  ">
        <div className="flex gap-3 items-center">
          <div>
            <RiUserLine size={30} className="text-gray-500" />
          </div>
          <div>
            <div className="text-[19px] font-medium">
              {user.name}&nbsp;
              {currentUser?.id == user.id && (
                <span className="text-gray-600">(You)</span>
              )}
            </div>
            <div className="text-gray-700 text-[15px]">
              Joined on{' '}
              {user.createdAt!.toLocaleDateString('en-CA', {
                dateStyle: 'medium',
              })}
            </div>
          </div>
        </div>

        {currentUser?.id !== user.id && (
          <div>
            <Button
              variant={expand ? 'default' : 'primary'}
              onClick={() => onViewClicked()}>
              {expand ? 'Close' : 'View'}{' '}
              {expand ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </Button>
          </div>
        )}
      </div>

      {expand && (
        <div>
          <div className="border-t mt-5"></div>
          <div className="mt-5 px-11 text-gray-800">
            {user.bio && <div>{user.bio}</div>}

            <div className="mt-2">
              {fetchingFriend && (
                <div className="flex gap-2 items-center">
                  <Spinner color="#000" />{' '}
                  <span className="text-[14px] text-gray-600">
                    Please wait...
                  </span>
                </div>
              )}

              {validated && !friend && currentUser?.id != user.id && (
                <Button
                  variant="primary"
                  disabled={sendingFriendRequest}
                  loading={sendingFriendRequest}
                  onClick={onSendFriendRequest}>
                  Add friend
                </Button>
              )}

              {friendRequestSent && (
                <div className="text-yellow-600 text-[15px]">
                  Your friend request was sent
                </div>
              )}

              {!friendRequestSent &&
                friend?.status == FriendStatus.Pending &&
                friend.senderId == currentUser?.id && (
                  <div className="text-yellow-800 text-[15px]">
                    You sent a friend request on{' '}
                    {friend.createdAt!.toLocaleDateString('en-CA', {
                      dateStyle: 'medium',
                    })}
                  </div>
                )}

              {friend?.status == FriendStatus.Declined &&
                friend.senderId == currentUser?.id && (
                  <div className="text-red-600 text-[15px]">
                    Your friend request was declined
                  </div>
                )}

              {friend?.status == FriendStatus.Declined &&
                friend.recipientId == currentUser?.id && (
                  <div className="text-red-600 text-[15px]">
                    You declined this friend request
                  </div>
                )}

              {friend?.status == FriendStatus.Pending &&
                friend.senderId != currentUser?.id && (
                  <div className="text-green-800 text-[15px]">
                    You received a friend request on{' '}
                    {friend.createdAt!.toLocaleDateString('en-CA', {
                      dateStyle: 'medium',
                    })}
                    . Go to my friends to manage this request.
                  </div>
                )}

              {friend?.status == FriendStatus.Accepted && (
                <div className="text-green-700 text-[15px]">
                  You are friends with {user.name}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
