import { RiArrowDownSLine, RiArrowUpSLine, RiUserLine } from '@remixicon/react';
import Button from './Button';
import { Friend, User } from '@/domain/models';
import { useEffect, useState } from 'react';
import { fetchFriendWithOtherUser } from '@/domain/services/friend';
import Spinner from './Spinner';
import { HttpError, HttpErrorType } from '@/lib/http';
import { toast } from 'react-toastify';

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
  const [loading, setLoading] = useState(false);
  const [friend, setFriend] = useState<Friend | null>(null);

  const fetchFriendWithCurrentUser = async () => {
    if (!loading) {
      setLoading(true);

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
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (expand && !validated) {
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
            <div className="text-[19px] font-medium">{user.name}</div>
            <div className="text-gray-700 text-[15px]">
              Joined on{' '}
              {user.createdAt!.toLocaleDateString('en-CA', {
                dateStyle: 'medium',
              })}
            </div>
          </div>
        </div>

        <div>
          <Button
            variant={expand ? 'default' : 'primary'}
            onClick={() => onViewClicked()}>
            {expand ? 'Close' : 'View'}{' '}
            {expand ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </Button>
        </div>
      </div>

      {expand && (
        <div>
          <div className="border-t mt-5"></div>
          <div className="mt-5 px-12 text-gray-800">
            {user.bio && <div>{user.bio}</div>}

            <div className="mt-2">
              {loading && (
                <div className="flex gap-2 items-center">
                  <Spinner color="#000" />{' '}
                  <span className="text-[14px] text-gray-600">
                    Please wait...
                  </span>
                </div>
              )}

              {validated && !friend && (
                <Button variant="primary">Add friend</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
