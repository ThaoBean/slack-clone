"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/components/ui";
import { useCreateWorkspaceModal } from "../store";
import { useCreateWorkSpace } from "../hooks";

export const CreateWorkspaceModal = () => {
  const { mutate } = useCreateWorkSpace();
  const [open, setOpen] = useCreateWorkspaceModal();

  const handleClose = () => {
    setOpen(false);

    //TODO: clear form
  };

  const handleSubmit = () => {
    mutate(
      {
        name: "Workspace 1",
      },
      {
        onSuccess(id) {
          // Redirect to workspaceId
        },
        onError(err) {
          // Show toast message
        },
        onSettled() {
          // Reset form
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form className='space-y-4'>
          <Input
            value=''
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Personal', 'Home', ..."
          />
          <div className='flex justify-end'>
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
