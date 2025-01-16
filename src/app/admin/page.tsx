"use client";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";
import RequestsTable from "@/components/tables/RequestsTable";

/**
 * Legacy front-end code from Crisis Corner's previous admin page!
 */
export default function ItemRequestsPage() {
  const [item, setItem] = useState<string>("");
  const [itemList, setItemList] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  const handleAddItem = (): void => {
    if (item.trim()) {
      setItemList((prevList) => [...prevList, item.trim()]);
      setItem("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 flex flex-col items-center gap-6">
      <h2 className="font-bold">Approve Items</h2>

      <div className="flex flex-col w-full gap-4">
        <Input
          type="text"
          placeholder="Type an item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          label="Item"
        />
        <Button onClick={handleAddItem}>Approve</Button>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="underline">Currently approved items:</h3>
        {itemList.length > 0 ? (
          <ul className="list-disc pl-5">
            {itemList.map((listItem, index) => (
              <li key={index}>{listItem}</li>
            ))}
          </ul>
        ) : (
          "None :("
        )}
      </div>
      <div className="font-sans font-normal text-sm">
        <div className="pb-10">
          <div className="pb-4">
            <h1 className="text-[1.8rem] font-bold text-gray-500">
              Item Requests
            </h1>
          </div>
          <ul
            className="flex flex-wrap w-[1205px] h-justify-start gap-1 pt-2 rounded-t-lg ml-2"
            role="tablist"
          >
            <li>
              <button
                onClick={() => setActiveTab("All")}
                className={`px-4 py-2 rounded-t-md transition ${
                  activeTab === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-blue-100"
                }`}
                role="tab"
                aria-controls="All"
                aria-selected={activeTab === "All"}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Pending")}
                className={`px-4 py-2 rounded-t-md transition ${
                  activeTab === "Pending"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-blue-100"
                }`}
                role="tab"
                aria-controls="Pending"
                aria-selected={activeTab === "Pending"}
              >
                Pending
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Approved")}
                className={`px-4 py-2 rounded-t-md transition ${
                  activeTab === "Approved"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-blue-100"
                }`}
                role="tab"
                aria-controls="Approved"
                aria-selected={activeTab === "Approved"}
              >
                Approved
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Completed")}
                className={`px-4 py-2 rounded-t-md transition ${
                  activeTab === "Completed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-blue-100"
                }`}
                role="tab"
                aria-controls="Completed"
                aria-selected={activeTab === "Completed"}
              >
                Complete
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Rejected")}
                className={`px-4 py-2 rounded-t-md transition ${
                  activeTab === "Rejected"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-blue-100"
                }`}
                role="tab"
                aria-controls="Rejected"
                aria-selected={activeTab === "Rejected"}
              >
                Rejected
              </button>
            </li>
          </ul>

          <div className="relative">
            {activeTab === "All" && (
              <div>
                <RequestsTable apiEndpoint="http://localhost:3000/api/request" />
              </div>
            )}
          </div>

          <div className="relative">
            {activeTab === "Pending" && (
              <div>
                <RequestsTable apiEndpoint="http://localhost:3000/api/request?status=pending" />
              </div>
            )}
          </div>
          <div className="relative">
            {activeTab === "Approved" && (
              <div>
                <RequestsTable apiEndpoint="http://localhost:3000/api/request?status=approved" />
              </div>
            )}
          </div>
          <div className="relative">
            {activeTab === "Completed" && (
              <div>
                <RequestsTable apiEndpoint="http://localhost:3000/api/request?status=completed" />
              </div>
            )}
          </div>
          <div className="relative">
            {activeTab === "Rejected" && (
              <div>
                <RequestsTable apiEndpoint="http://localhost:3000/api/request?status=rejected" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
