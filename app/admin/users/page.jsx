"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckCircle,
  XCircle,
  Users as UsersIcon,
  Mail,
  Calendar,
  Plus,
} from "lucide-react";
import Pagination from "@/component/Pagination";
import { getAllUser } from "@/lib/redux/actions/userAction";
import { FaSearch, FaFilter, FaSyncAlt, FaDownload } from "react-icons/fa";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAvatarColor(name = "") {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-red-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function getInitials(fullName = "") {
  const names = fullName.trim().split(" ");
  const first = names[0]?.charAt(0).toUpperCase() || "";
  const last = names[1]?.charAt(0).toUpperCase() || "";
  return first + last;
}

const UserList = () => {
  const dispatch = useDispatch();
  const { users = [], pagination = {} } = useSelector((state) => state?.auth);
  const [searchQuery, setSearchQuery] = useState("");
  console.log("searchquery", searchQuery);
  // Fetch page 1 on mount
  useEffect(() => {
    console.log("inside useeffcer change");
    dispatch(getAllUser({ page: 1, limit: 10, searchQuery }));
  }, [dispatch]);

  const handlePageChange = (page) => {
    console.log("inside handle change");
    dispatch(getAllUser({ page, limit: 10, searchQuery }));
  };

  // Stats
  const totalUsers = users.length;
  const verifiedUsers = users.filter((u) => u.isVerified).length;
  const oauthUsers = users.filter((u) => u.oauthAccounts?.length > 0).length;

  // Pagination calculations
  const currentPage = pagination?.current_page || 1;
  const limit = pagination?.limit || 10;
  const total = pagination?.total || 0;
  const startResult = (currentPage - 1) * limit + 1;
  const endResult = Math.min(currentPage * limit, total);

  useEffect(() => {
    const delay = setTimeout(() => {
      handlePageChange(1);
    }, 300); 

    return () => clearTimeout(delay);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          User Management
        </h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          {/* Search & Controls */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg flex-1 md:flex-none">
            {/* Search Box */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-xs">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handlePageChange();
                }}
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
              <FaFilter className="text-gray-500" />
              <span>Filters</span>
            </button>

            {/* Refresh Button */}
            <button className="flex items-center justify-center bg-gray-50 border border-gray-200 p-2 rounded-lg hover:bg-gray-100">
              <FaSyncAlt className="text-gray-500" />
            </button>

            {/* Download Button */}
            <button className="flex items-center justify-center bg-gray-50 border border-gray-200 p-2 rounded-lg hover:bg-gray-100">
              <FaDownload className="text-gray-500" />
            </button>
          </div>

          {/* Total Users Count */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UsersIcon className="h-4 w-4" />
            <span>Total: {totalUsers} users</span>
          </div>

          {/* Add User */}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalUsers}
              </p>
            </div>
            <UsersIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Verified Users */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Verified Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {verifiedUsers}
              </p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        </div>

        {/* OAuth Users */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">OAuth Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {oauthUsers}
              </p>
            </div>
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Users List Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Users List</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "Role", "Status", "OAuth", "Created"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => {
                  const carpetArea = 0; // not used here
                  const expectedPrice = 0; // not used here

                  return (
                    <tr key={user._id} className="hover:bg-gray-50">
                      {/* Name & Avatar */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className={`${getAvatarColor(
                              user.fullName
                            )} h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium`}
                          >
                            {getInitials(user.fullName)}
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {user.email}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {user.isVerified ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-green-700 font-medium">
                                Verified
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-500" />
                              <span className="text-sm text-red-700 font-medium">
                                Unverified
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* OAuth */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.oauthAccounts?.length > 0 ? (
                          user.oauthAccounts.map((account) => (
                            <span
                              key={account._id}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-1"
                            >
                              {account.provider}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    className="px-6 py-4 text-center text-gray-500"
                    colSpan={6}
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4">
          <Pagination
            pagination={pagination}
            handlePageChange={handlePageChange}
            startResult={startResult}
            endResult={endResult}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
