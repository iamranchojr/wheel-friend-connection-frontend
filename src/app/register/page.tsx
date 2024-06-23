'use client';

import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import ROUTES from '@/routes';
import Link from 'next/link';

export default function Register() {
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="border rounded-lg w-[420px] p-5 shadow">
        <form className="">
          <h3 className="text-[30px] font-medium text-dark text-center">
            Create an account
          </h3>

          <div className="text-gray-700 text-center text-[15px] font-medium">
            Enter the details below to create an account
          </div>

          <div className="mt-6">
            <TextInput id="name" label="Name" placeholder="Your name" />
          </div>

          <div className="mt-6">
            <TextInput
              id="emailAddress"
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

          <div className="mt-6">
            <TextArea
              id="bio"
              label="Bio"
              placeholder="Add a short bio of yourself"
            />
          </div>

          <div className="mt-7 flex justify-end">
            <Button
              disabled={false}
              loading={false}
              type="submit"
              variant="primary">
              Sign up
            </Button>
          </div>

          <div className="mt-5">
            <Link href={ROUTES.login} className="font-medium">
              Log in ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
