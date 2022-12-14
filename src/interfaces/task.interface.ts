export interface ITask {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface ITaskColumn {
  status: string;
  label: string;
}

export interface ITaskGroup {
  [status: string]: ITask[],
}
