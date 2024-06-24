'use client';

import { useAuthStore } from '@/lib/store';
import routes from '@/routes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      /* user is authenticated */

      // check if user is on login or register page, or landing page
      if (
        pathname.startsWith(routes.login) ||
        pathname.startsWith(routes.register) ||
        pathname.startsWith(routes.landingPage)
      ) {
        // redirect to home
        router.replace(routes.home);
      }

      return;
    }

    /* user is not authenticated */

    // check if user is not visiting login or register page
    if (
      !pathname.startsWith(routes.login) &&
      !pathname.startsWith(routes.register)
    ) {
      // redirect to landing page
      router.replace(routes.landingPage);
    }
  }, [user, pathname, router]);

  return <div>{children}</div>;
}
