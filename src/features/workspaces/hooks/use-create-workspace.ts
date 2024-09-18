import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces"> | null;

// type ResponseType = Doc<"workspaces">; if want to get Object of a workspace

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (err: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateWorkSpace = () => {
  // const [data, setData] = useState<ResponseType>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);

  const isPending = useMemo(() => status === "pending", [status]);
  // const isSuccess = useMemo(() => status === "success", [status]);
  // const isError = useMemo(() => status === "error", [status]);
  // const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setStatus("pending");

        const response = await mutation(values);
        options?.onSuccess?.(response);
        return response;
      } catch (err) {
        options?.onError?.(err as Error);
        if (options?.throwError) throw err;
      } finally {
        setStatus("settled");
        options?.onSettled?.();
      }
    },
    [mutation],
  );

  return { mutate, isPending };
};
