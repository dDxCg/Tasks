export interface Task {
  id: number; // Int with autoincrement
  title: string;
  description?: string; // optional
  status: "TODO" | "IN_PROGRESS" | "DONE";
  userId: string; // assigned user (can also make optional if unassigned)
  startDate?: string; // ISO string, optional
  endDate?: string; // ISO string, optional
}
