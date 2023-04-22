import { FC, useCallback, useMemo, useState } from "react";
import { Accordion as MUIAccordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import { ExpandMore, List, FactCheck } from "@mui/icons-material";

import { Task } from "components";
import { Group } from "typings";
import { lightTheme } from "styles";

interface AccordionProps {
  expanded: string | false;
  group: Group;
  handleOpenAccordion(panel: string): (event: React.SyntheticEvent, isExpanded: boolean) => void;
  changeValueInGroup: (groupName: string, taskDescription: string, taskValue: boolean) => void;
  calculateProgress: () => number;
  setProgress: (value: number) => void;
}

export const Accordion: FC<AccordionProps> = ({
  expanded,
  group,
  handleOpenAccordion,
  changeValueInGroup,
  calculateProgress,
  setProgress,
}) => {
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

  return (
    <MUIAccordion disableGutters expanded={isExpanded} onChange={handleOpenAccordion(group.name)}>
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
            changeValueInGroup={changeValueInGroup}
            changeCheckedValue={changeCheckedValue}
            calculateProgress={calculateProgress}
            setProgress={setProgress}
          />
        ))}
      </AccordionDetails>
    </MUIAccordion>
  );
};
