import { FC, useMemo, useState } from "react";
import { Accordion as MUIAccordion, AccordionDetails, AccordionSummary, Grid, Icon, Typography } from "@mui/material";
import { Task } from "components";
import { ChangeCheckboxParams, Group } from "typings";
import { lightTheme } from "styles";
import Completed from "../assets/completed.svg";
import Uncompleted from "../assets/uncompleted.svg";
import Expand from "../assets/expand.svg";

interface AccordionProps {
  expanded: string | false;
  group: Group;
  handleOpenAccordion(panel: string): (event: React.SyntheticEvent, isExpanded: boolean) => void;
  handleChangeCheckbox: (params: ChangeCheckboxParams) => void;
}

export const Accordion: FC<AccordionProps> = ({ expanded, group, handleOpenAccordion, handleChangeCheckbox }) => {
  const [allCheckedTasks, setAllCheckedTasks] = useState(group.tasks.map((task) => task.checked));
  const [isAllChecked, setIsAllChecked] = useState(allCheckedTasks.every((value) => value));

  const isExpanded = useMemo(() => expanded === group.name, [expanded, group.name]);

  const accordionElementsColor = useMemo(
    () => (isAllChecked ? lightTheme.palette.primary.main : lightTheme.palette.grey[900]),
    [isAllChecked],
  );

  const onCheckboxChange = (index: number, { groupName, task, e }: ChangeCheckboxParams) => {
    setAllCheckedTasks((prev) => {
      prev[index] = e.target.checked;
      return prev;
    });
    setIsAllChecked(allCheckedTasks.every((task) => task));
    handleChangeCheckbox({ groupName, task, e });
  };

  return (
    <MUIAccordion
      disableGutters
      expanded={isExpanded}
      onChange={handleOpenAccordion(group.name)}
      elevation={0}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.grey[300]}`,
        borderTop: 0,
        "&:first-of-type": {
          borderRadius: "8px 8px 0 0",
          borderTop: `1px solid ${theme.palette.grey[300]}`,
        },
        "&:last-of-type": {
          borderRadius: "0 0 8px 8px",
        },
      })}
    >
      <AccordionSummary
        expandIcon={<img src={Expand} alt="accordionExpandIcon" />}
        aria-controls={`${group.name}-content`}
      >
        <Grid container>
          <Grid container item xs={10} alignItems="center">
            <Icon sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={isAllChecked ? Completed : Uncompleted} alt="accordionElementIcon" />
            </Icon>
            <Typography fontSize={18} sx={{ ml: 2, color: accordionElementsColor }}>
              {group.name}
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end" alignItems="center" item xs={2} pr={1}>
            <Typography sx={(theme) => ({ color: theme.palette.grey[500] })}>{isExpanded ? "Hide" : "Show"}</Typography>
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
