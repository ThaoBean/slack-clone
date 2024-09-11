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
import { useAuthActions } from "@convex-dev/auth/react";
import { SignInFlow } from "../types";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard: React.FC<SignInCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();

  const [pending, setPending] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChangeValue = (name: string, _value: string) => {
    setValue({
      ...value,
      [name]: _value,
    });
  };

  const handleProviderSignIn = (type: "github" | "google") => {
    setPending(true);
    signIn(type).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login to continue </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5'>
          <Input
            disabled={pending}
            value={value.email}
            onChange={(e) => handleChangeValue("email", e.target.value)}
            type='email'
            placeholder='Email'
            required
          />
          <Input
            disabled={pending}
            value={value.password}
            onChange={(e) => handleChangeValue("password", e.target.value)}
            type='password'
            placeholder='Password'
            required
          />
          <Button type='submit' className='w-full' size='lg' disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignIn("google")}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-3 left-2.5' />
            Continue with google
          </Button>

          <Button
            disabled={pending}
            onClick={() => handleProviderSignIn("github")}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-3 left-2.5' />
            Continue with github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Already have an account?{" "}
          <span
            className='text-sky-700  hover:underline cursor-pointer'
            onClick={() => (pending ? null : setState("signUp"))}
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
