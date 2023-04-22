import { FC } from "react";
import { Grid, Typography } from "@mui/material";
import { ProgressBar } from "./ProgressBar";
import { lightTheme } from "../styles";

interface HeaderProps {
  progress: number;
}

export const Header: FC<HeaderProps> = ({ progress }) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between" p={3} pb={4}>
      <Typography variant="h6" fontWeight="bold" color={lightTheme.palette.grey[900]} fontSize={22} sx={{ pb: 2 }}>
        Lodgify Grouped Tasks
      </Typography>
      <ProgressBar progress={progress} />
    </Grid>
  );
};
