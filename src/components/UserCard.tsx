import { RiArrowDownSLine, RiArrowUpSLine, RiUserLine } from '@remixicon/react';
import Button from './Button';

interface UserCardProps {
  expand?: boolean;
  onViewClicked: Function;
}

export default function User({ expand, onViewClicked }: UserCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between gap-3  ">
        <div className="flex gap-3">
          <div>
            <RiUserLine size={35} className="text-gray-500" />
          </div>
          <div>
            <div className="text-[20px] font-medium">Abigail</div>
            <div className="text-gray-700 text-[15px]">
              Joined on 24 Jan, 2024
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
            <div>Heyy, I am Abi, send a friend request and lets vibe</div>

            <div className="mt-2">
              <Button variant="primary">Add friend</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
