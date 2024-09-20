import React from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useWorkspaceId } from "@/hooks";
import { useCreateWorkspaceModal } from "@/features/workspaces/store";
import { useGetWorkspace, useGetWorkspaces } from "@/features/workspaces/hooks";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateWorkspaceModal();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: workspaces, isLoading: workSpacesLoading } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (ws) => ws?._id !== workspaceId,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl'>
          {workspaceLoading ? (
            <Loader className='size-5 animate-spin shrink-0' />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='start' className='w-64'>
        <DropdownMenuItem
          className='cursor-pointer flex-col justify-start items-start capitalize'
          onClick={() => router.push(`/workspace/${workspaceId}`)}
        >
          {workspace?.name}
          <span className='text-xs text-muted-foreground'>
            Active workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((item) => (
          <DropdownMenuItem
            key={item?._id}
            className='cursor-pointer capitalize overflow-hidden'
            onClick={() => router.push(`/workspace/${item?._id}`)}
          >
            <div className='shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2'>
              {item?.name.charAt(0).toUpperCase()}
            </div>
            <p className='truncate'>{item?.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => setOpen(true)}
        >
          <div className='size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2'>
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
