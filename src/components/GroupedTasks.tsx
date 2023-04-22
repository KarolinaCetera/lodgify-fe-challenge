import { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Accordion, ProgressBar } from "components";
import { useGetGroupData } from "../http";
import { Group, TaskValues } from "typings";
import { calculateValue, getAllTasksValue, getCheckedTasks } from "utils";

export const GroupedTasks = () => {
  const [{ data: groups, isError, isLoading, error }, allCheckedTasksValue] = useGetGroupData();

  const [storedGroups, setStoredGroups] = useState<Group[]>([]);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [allCheckedTasks, setAllCheckedTasks] = useState<TaskValues[]>([]);

  useEffect(() => {
    if (groups) setStoredGroups(groups);
  }, [groups, storedGroups]);

  useEffect(() => {
    const checkedTasks = getCheckedTasks(storedGroups);
    setAllCheckedTasks(checkedTasks);
  }, [storedGroups]);

  useEffect(() => {
    setProgress(allCheckedTasksValue);
  }, [allCheckedTasksValue]);

  const calculateProgress = useCallback(() => {
    const allTasksValue = getAllTasksValue(storedGroups);
    const updatedCheckedTasks = getCheckedTasks(storedGroups);
    setAllCheckedTasks(updatedCheckedTasks);

    return calculateValue(allTasksValue, allCheckedTasks);
  }, [allCheckedTasks, storedGroups]);

  const changeValueInGroup = (groupName: string, taskDescription: string, taskValue: boolean) => {
    setStoredGroups((prevGroup) => {
      const modifiedGroup = prevGroup.find((group) => group.name === groupName);
      const modifiedTask = modifiedGroup?.tasks.find((task) => task.description === taskDescription);

      if (!modifiedGroup || !modifiedTask) return prevGroup;

      const indexOfModifiedGroup = prevGroup.findIndex((group) => group.name === groupName);
      const indexOfModifiedTask = modifiedGroup?.tasks.findIndex((task) => task.description === taskDescription);

      if (indexOfModifiedGroup === -1 || indexOfModifiedTask === -1) return prevGroup;

      modifiedGroup.tasks[indexOfModifiedTask] = {
        ...modifiedTask,
        checked: taskValue,
      };

      prevGroup[indexOfModifiedGroup] = {
        ...prevGroup[indexOfModifiedGroup],
        tasks: modifiedGroup.tasks,
      };

      return prevGroup;
    });
  };

  const handleChangeCheckbox = (groupName: string, taskDescription: string, e: React.ChangeEvent<HTMLInputElement>) => {
    changeValueInGroup(groupName, taskDescription, e.target.checked);
    setProgress(calculateProgress());
  };

  const handleOpenAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <h1>{error?.message}</h1>;

  return (
    <Box
      sx={(theme) => ({
        width: "60%",
        borderRadius: 2,
        border: "1px solid #ddd",
        padding: theme.spacing(2),
      })}
    >
      <Grid sx={{ m: 2 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bolder">
            Lodgify Grouped Tasks
          </Typography>
        </Grid>
        <ProgressBar progress={progress} />
      </Grid>
      <Grid>
        {storedGroups?.map((group) => {
          return (
            <Accordion
              key={group.name}
              group={group}
              expanded={expanded}
              handleOpenAccordion={handleOpenAccordion}
              handleChangeCheckbox={handleChangeCheckbox} // check
            />
          );
        })}
      </Grid>
    </Box>
  );
};
