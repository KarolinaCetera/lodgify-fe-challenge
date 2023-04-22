import { FC, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ChangeCheckboxParams, TaskValues } from "typings";

interface TaskProps {
  task: TaskValues;
  index: number;
  groupName: string;
  onCheckboxChange: (index: number, params: ChangeCheckboxParams) => void;
}

export const Task: FC<TaskProps> = ({ groupName, index, task, onCheckboxChange }) => {
  const [checked, setChecked] = useState(task.checked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(index, { groupName, task, e });
    setChecked(e.target.checked);
  };

  return (
    <FormControlLabel
      sx={{ my: 1 }}
      label={task.description}
      control={
        <Checkbox
          sx={(theme) => ({
            ".MuiSvgIcon-root": {
              fontSize: theme.typography.pxToRem(16),
            },
            "&.MuiCheckbox-root": {
              color: theme.palette.grey[500],
              "&.Mui-checked": {
                color: theme.palette.primary.main,
              },
            },
          })}
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
    />
  );
};
