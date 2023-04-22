import { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { ProgressBar } from "./ProgressBar";

interface HeaderProps {
  progress: number;
}

export const Header: FC<HeaderProps> = ({ progress }) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between" p={3} pb={4}>
      <Typography variant="h6" fontWeight="bold" fontSize={22} sx={{ pb: 2 }}>
        Lodgify Grouped Tasks
      </Typography>
      <ProgressBar progress={progress} />
    </Grid>
  );
};
