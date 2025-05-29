"use client";

import { useEffect, useState } from "react";
import { fetchPendingRequests } from "../lib/api";
import { Request } from "../types/request";

export default function Dashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchPendingRequests();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch requests");
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Guest Requests Dashboard
      </h1>
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests found.</p>
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
            Guest Requests Dashboard
          </h1>
          {requests.length === 0 ? (
            <p className="text-center text-gray-600">
              No pending requests found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-800">
                    <th className="py-2 px-4 border-b text-left font-semibold">
                      ID
                    </th>
                    <th className="py-2 px-4 border-b text-left font-semibold">
                      Guest Phone
                    </th>
                    <th className="py-2 px-4 border-b text-left font-semibold">
                      Request Text
                    </th>
                    <th className="py-2 px-4 border-b text-left font-semibold">
                      Created At
                    </th>
                    <th className="py-2 px-4 border-b text-left font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-gray-100 text-gray-700"
                    >
                      <td className="py-2 px-4 border-b">{request.id}</td>
                      <td className="py-2 px-4 border-b">
                        {request.guestPhone}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {request.requestText}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(request.createdAt).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border-b">{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
