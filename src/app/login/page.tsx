'use client';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import ROUTES from '@/routes';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="border rounded-lg w-[420px] p-5 shadow">
        <form className="">
          <h3 className="text-[30px] font-medium text-dark text-center">
            Log into your account
          </h3>

          <div className="text-gray-700 text-center text-[15px] font-medium">
            Enter your account details below to authenticate
          </div>

          <div className="mt-6">
            <TextInput
              id="username"
              label="Email address"
              type="email"
              placeholder="Your email address"
            />
          </div>

          <div className="mt-6">
            <TextInput
              id="password"
              label="Password"
              type="password"
              placeholder="Your password"
            />
          </div>

          <div className="mt-4">
            <Link href={'#'} className="text-primary text-[14px]">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-7 flex justify-end">
            <Button
              disabled={false}
              loading={false}
              type="submit"
              variant="primary">
              Log in
            </Button>
          </div>

          <div className="mt-5">
            <Link href={ROUTES.register} className="text-primary font-medium">
              Sign up ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
