"use client";
import { Button } from "@/components/ui";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div>
      Logged in
      <div>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    </div>
  );
}
