import { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, LinearProgress, Typography } from "@mui/material";
import { Accordion } from "components";
import { useGetGroupData } from "../http";
import { Group } from "typings";
import { getAllTasksValue } from "../utils";

export const GroupedTasks = () => {
  const { data: groups, isError, isLoading, error } = useGetGroupData();

  const [storedGroups, setStoredGroups] = useState<Group[]>([]);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    if (groups) setStoredGroups(groups);
  }, [groups]);

  const calculateProgress = useCallback(() => {
    const allTasksValue = getAllTasksValue(storedGroups);
    const allTasks = storedGroups.map((group) => group.tasks.filter((task) => task.checked)).flatMap((task) => task);

    return allTasks.reduce(
      (previousValue, currentValue) => (previousValue += +((currentValue.value * 100) / allTasksValue).toFixed(2)),
      0,
    );
  }, [storedGroups]);

  useEffect(() => {
    const newValue = calculateProgress();
    setProgress(newValue);
  }, [calculateProgress]);

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

  const handleOpenAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   groupName: string,
  //   taskDescription: string,
  //   taskIndex: number,
  // ) => {
  //   changeValueInGroup(groupName, taskDescription, e.target.checked);
  //   const newProgressValue = calculateProgress();
  //   setProgress(newProgressValue);
  // };

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
        <Typography variant="h6" fontWeight="bold">
          Lodgify Grouped Tasks
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
      </Grid>
      <Grid>
        {storedGroups?.map((group) => {
          return (
            <Accordion
              key={group.name}
              group={group}
              expanded={expanded}
              handleOpenAccordion={handleOpenAccordion}
              changeValueInGroup={changeValueInGroup}
              calculateProgress={calculateProgress}
              setProgress={setProgress}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
