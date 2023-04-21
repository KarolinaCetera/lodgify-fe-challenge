import { Accordion as MUIAccordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, useEffect, useState } from "react";
import { Group } from "../typings";
import ListIcon from "@mui/icons-material/List";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Task } from "./Task";
import { lightTheme } from "../styles";

interface AccordionProps {
  group: Group;
  expanded: string | false;
  handleOpenAccordion(panel: string): (event: React.SyntheticEvent, isExpanded: boolean) => void;
  changeValueInGroup: (groupName: string, taskDescription: string, taskValue: boolean) => void;
}

export const Accordion: FC<AccordionProps> = ({ group, expanded, handleOpenAccordion, changeValueInGroup }) => {
  const [color, setColor] = useState(lightTheme.palette.common.black);
  const [allChecked, setAllChecked] = useState(group.tasks.map((task) => task.checked));

  // TODO write function to check if all checked (deep compare)

  const isExpanded = expanded === group.name;

  useEffect(() => {
    setColor(() => (allChecked ? lightTheme.palette.primary.main : lightTheme.palette.common.black));
  }, [allChecked]);

  return (
    <MUIAccordion disableGutters expanded={isExpanded} onChange={handleOpenAccordion(group.name)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${group.name}-content`}>
        <Grid container>
          <Grid container item xs={10}>
            {allChecked ? <FactCheckIcon sx={{ color }} /> : <ListIcon sx={{ color }} />}
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
        {group.tasks.map((task) => (
          <Task task={task} key={task.description} groupName={group.name} changeValueInGroup={changeValueInGroup} />
        ))}
      </AccordionDetails>
    </MUIAccordion>
  );
};
