import { useGetGroupData } from "../http/group-data";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Accordion } from "components";
import { getAllTasksValue } from "../utils";
import { Group } from "../typings";

export const GroupedTasks = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const { data: groups, isError, isLoading, error } = useGetGroupData();

  const [storedGroups, setStoredGroups] = useState<Group[]>([]);

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

  useEffect(() => {
    if (groups) setStoredGroups(groups);
  }, [groups]);

  const handleOpenAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const allTasksValue = getAllTasksValue(groups || []);

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
        <Typography>Progress bar</Typography>
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
            />
          );
        })}
      </Grid>
    </Box>
  );
};
