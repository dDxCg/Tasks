import { Status, statusLabels } from "@/types/type";

export function Kanban({
  statuses,
  tasks,
}: {
  statuses: readonly Status[];
  tasks: { id: string; title: string; status: Status }[];
}) {
  return (
    <div className="flex gap-4">
      {statuses.map((status) => (
        <div key={status} className="flex-1 p-2 border rounded">
          <h2 className="font-bold">{statusLabels[status]}</h2>
          <div className="space-y-2">
            {tasks
              .filter((t) => t.status === status)
              .map((t) => (
                <div key={t.id} className="p-2 bg-gray-100 rounded">
                  {t.title}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
