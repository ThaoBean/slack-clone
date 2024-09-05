"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Separator,
} from "@/components/ui";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard: React.FC<SignUpCardProps> = ({ setState }) => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeValue = (name: string, _value: string) => {
    setValue({
      ...value,
      [name]: _value,
    });
  };

  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Sign up to continue </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5'>
          <Input
            value={value.email}
            onChange={(e) => handleChangeValue("email", e.target.value)}
            type='email'
            placeholder='Email'
            required
          />
          <Input
            value={value.password}
            onChange={(e) => handleChangeValue("password", e.target.value)}
            type='password'
            placeholder='Password'
            required
          />
          <Input
            value={value.confirmPassword}
            onChange={(e) =>
              handleChangeValue("confirmPassword", e.target.value)
            }
            type='password'
            placeholder='Confirm password'
            required
          />
          <Button type='submit' className='w-full' size='lg'>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button
            onClick={() => {}}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-3 left-2.5' />
            Continue with google
          </Button>

          <Button
            onClick={() => {}}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-3 left-2.5' />
            Continue with github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Don&apos;t have an account?{" "}
          <span
            className='text-sky-700  hover:underline cursor-pointer'
            onClick={() => setState("signIn")}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
