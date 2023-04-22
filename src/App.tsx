import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { GroupedTasks } from "components";
import { lightTheme } from "styles";
import "./App.scss";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <SnackbarProvider maxSnack={2}>
          <GroupedTasks />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
