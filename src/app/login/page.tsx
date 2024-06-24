'use client';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { login, loginSchema } from '@/domain/services/auth';
import { HttpError } from '@/lib/http';
import { useAuthStore } from '@/lib/store';
import ROUTES from '@/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import * as yup from 'yup';

type LoginData = yup.InferType<typeof loginSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { setAuthToken, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginData) => {
    // update state
    setLoading(true);

    try {
      // authenticate user
      const response = await login(data);

      // show success message
      toast.success('Login successful.');

      // update user state
      setUser(response.user);
      setAuthToken(response.token.accessToken);
    } catch (error) {
      const httpError = error as HttpError;
      toast.error(httpError.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="border rounded-lg w-[420px] p-7 shadow">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
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
              errorMessage={errors.username?.message}
              yupProps={register('username')}
            />
          </div>

          <div className="mt-6">
            <TextInput
              id="password"
              label="Password"
              type="password"
              placeholder="Your password"
              errorMessage={errors.password?.message}
              yupProps={register('password')}
            />
          </div>

          <div className="mt-4">
            <Link href={'#'} className="text-primary text-[14px]">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-7 flex justify-end">
            <Button
              disabled={loading || !isValid}
              loading={loading}
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
