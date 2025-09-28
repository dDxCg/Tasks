export interface User {
  id: string; // Neo4j internal ID
  userId: string; // Clerk userId
  name: string;
  contact?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  startDate?: string;
  endDate?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
}
