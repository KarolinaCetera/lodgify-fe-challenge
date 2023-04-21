import { QueryClient, QueryClientProvider } from "react-query";
import "./App.scss";
import { GroupedTasks } from "./components";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GroupedTasks />
    </QueryClientProvider>
  );
};
