import { QueryClient, QueryClientProvider } from "react-query";
import "./App.scss";
import { GroupedTasks } from "components";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./styles";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <GroupedTasks />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
