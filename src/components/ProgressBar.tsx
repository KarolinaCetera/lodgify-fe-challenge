import React, { FC } from "react";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import { lightTheme } from "../styles";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <LinearProgress
      sx={{
        mt: 2,
        mb: 4,
        height: 25,
        width: "100%",
        borderRadius: 10,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: lightTheme.palette.primary.light,
        },
        [`& .${linearProgressClasses.bar}`]: {
          backgroundColor: lightTheme.palette.primary.main,
        },
        "& .MuiLinearProgress-bar": {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          borderRadius: 10,
          "&::before": {
            content: `'${progress}%'`,
            display: "block",
            color: lightTheme.palette.common.white,
            position: "absolute",
            zIndex: 2,
            mr: 2,
            fontWeight: "bold",
          },
        },
      }}
      variant="determinate"
      value={progress}
    />
  );
};

export default ProgressBar;
