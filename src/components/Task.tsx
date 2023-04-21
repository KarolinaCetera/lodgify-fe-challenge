import { TaskValues } from "../typings";
import { FC, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

interface TaskProps {
  groupName: string;
  index: number;
  task: TaskValues;
  changeValueInGroup: (groupName: string, taskDescription: string, taskValue: boolean) => void;
  changeCheckedValue: (index: number, value: boolean) => void;
}

export const Task: FC<TaskProps> = ({ task, groupName, changeValueInGroup, changeCheckedValue, index }) => {
  const [checked, setChecked] = useState(task.checked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValueInGroup(groupName, task.description, e.target.checked);
    changeCheckedValue(index, e.target.checked);
    setChecked(e.target.checked);
  };

  return (
    <FormControlLabel
      sx={{ my: 2 }}
      control={<Checkbox checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />}
      label={task.description}
    />
  );
};
