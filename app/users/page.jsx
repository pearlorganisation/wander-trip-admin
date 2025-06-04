"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser } from "../../lib/redux/actions/userAction";
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  Calendar,
  Plus,
} from "lucide-react";
import Pagination from "@/component/Pagination";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAvatarColor(name) {
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

const UserList = () => {
  const dispatch = useDispatch();
  const { users, pagination } = useSelector((state) => state.auth);
  console.log("sgdhfhh", users);
  console.log("users", pagination);

  // useEffect(() => {
  //   dispatch(getAllUser({ page: 1, limit: 10 }));
  // }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(getAllUser({ page, limit: 10 }));
  };

  const totalUsers = users?.length || 0;
  const verifiedUsers = users?.filter((user) => user.isVerified).length || 0;
  const oauthUsers =
    users?.filter((user) => user.oauthAccounts?.length > 0).length || 0;

  const startResult = (pagination?.current_page - 1) * pagination?.limit + 1;
  const endResult = Math.min(
    pagination?.current_page * pagination?.limit,
    pagination?.total
  );

  const getInitials = (fullName) => {
    if (!fullName) return "";
    const names = fullName.trim().split(" ");
    const firstInitial = names[0]?.charAt(0).toUpperCase() || "";
    const lastInitial =
      names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "";
    return firstInitial + lastInitial;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            User Management
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>Total: {totalUsers} users</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalUsers}
              </p>
            </div>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
        </div>
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

      {/* Users List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Users List</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  OAuth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.length > 0 ? (
                users?.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-full ${getAvatarColor(
                            user.fullName
                          )} flex items-center justify-center text-white text-sm font-medium`}
                        >
                          {getInitials(user.fullName)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-6 py-4 text-center text-gray-500"
                    colSpan="6"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div>
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
