import React from "react";
import { useGetGroupData } from "../http/group-data";
import { CircularProgress } from "@mui/material";

export const GroupedTasks = () => {
  const { data, isError, isLoading, error } = useGetGroupData();
  console.log(data);

  if (isLoading) return <CircularProgress />;

  return <div>Hello</div>;
};
