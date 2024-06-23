'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import SideBar from '@/components/SideBar';

const inter = Inter({ subsets: ['latin'] });

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <main data-theme="light" className={`w-full  ${inter.className}`}>
        <div className="min-h-screen">
          <SideBar />

          <div className="bg-white relative lg:pl-[250px] p-8">
            <div className="w-full max-w-[1500px] px-[20px] mx-auto mt-5">
              {children}
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}
