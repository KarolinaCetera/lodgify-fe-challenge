import { useQuery, UseQueryResult } from "react-query";
import { Group } from "typings";
import { calculateValue, getAllTasksValue, getCheckedTasks } from "utils";

// TODO to env

const groupDataAPIUrl =
  "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress";

export const getGroupData = async (): Promise<Group[]> => {
  const response = await fetch(groupDataAPIUrl, {
    method: "GET",
  });

  return response.json();
};

export const useGetGroupData = (): [UseQueryResult<Group[], Error>, number] => {
  const response = useQuery<Group[], Error>(["group-data"], () => getGroupData());
  const allTasksValue = getAllTasksValue(response.data || []);

  const initiallyCheckedTasks = getCheckedTasks(response.data || []);

  const allCheckedTasksValue: number | undefined = calculateValue(allTasksValue, initiallyCheckedTasks || []);
  return [response, allCheckedTasksValue || 0];
};
