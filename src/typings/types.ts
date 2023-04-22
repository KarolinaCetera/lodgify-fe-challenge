export type TaskValues = {
  description: string;
  value: number;
  checked: boolean;
};

export type Group = {
  name: string;
  tasks: TaskValues[];
};

export type ChangeCheckboxParams = {
  groupName: string;
  task: TaskValues;
  e: React.ChangeEvent<HTMLInputElement>;
};
