export interface Task {
  id: string;
  title: string;
  completed: boolean;
  editing?: boolean;
}

export enum TaskState {
  "all",
  "pending",
  "completed"
};
