import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces">;

// type ResponseType = Doc<"workspaces">; if want to get Object of a workspace

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (err: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateWorkSpace = () => {
  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        const response = await mutation(values);
        options?.onSuccess?.(response);
        return response;
      } catch (err) {
        options?.onError?.(err as Error);
        if (options?.throwError) throw err;
      } finally {
        options?.onSettled?.();
      }
    },
    [mutation],
  );

  return { mutate };
};
