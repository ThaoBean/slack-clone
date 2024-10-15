import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import Quill from "quill";

import { useChannelId, useWorkspaceId } from "@/hooks";
import { useCreateMessage } from "@/features/messages/hooks";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
interface ChatInputProps {
  placeholder: string;
}

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const { mutate: createMessage } = useCreateMessage();

  const editorRef = useRef<Quill | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [isdPending, setIsPending] = useState(false);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      createMessage(
        {
          workspaceId,
          channelId,
          body,
        },
        { throwError: true },
      );

      setEditorKey((pre) => pre + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className='px-5 w-full'>
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isdPending}
        innerRef={editorRef}
      />
    </div>
  );
};
