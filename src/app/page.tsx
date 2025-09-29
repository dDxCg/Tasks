"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-2xl shadow-md space-y-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
        <p className="text-gray-600">Choose a board to get started:</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-5 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
            onClick={() => router.push("/kanban/personal")}
          >
            Personal Tasks
          </button>
          <button
            className="px-5 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition"
            onClick={() => router.push("/kanban/teams")}
          >
            Team Kanban
          </button>
        </div>
      </div>
    </main>
  );
}
