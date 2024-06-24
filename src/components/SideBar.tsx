import { useAuthStore } from '@/lib/store';
import ROUTES from '@/routes';
import {
  RiChat1Line,
  RiGroup3Line,
  RiHomeLine,
  RiLogoutBoxLine,
  RiUserAddLine,
} from '@remixicon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useEffect } from 'react';

export default function SideBar() {
  const { logOut } = useAuthStore();
  const pathname = usePathname();

  return (
    <aside className="fixed border z-20 max-lg:ml-[-200px] p-6 top-0 left-0  bottom-0  h-screen transition-transform -translate-x-full  xs:translate-x-0 md:translate-x-0">
      <nav className="inline-flex flex-col space-y-2 w-[200px] mt-5">
        <SideBarNav
          active={pathname == ROUTES.home}
          path={ROUTES.home}
          icon={<RiHomeLine />}
          text="Dashboard"
        />
        <SideBarNav
          active={pathname == ROUTES.myFriends}
          path={ROUTES.myFriends}
          icon={<RiGroup3Line />}
          text="My Friends"
        />
        <SideBarNav
          active={pathname == ROUTES.findFriends}
          path={ROUTES.findFriends}
          icon={<RiUserAddLine />}
          text="Find friends"
        />
        <SideBarNav
          active={pathname == ROUTES.statusUpdates}
          path={ROUTES.statusUpdates}
          icon={<RiChat1Line />}
          text="Status updates"
        />
        <SideBarNav
          icon={<RiLogoutBoxLine />}
          danger
          text="Logout"
          onClick={(e) => {
            e.preventDefault();
            logOut();
          }}
        />
      </nav>
    </aside>
  );
}

function SideBarNav({
  icon,
  text,
  path,
  danger = false,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  path?: string;
  danger?: boolean;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={`${path ? path : '#'}`}
      className={`${
        active && 'bg-indigo-100 text-indigo-500'
      } flex items-center text-gray-600 py-2 cursor-pointer hover:bg-gray-100 px-2 rounded-lg`}
      onClick={onClick}>
      <span className={`w-8 h-8 p-1 mr-4 ${danger && 'text-red-500'}`}>
        {icon}
      </span>
      <span className={`font-medium select-none ${danger && 'text-red-500'}`}>
        {text}
      </span>
    </Link>
  );
}
