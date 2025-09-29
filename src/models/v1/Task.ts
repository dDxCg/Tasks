// types/task.ts
export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status: Status;
}

export const isValidStatus = (value: any): value is Status => {
  return value === "TODO" || value === "IN_PROGRESS" || value === "DONE";
};
