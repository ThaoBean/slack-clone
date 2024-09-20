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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateWorkSpace();

  const [name, setName] = useState("");
  const [open, setOpen] = useCreateWorkspaceModal();

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        name,
      },
      {
        onSuccess(id) {
          // Redirect to workspaceId
          toast.success("Workspace was successfully created");
          router.push(`/workspace/${id}`);
          handleClose();
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
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace name e.g. 'Work', 'Personal', 'Home', ..."
          />
          <div className='flex justify-end'>
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
