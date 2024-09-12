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
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard: React.FC<SignUpCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const [value, setValue] = useState({
    name: "",
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

  const handlePasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    if (value.password !== value.confirmPassword) {
      setError("Password does not match!");
      setPending(false);
      return;
    }

    signIn("password", {
      ...value,
      flow: "signUp",
    })
      .catch(() => {
        setError("Something went wrong!");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleProviderSignUp = (type: "github" | "google") => {
    setPending(true);
    signIn(type).finally(() => {
      setPending(false);
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

      {!!error && (
        <div className='bg-destructive/15 p-3 round-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
          <p>{error}</p>
        </div>
      )}

      <CardContent className='space-y-5 px-0 pb-0'>
        <form onSubmit={handlePasswordSignUp} className='space-y-2.5'>
          <Input
            disabled={pending}
            value={value.name}
            onChange={(e) => handleChangeValue("name", e.target.value)}
            placeholder='Full name'
            required
          />
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
          <Input
            disabled={pending}
            value={value.confirmPassword}
            onChange={(e) =>
              handleChangeValue("confirmPassword", e.target.value)
            }
            type='password'
            placeholder='Confirm password'
            required
          />
          <Button disabled={pending} type='submit' className='w-full' size='lg'>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp("google")}
            variant='outline'
            size='lg'
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-3 left-2.5' />
            Continue with google
          </Button>

          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp("github")}
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
