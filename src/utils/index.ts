import { Group, TaskValues } from "../typings";

export const getAllTasksValue = (groups: Group[]): number =>
  groups
    ?.map((group) => group.tasks.reduce((prevValue, currentValue) => (prevValue += currentValue.value), 0))
    .reduce((prevValue, currentValue) => (prevValue += currentValue), 0);

export const calculateValue = (allTasksValue: number, values: TaskValues[]) =>
  values.reduce(
    (previousValue, currentValue) => (previousValue += +((currentValue.value * 100) / allTasksValue).toFixed(0)),
    0,
  );

export const getCheckedTasks = (groups: Group[]) =>
  groups.map((group) => group.tasks.filter((task) => task.checked)).flatMap((task) => task);
