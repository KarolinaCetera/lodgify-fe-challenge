import { useQuery, UseQueryResult } from "react-query";
import { Group } from "typings";
import { calculateValue, getAllTasksValue, getCheckedTasks } from "utils";

const groupDataAPIUrl = process.env.REACT_APP_GROUP_DATA_API;

export const getGroupData = async (): Promise<Group[]> => {
  const response = await fetch(groupDataAPIUrl || "", {
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
