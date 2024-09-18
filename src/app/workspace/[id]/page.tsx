import React from "react";

interface WorkspaceIdPageProps {
  params: {
    id: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  return <div>ID: {params.id}</div>;
};

export default WorkspaceIdPage;
