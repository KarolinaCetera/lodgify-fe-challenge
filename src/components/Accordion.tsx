import { FC, useMemo, useState } from "react";
import { Accordion as MUIAccordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import { ExpandMore, List, FactCheck } from "@mui/icons-material";

import { Task } from "components";
import { Group, TaskValues } from "typings";
import { lightTheme } from "styles";

interface AccordionProps {
  expanded: string | false;
  group: Group;
  handleOpenAccordion(panel: string): (event: React.SyntheticEvent, isExpanded: boolean) => void;
  handleChangeCheckbox: (groupName: string, taskDescription: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Accordion: FC<AccordionProps> = ({ expanded, group, handleOpenAccordion, handleChangeCheckbox }) => {
  const [allGroupTasks, setAllGroupTasks] = useState(group.tasks.map((task) => task.checked));
  const [isAllChecked, setIsAllChecked] = useState(allGroupTasks.every((value) => value));

  const isExpanded = expanded === group.name;

  const color = useMemo(
    () => (isAllChecked ? lightTheme.palette.primary.main : lightTheme.palette.common.black),
    [isAllChecked],
  );

  const onCheckboxChange = (
    groupName: string,
    index: number,
    task: TaskValues,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllGroupTasks((prev) => {
      prev[index] = e.target.checked;
      return prev;
    });
    setIsAllChecked(allGroupTasks.every((task) => task));
    handleChangeCheckbox(groupName, task.description, e);
  };

  return (
    <MUIAccordion
      disableGutters
      expanded={isExpanded}
      onChange={handleOpenAccordion(group.name)}
      sx={(theme) => ({ border: `1px solid ${theme.palette.grey[300]}` })}
    >
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`${group.name}-content`}>
        <Grid container>
          <Grid container item xs={10}>
            {isAllChecked ? <FactCheck sx={{ color }} /> : <List sx={{ color }} />}
            <Typography sx={{ ml: 2, color }}>{group.name}</Typography>
          </Grid>
          <Grid container justifyContent="flex-end" item xs={2} pr={1}>
            <Typography sx={{ color: lightTheme.palette.grey[400] }}>{isExpanded ? "Hide" : "Show"}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ display: "flex", flexDirection: "column", px: 3 }}>
        {group.tasks.map((task, index) => (
          <Task
            key={task.description}
            task={task}
            index={index}
            groupName={group.name}
            onCheckboxChange={onCheckboxChange}
          />
        ))}
      </AccordionDetails>
    </MUIAccordion>
  );
};
