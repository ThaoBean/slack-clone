"use client";

import React from "react";
import { useWorkspaceId } from "@/hooks";
import { useGetWorkspace } from "@/features/workspaces/hooks";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  return <div>ID: {JSON.stringify(data)}</div>;
};

export default WorkspaceIdPage;
