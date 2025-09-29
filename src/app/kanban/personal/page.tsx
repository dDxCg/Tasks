"use client";

import { useEffect, useState } from "react";
import { PersonalTask } from "@/components/PersonalTask";
import { TaskCard } from "@/components/TaskCard";
import { Task, Status } from "@/models/v1/Task";

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const statuses: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

  // Fetch tasks on load
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/v1/tasks");
        const data = await res.json();
        if (data.success) {
          const mapped = data.data.map(
            (t: any): Task => ({
              id: t.id,
              title: t.title,
              description: t.description,
              status: t.status,
              startDate: t.start_date,
              endDate: t.end_date,
            })
          );
          setTasks(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    }
    fetchTasks();
  }, []);

  // Save (create or update)
  async function handleSave(updated: Task) {
    try {
      const payload = {
        title: updated.title,
        description: updated.description,
        status: updated.status,
        start_date: updated.startDate
          ? new Date(updated.startDate).toISOString()
          : null,
        end_date: updated.endDate
          ? new Date(updated.endDate).toISOString()
          : null,
      };

      let res;
      if (tasks.find((t) => t.id === updated.id)) {
        // Update
        res = await fetch(`/api/v1/tasks?id=${updated.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create
        res = await fetch("/api/v1/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (data.success) {
        setTasks((prev) => {
          const exists = prev.find((t) => t.id === data.data.id);
          return exists
            ? prev.map((t) => (t.id === data.data.id ? data.data : t))
            : [...prev, data.data];
        });
        setSelected(null);
      } else {
        console.error("Save failed:", data.error);
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  }

  // Delete
  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/v1/tasks?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        setSelected(null);
      } else {
        console.error("Delete failed:", data.error);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-6 h-screen bg-black text-black">
      {statuses.map((status) => (
        <div
          key={status}
          className="bg-gray-50 rounded-xl p-4 shadow-inner flex flex-col"
        >
          {/* Column Title */}
          <h2 className="text-xl font-bold mb-4 text-black">
            {status.replace("_", " ")}
          </h2>

          <div className="flex-1 space-y-4 overflow-y-auto">
            {tasks
              .filter((task) => task.status === status)
              .map((task) =>
                selected === task.id ? (
                  <PersonalTask
                    key={task.id}
                    task={task}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onClose={() => setSelected(null)}
                  />
                ) : (
                  <div key={task.id} onClick={() => setSelected(task.id)}>
                    <TaskCard
                      id={task.id}
                      title={task.title}
                      startDate={task.startDate}
                      endDate={task.endDate}
                    />
                  </div>
                )
              )}

            {/* Add Task UI */}
            {selected === `new-${status}` ? (
              <PersonalTask
                key={`new-${status}`}
                task={{
                  id: crypto.randomUUID(), // temp ID until API returns real one
                  title: "",
                  description: "",
                  status,
                  startDate: new Date().toISOString(),
                  endDate: new Date().toISOString(),
                }}
                onSave={handleSave}
                onDelete={handleDelete}
                onClose={() => setSelected(null)}
              />
            ) : (
              <button
                onClick={() => setSelected(`new-${status}`)}
                className="mt-2 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 transition"
              >
                + Add Task
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
