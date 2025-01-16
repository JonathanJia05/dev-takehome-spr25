"use client";

import { useEffect, useState } from "react";
import Dropdown from "../atoms/Dropdown";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Request {
  _id: string;
  requestorName: string;
  itemRequested: string;
  createdDate: string;
  lastEditedDate: string;
  status: string;
}

interface RequestsTableProps {
  apiEndpoint: string;
}

const RequestsTable: React.FC<RequestsTableProps> = ({ apiEndpoint }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 6;

  useEffect(() => {
    console.log("Fetching from API Endpoint:", apiEndpoint);

    const fetchRequests = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = apiEndpoint.includes("?")
          ? `${apiEndpoint}&page=${currentPage}`
          : `${apiEndpoint}?page=${currentPage}`;

        console.log("Final API URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch requests");
        }

        const data = await response.json();
        setRequests(data.requests || []);
        setTotalItems(data.totalItems || 0);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching requests:", err.message);
          setError(err.message || "Something went wrong");
        } else {
          console.error("Error fetching requests:", err);
          setError("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [apiEndpoint, currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="overflow-x-auto rounded-md">
      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!isLoading && !error && (
        <>
          <table className="min-w-full border-collapse border border-gray-200 text-gray-500">
            <thead className="">
              <tr>
                <th className="border-0 px-4 py-2 text-left w-[262px] font-normal">
                  Name
                </th>
                <th className="border-0 px-4 py-2 text-left w-[353px] font-normal">
                  Item Requested
                </th>
                <th className="border-0 px-4 py-2 text-left w-[200px] font-normal">
                  Date Created
                </th>
                <th className="border-0 px-4 py-2 text-left w-[200px] font-normal">
                  Date Updated
                </th>
                <th className="border-0 px-4 py-2 text-left w-[190px] font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="">
                  <td className="border-0 px-4 py-2 text-left">
                    {request.requestorName}
                  </td>
                  <td className="border-0 px-4 py-2 text-left">
                    {request.itemRequested}
                  </td>
                  <td className="border-0 px-4 py-2 text-left">
                    {new Date(request.createdDate).toLocaleDateString()}
                  </td>
                  <td className="border-0 px-4 py-2 text-left">
                    {new Date(request.lastEditedDate).toLocaleDateString()}
                  </td>
                  <td className="border-0 px-4 py-2 text-left">
                    <Dropdown id={request._id} currentStatus={request.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-end mt-4">
            <span className="text-gray-600">
              {" "}
              {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} {"-"}{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded ${
                  currentPage === 1
                    ? "text-gray-400"
                    : "text-blue-500 hover:bg-gray-100"
                }`}
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${
                  currentPage === totalPages
                    ? "text-gray-400"
                    : "text-blue-500 hover:bg-gray-100"
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </>
      )}

      {!isLoading && !error && requests.length === 0 && (
        <div className="text-center text-gray-500">No requests found.</div>
      )}
    </div>
  );
};

export default RequestsTable;
