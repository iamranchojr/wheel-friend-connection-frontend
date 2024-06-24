'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import SideBar from '@/components/SideBar';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuthStore } from '@/lib/store';
import AuthProvider from './auth-provider';

const inter = Inter({ subsets: ['latin'] });

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthStore();

  return (
    <body>
      <main data-theme="light" className={`w-full  ${inter.className}`}>
        <AuthProvider>
          <div className="min-h-screen">
            {user && <SideBar />}

            <div className={`bg-white ${user && 'relative lg:pl-[260px] p-8'}`}>
              <div className="w-full max-w-[1500px] px-[20px] mx-auto mt-5">
                {children}
              </div>
            </div>
          </div>
        </AuthProvider>

        <ToastContainer />
      </main>
    </body>
  );
}
