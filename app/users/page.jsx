// pages/users.js
"use client";
import React from "react";

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com" },
  { id: 4, name: "Diana Clark", email: "diana@example.com" },
];

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="p-4 border rounded shadow-sm">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
