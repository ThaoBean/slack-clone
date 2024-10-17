import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import Quill from "quill";

import { useChannelId, useWorkspaceId } from "@/hooks";
import { useCreateMessage } from "@/features/messages/hooks";
import { useGenerateUploadUrl } from "@/features/upload/hooks";
import { Id } from "../../../../../../convex/_generated/dataModel";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
interface ChatInputProps {
  placeholder: string;
}

type CreateMessageValue = {
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  image?: Id<"_storage"> | undefined;
  body: string;
};

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const { mutate: createMessage } = useCreateMessage();

  const editorRef = useRef<Quill | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [isdPending, setIsPending] = useState(false);

  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      editorRef?.current?.enable(false);

      const values: CreateMessageValue = {
        channelId,
        workspaceId,
        body,
        image: undefined,
      };

      if (image) {
        const url = await generateUploadUrl(
          {},
          {
            throwError: true,
          },
        );

        if (!url) throw new Error("Url not found");
        const result = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body,
        });

        if (!result.ok) throw new Error("Failed to upload image");

        const { storageId } = await result.json();

        values.image = storageId;
      }

      await createMessage(values, { throwError: true });

      setEditorKey((pre) => pre + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
      editorRef?.current?.enable(true);
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
