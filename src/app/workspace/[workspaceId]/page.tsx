"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader, TriangleAlert } from "lucide-react";
import { useWorkspaceId } from "@/hooks";
import { useGetChannels } from "@/features/channels/hooks";
import { useGetWorkspace } from "@/features/workspaces/hooks";
import { useCreateChannelModal } from "@/features/channels/store";
import { useCurrentMember } from "@/features/members/hooks";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelsLoading ||
      memberLoading ||
      !member ||
      !workspace
    )
      return;

    if (channelId)
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    else if (!open && isAdmin) setOpen(true);
  }, [
    member,
    memberLoading,
    isAdmin,
    channelId,
    workspaceLoading,
    channelsLoading,
    workspace,
    router,
    workspaceId,
    open,
    setOpen,
  ]);

  if (workspaceLoading || channelsLoading || memberLoading) {
    return (
      <div className='h-full flex-1 flex items-center justify-center flex-col gap-2'>
        <Loader className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className='h-full flex-1 flex items-center justify-center flex-col gap-2'>
        <TriangleAlert className='size-6  text-muted-foreground' />
        <span className='text-sm text-muted-foreground'>
          Workspace not found
        </span>
      </div>
    );
  }

  return (
    <div className='h-full flex-1 flex items-center justify-center flex-col gap-2'>
      <TriangleAlert className='size-6 text-muted-foreground' />
      <span className='text-sm text-muted-foreground'>No channel found</span>
    </div>
  );
};

export default WorkspaceIdPage;
