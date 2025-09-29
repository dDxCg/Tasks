"use client";

import { useState } from "react";
import { Task, Status } from "@/models/v1/Task";

interface PersonalTaskProps {
  task: Task;
  onSave?: (updated: Task) => Promise<void> | void;
  onDelete?: (id: string) => Promise<void> | void;
  onClose?: () => void;
}

export const PersonalTask: React.FC<PersonalTaskProps> = ({
  task,
  onSave,
  onDelete,
  onClose,
}) => {
  const [form, setForm] = useState<Task>(task);

  async function handleSave() {
    if (onSave) await onSave(form);
    if (onClose) onClose(); // close after save
  }

  async function handleDelete() {
    if (onDelete) await onDelete(task.id);
    if (onClose) onClose(); // also close after delete
  }

  const inputStyle =
    "w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none";

  const statuses: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

  return (
    <div className="max-w-xl bg-white shadow-lg rounded-2xl p-6 text-black">
      {/* Title */}
      <label className="block mb-3">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </span>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputStyle}
        />
      </label>

      {/* Description */}
      <label className="block mb-3">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </span>
        <textarea
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={inputStyle + " h-24 resize-none"}
        />
      </label>

      {/* Status */}
      <label className="block mb-3">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </span>
        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as Status })
          }
          className={inputStyle}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>

      {/* Dates */}
      <label className="block mb-3">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </span>
        <input
          type="datetime-local"
          value={form.startDate ? form.startDate.slice(0, 16) : ""}
          onChange={(e) =>
            setForm({
              ...form,
              startDate: new Date(e.target.value).toISOString(),
            })
          }
          className={inputStyle}
        />
      </label>

      <label className="block mb-3">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </span>
        <input
          type="datetime-local"
          value={form.endDate ? form.endDate.slice(0, 16) : ""}
          onChange={(e) =>
            setForm({
              ...form,
              endDate: new Date(e.target.value).toISOString(),
            })
          }
          className={inputStyle}
        />
      </label>

      {/* Action buttons */}
      <div className="flex gap-2 mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
