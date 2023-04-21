import { Group } from "../typings";

export const getAllTasksValue = (groups: Group[]): number =>
  groups
    ?.map((group) => group.tasks.reduce((prevValue, currentValue) => (prevValue += currentValue.value), 0))
    .reduce((prevValue, currentValue) => (prevValue += currentValue), 0);
