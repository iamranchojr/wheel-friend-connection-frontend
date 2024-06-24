'use client';

import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { registerUser, registerUserSchema } from '@/domain/services/user';
import { HttpError } from '@/lib/http';
import { useAuthStore } from '@/lib/store';
import ROUTES from '@/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import * as yup from 'yup';

type RegisterUserData = yup.InferType<typeof registerUserSchema>;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { setAuthToken, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterUserData>({
    resolver: yupResolver(registerUserSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterUserData) => {
    // update state
    setLoading(true);

    try {
      // authenticate user
      const response = await registerUser(data);

      // show success message
      toast.success('Registration successful.');

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
            Create an account
          </h3>

          <div className="text-gray-700 text-center text-[15px] font-medium">
            Enter the details below to create an account
          </div>

          <div className="mt-6">
            <TextInput
              id="name"
              label="Name"
              placeholder="Your name"
              errorMessage={errors.name?.message}
              yupProps={register('name')}
            />
          </div>

          <div className="mt-6">
            <TextInput
              id="emailAddress"
              label="Email address"
              type="email"
              placeholder="Your email address"
              errorMessage={errors.email?.message}
              yupProps={register('email')}
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

          <div className="mt-6">
            <TextArea
              id="bio"
              label="Bio"
              placeholder="Add a short bio of yourself"
              errorMessage={errors.bio?.message}
              yupProps={register('bio')}
            />
          </div>

          <div className="mt-7 flex justify-end">
            <Button
              disabled={loading || !isValid}
              loading={loading}
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
