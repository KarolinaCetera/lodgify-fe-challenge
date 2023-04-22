import { FC, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TaskValues } from "typings";

interface TaskProps {
  groupName: string;
  index: number;
  task: TaskValues;
  changeValueInGroup: (groupName: string, taskDescription: string, taskValue: boolean) => void;
  changeCheckedValue: (index: number, value: boolean) => void;
  calculateProgress: () => number;
  setProgress: (value: number) => void;
}

export const Task: FC<TaskProps> = ({
  groupName,
  index,
  task,
  changeValueInGroup,
  changeCheckedValue,
  calculateProgress,
  setProgress,
}) => {
  const [checked, setChecked] = useState(task.checked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeCheckedValue(index, task.checked);
    changeValueInGroup(groupName, task.description, e.target.checked);
    const newProgressValue = calculateProgress();
    setProgress(newProgressValue);
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
