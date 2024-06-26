'use client';

import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import {
  updateUserStatus,
  usersFriendsWithCurrentUserFetcher,
} from '@/domain/services/user';
import { HttpError } from '@/lib/http';
import { useAuthStore } from '@/lib/store';
import ROUTES from '@/routes';
import {
  RiEditBoxLine,
  RiLockLine,
  RiPencilLine,
  RiUserAddLine,
} from '@remixicon/react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export default function Home() {
  const [status, setStatus] = useState('');
  const [updateStatus, setUpdateStatus] = useState(false);
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { data: userFriends } = useSWR(
    user ? { key: 'fetch_user_friends' } : null,
    usersFriendsWithCurrentUserFetcher,
  );

  const onUpdateUserStatus = async () => {
    setLoading(true);

    try {
      const updatedUser = await updateUserStatus(status);

      // success, update state
      setUser(updatedUser);
      setStatus('');
      setUpdateStatus(false);

      // show success message
      toast.success('New status saved successfully');

      // broadcast to friends websocket channels
      broadcastStatusUpdateToFriends();
    } catch (error) {
      const httpError = error as HttpError;
      toast.error(httpError.message);
    } finally {
      setLoading(false);
    }
  };

  const broadcastStatusUpdateToFriends = () => {
    if (userFriends) {
      for (const userFriend of userFriends) {
        // connect to user websocket channel
        const websocket = new WebSocket(
          `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws/${userFriend.id}`,
        );

        websocket.onopen = (event) => {
          // send message
          websocket.send(
            `${user?.name} just updated their status. Go to my friends or status updates page to view|info`,
          );

          websocket.onmessage = (event) => {
            // disconnect once message is received
            websocket.close();
          };
        };
      }
    }
  };

  return (
    <div>
      {user && (
        <div>
          <div className="text-[25px]">Hello {user.name}</div>
          <div className="text-[15px]">{user.email}</div>
          <div className="flex gap-2 text-[15px]">
            <div className="text-gray-700">
              {user.bio && user.bio != '' ? user.bio : 'No bio set'}.
            </div>
            <div className="flex cursor-pointer gap-1 items-center">
              Edit Bio <RiPencilLine size={18} />
            </div>
          </div>

          <div className="border-t mt-3 pt-3">
            <span className="text-gray-500">Your current status is</span>:&nbsp;
            {user.status ?? 'n/a'}
          </div>
          <div>
            <span className="text-gray-500">You have</span>: TBA friends
          </div>
          <div>
            <span className="text-gray-500">You have received</span>: TBA
            pending requests
          </div>
          <div>
            <span className="text-gray-500">You have sent</span>: TBA pending
            requests
          </div>

          <div className="mt-7">
            {!updateStatus && (
              <div className="flex gap-4">
                <Button onClick={() => setUpdateStatus(true)}>
                  Update status <RiEditBoxLine size={18} />
                </Button>
                <Link href={ROUTES.findFriends}>
                  <Button>
                    Find friends <RiUserAddLine size={18} />
                  </Button>
                </Link>
                <Button disabled>
                  Change password <RiLockLine size={18} />
                </Button>
              </div>
            )}

            {updateStatus && (
              <div className="max-w-[50%]">
                <TextArea
                  placeholder="Type your new status and click the update button to save. All your friends currently online will get a realtime notification."
                  onChange={(e) => setStatus(e.target.value)}
                />
                <div className="mt-3 flex gap-3">
                  <Button
                    disabled={status == '' || loading}
                    loading={loading}
                    variant="success"
                    onClick={onUpdateUserStatus}>
                    Update <RiEditBoxLine size={18} />
                  </Button>

                  <Button
                    disabled={loading}
                    variant="default"
                    onClick={() => setUpdateStatus(false)}>
                    Cancel <RiEditBoxLine size={18} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
