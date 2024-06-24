import { User } from '@/domain/models';
import TimeAgo from 'javascript-time-ago';

interface UserStatusItemProps {
  user: User;
}

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo('en-US');

export default function UserStatusItem({ user }: UserStatusItemProps) {
  return (
    <div>
      <div className="text-gray-700 text-[15px]">
        {user.name} updated their status
      </div>
      <div className="mt-1">{user.status}</div>
      <div className="text-gray-500 text-[14px] mt-3">
        {timeAgo.format(user.updatedAt!)}
      </div>
      <div className="border-b mt-3"></div>
    </div>
  );
}
