"use client";
import { UserButton } from "@/features/auth/components";
import { useGetWorkspaces } from "@/features/workspaces/hooks";
import { useCreateWorkspaceModal } from "@/features/workspaces/store";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();

  const [open, setOpen] = useCreateWorkspaceModal();

  const workSpaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (workSpaceId) {
      console.log("Redirect to work space");
    } else if (!open) {
      setOpen(true);
      console.log("Open modal create work space");
    }
  }, [workSpaceId, isLoading, open, setOpen]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
