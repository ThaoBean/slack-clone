import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogClose,
} from "@/components/ui";
import { toast } from "sonner";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { useConfirm, useWorkspaceId } from "@/hooks";
import { useNewJoinCode } from "@/features/workspaces/hooks";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}
export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will deactivate the current invite code and generate a new one",
  );

  const { mutate, isPending } = useNewJoinCode();

  const handelCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite link copied to clipboard"));
  };

  const handleNewCode = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success("Invite code regenerated");
        },
        onError: () => toast.error("Failed to regenerate invite code"),
      },
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {name}</DialogTitle>
            <DialogDescription>
              Use the code below to invite people to your workspace
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col gap-y-4 items-center justify-center py-10'>
            <p className='text-4xl font-bold tracking-widest uppercase'>
              {joinCode}
            </p>
            <Button variant='ghost' size='sm' onClick={handelCopy}>
              Copy link
              <CopyIcon className='size-4 ml-2' />
            </Button>
          </div>
          <div className='flex items-center justify-between w-full'>
            <Button
              onClick={handleNewCode}
              variant='outline'
              disabled={isPending}
            >
              New code
              <RefreshCcw className='size-4 ml-2' />
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
