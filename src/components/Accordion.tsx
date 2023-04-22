import { FC, useCallback, useMemo, useState } from "react";
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
  const [allTasksValues, setAllTasksValues] = useState(group.tasks.map((task) => task.checked));
  const [allChecked, setAllChecked] = useState(allTasksValues.every((value) => value));

  const isExpanded = expanded === group.name;

  const color = useMemo(
    () => (allChecked ? lightTheme.palette.primary.main : lightTheme.palette.common.black),
    [allChecked],
  );

  const changeCheckedValue = useCallback(
    (index: number, value: boolean) => {
      setAllTasksValues((prev) => {
        prev[index] = value;
        return prev;
      });

      setAllChecked(group.tasks.every((task) => task.checked));
    },
    [group.tasks],
  );

  const onCheckboxChange = (
    groupName: string,
    index: number,
    task: TaskValues,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    changeCheckedValue(index, task.checked); // acc
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
            {allChecked ? <FactCheck sx={{ color }} /> : <List sx={{ color }} />}
            <Typography
              sx={{
                ml: 2,
                color,
              }}
            >
              {group.name}
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end" item xs={2} pr={1}>
            <Typography sx={{ color: "#bbb" }}>{isExpanded ? "Hide" : "Show"}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ display: "flex", flexDirection: "column", px: 3 }}>
        {group.tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            key={task.description}
            groupName={group.name}
            onCheckboxChange={onCheckboxChange}
          />
        ))}
      </AccordionDetails>
    </MUIAccordion>
  );
};
