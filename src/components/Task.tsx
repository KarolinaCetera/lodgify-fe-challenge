import { FC, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TaskValues } from "typings";

interface TaskProps {
  groupName: string;
  index: number;
  task: TaskValues;
  onCheckboxChange: (
    groupName: string,
    index: number,
    task: TaskValues,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export const Task: FC<TaskProps> = ({ groupName, index, task, onCheckboxChange }) => {
  const [checked, setChecked] = useState(task.checked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(groupName, index, task, e);
    setChecked(e.target.checked); // own
  };

  return (
    <FormControlLabel
      sx={{ my: 2 }}
      control={<Checkbox checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />}
      label={task.description}
    />
  );
};
