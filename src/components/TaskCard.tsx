"use client";

import React from "react";
import { formatISODate } from "@/utils/formatData";

interface TaskCardProps {
  id: string;
  title: string;
  startDate?: string;
  endDate?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  startDate,
  endDate,
}) => {
  return (
    <div
      onClick={() => {}}
      className="bg-white shadow-md rounded-2xl p-6 w-full hover:shadow-lg transition cursor-pointer"
    >
      <h2 className="text-lg font-semibold mb-3 text-black">{title}</h2>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium text-gray-900">Start:</span>{" "}
          {formatISODate(startDate)}
        </p>
        <p>
          <span className="font-medium text-gray-900">End:</span>{" "}
          {formatISODate(endDate)}
        </p>
      </div>
    </div>
  );
};
