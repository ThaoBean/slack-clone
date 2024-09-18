"use client";
import { UserButton } from "@/features/auth/components";
import { useGetWorkspaces } from "@/features/workspaces/hooks";
import { useCreateWorkspaceModal } from "@/features/workspaces/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Home() {
  const router = useRouter();

  const { data, isLoading } = useGetWorkspaces();

  const [open, setOpen] = useCreateWorkspaceModal();

  const workSpaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workSpaceId) {
      router.replace(`workspace/${workSpaceId}`);
    } else if (!open) {
      setOpen(true);
      console.log("Open modal create work space");
    }
  }, [workSpaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
