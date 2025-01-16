"use client";

import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface StatusOption {
  label: string;
  color: string;
  bg: string;
}

interface DropdownProps {
  id: string;
  currentStatus: string;
}

const statusOptions: StatusOption[] = [
  { label: "Pending", color: "bg-orange-400", bg: "bg-orange-50" },
  { label: "Approved", color: "bg-yellow-400", bg: "bg-yellow-50" },
  { label: "Completed", color: "bg-green-400", bg: "bg-green-50" },
  { label: "Rejected", color: "bg-red-600", bg: "bg-red-50" },
];

export default function Dropdown({ id, currentStatus }: DropdownProps) {
  const initialSelected =
    statusOptions.find(
      (option) => option.label.toLowerCase() === currentStatus.toLowerCase()
    ) || statusOptions[0];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<StatusOption>(initialSelected);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (option: StatusOption) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/request", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: option.label.toLowerCase(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update status");
      }

      const data = await response.json();
      console.log("Status updated successfully:", data);

      setSelected(option);
      setIsOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-[180px]">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-md border bg-white px-4 py-2 text-left transition-colors hover:bg-gray-50 ${
          isOpen ? " border-blue-400" : "border-gray-300"
        }`}
        disabled={isLoading}
      >
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full ${selected.bg} px-2 py-1 text-gray-700 items-center flex gap-2`}
          >
            <div className={`h-2 w-2 rounded-full ${selected.color}`} />
            {selected.label}
          </span>
        </div>
        {isLoading ? (
          <span className="text-gray-500">Updating...</span>
        ) : isOpen ? (
          <FaChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <FaChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded-b-md border border-gray-200 bg-white py-1 shadow-lg z-10">
          {statusOptions.map((option, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50"
              onClick={() => updateStatus(option)}
            >
              <div className={`h-2 w-2 rounded-full ${option.color}`} />
              <span
                className={`rounded-full ${option.bg} px-2 py-1 text-gray-700`}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
    </div>
  );
}
