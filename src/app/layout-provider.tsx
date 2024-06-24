'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import SideBar from '@/components/SideBar';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthStore } from '@/lib/store';
import AuthProvider from './auth-provider';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

let websocket: WebSocket | null;

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      // close any previous connections
      websocket?.close();

      // connect to user websocket channel
      websocket = new WebSocket(
        `ws://${process.env.NEXT_PUBLIC_API_HOST}/ws/${user.id}`,
      );

      websocket.onmessage = (event) => {
        const messageSplit = (event.data as string).split('|');
        if (messageSplit.length > 1) {
          const message = messageSplit[0];
          const status = messageSplit[1];
          if (status == 'warning') {
            toast.warn(message);
          } else if (status == 'success') {
            toast.success(message);
          } else if (status == 'error') {
            toast.error(message);
          } else {
            toast.info(message);
          }
        } else {
          toast.info(event.data);
        }
      };
    }
  }, [user]);

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
