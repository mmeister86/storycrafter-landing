"use client";

import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";

// Define the Signup type
interface Signup {
  email: string;
  name: string;
  timestamp: string;
}

export default function AdminPage() {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignups() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/admin/signups");

        if (!response.ok) {
          throw new Error("Failed to load signups");
        }

        const data = await response.json();
        setSignups(data.signups);
      } catch (err) {
        console.error("Error loading signups:", err);
        setError("Failed to load signups. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSignups();
  }, []);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#e6a54c]">
        StoryCrafter Waitlist Signups
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e6a54c]"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-900 text-red-100 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {!isLoading && !error && signups.length === 0 && (
        <div className="bg-[#1b263b] border border-[#2a3042] p-6 rounded-md text-center">
          <p className="text-xl text-[#a7a7a7]">No signups yet.</p>
        </div>
      )}

      {!isLoading && !error && signups.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-[#1b263b] border border-[#2a3042] rounded-lg overflow-hidden">
            <thead className="bg-[#263550]">
              <tr>
                <th className="px-6 py-3 text-left text-[#e6a54c]">Email</th>
                <th className="px-6 py-3 text-left text-[#e6a54c]">Name</th>
                <th className="px-6 py-3 text-left text-[#e6a54c]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a3042]">
              {signups.map((signup, index) => (
                <tr key={index} className="hover:bg-[#263550]/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {signup.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {signup.name || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(signup.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
