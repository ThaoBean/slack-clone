"use client";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import { useCurrentUser } from "../hooks";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {
  const { data, isLoading } = useCurrentUser();
  const { signOut } = useAuthActions();

  if (isLoading) {
    return <Loader className='size-4 animate-spin text-muted-foreground' />;
  }

  if (data === null) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='outline-none relative'>
        <Avatar className='rounded-md size-10 hover:opacity-75 transition'>
          <AvatarImage
            className='rounded-md'
            alt={data?.name}
            src={data?.image}
          />
          <AvatarFallback className='rounded-md bg-sky-400 text-white'>
            {data?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' side='right' className='w-60'>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className='size-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
