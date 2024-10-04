import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizontal,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";
import { UserItem } from "./user-item";
import { useChannelId, useWorkspaceId } from "@/hooks";
import { useGetWorkspace } from "@/features/workspaces/hooks";
import { useGetChannels } from "@/features/channels/hooks";
import { useCreateChannelModal } from "@/features/channels/store";
import { useCurrentMember, useGetMembers } from "@/features/members/hooks";

export const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className='flex flex-col bg-[#5E2C5F] h-full items-center justify-center'>
        <Loader className='size-5 animate-spin text-white' />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className='flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center'>
        <AlertTriangle className='size-5 text-white' />
        <p className='text-sm text-white'>Workspace not found</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col bg-[#5E2C5F] h-full '>
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className='flex flex-col px-2 mt-3'>
        <SidebarItem label='Threads' icon={MessageSquareText} id='threads' />
        <SidebarItem label='Draft & Send' icon={SendHorizontal} id='drafts' />
      </div>
      <WorkspaceSection
        label='Channels'
        hint='New channel'
        onNew={() => (member.role === "admin" ? setOpen(true) : undefined)}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label='Direct message'
        hint='New direct message'
        // onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
            // variant={}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
