export const STATUSES = {
  personal: ["TODO", "IN_PROCESS", "DONE"],
  team: ["TODO", "IN_PROCESS", "REVIEW", "DONE"],
} as const;

export type Status = (typeof STATUSES.team)[number];

export const statusLabels: Record<Status, string> = {
  TODO: "To Do",
  IN_PROCESS: "In Process",
  REVIEW: "In Review",
  DONE: "Done",
};

export function isValidStatus(status: string): status is Status {
  return (
    (STATUSES.personal as readonly string[]).includes(status) ||
    (STATUSES.team as readonly string[]).includes(status)
  );
}
