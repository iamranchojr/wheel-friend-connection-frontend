'use client';

import Button from '@/components/Button';
import ROUTES from '@/routes';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="border rounded-lg w-[420px] p-7 shadow">
        <h3 className="text-[30px] font-medium text-dark text-center">
          Welcome to Wheel&apos;s Friend Connection app
        </h3>

        <div className="text-center text-gray-700">
          The new modern and easy way to connect with people from all over the
          world.
        </div>

        <div className="flex mt-5 gap-5">
          <Link href={ROUTES.login}>
            <Button>I have an account</Button>
          </Link>
          <Link href={ROUTES.register}>
            <Button variant="primary">Create new account</Button>
          </Link>
        </div>

        <div className="text-gray-600 mt-10">
          &copy; {new Date().getFullYear()}{' '}
          <Link href="https://getwheel.io" target="_blank">
            getwheel.io
          </Link>
        </div>
      </div>
    </div>
  );
}
