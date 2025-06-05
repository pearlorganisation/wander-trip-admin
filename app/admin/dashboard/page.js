"use client";




import { useState } from "react";

// Mock data for dashboard
const recentBookings = [
  {
    id: "BK-7829",
    customer: "Emma Thompson",
    tour: "Paris City Explorer",
    date: "2025-06-10",
    amount: 1299,
    status: "Confirmed",
  },
  {
    id: "BK-7830",
    customer: "Michael Chen",
    tour: "Tokyo Adventure",
    date: "2025-06-12",
    amount: 2499,
    status: "Pending",
  },
  {
    id: "BK-7831",
    customer: "Sophia Rodriguez",
    tour: "Rome Historical Tour",
    date: "2025-06-15",
    amount: 1799,
    status: "Confirmed",
  },
  {
    id: "BK-7832",
    customer: "James Wilson",
    tour: "New York City Pass",
    date: "2025-06-18",
    amount: 899,
    status: "Cancelled",
  },
];

const popularTours = [
  {
    id: 1,
    name: "Paris City Explorer",
    image: "/placeholder.svg?height=60&width=80",
    bookings: 128,
    rating: 4.8,
    revenue: 166272,
  },
  {
    id: 2,
    name: "Tokyo Adventure",
    image: "/placeholder.svg?height=60&width=80",
    bookings: 97,
    rating: 4.9,
    revenue: 242403,
  },
  {
    id: 3,
    name: "Rome Historical Tour",
    image: "/placeholder.svg?height=60&width=80",
    bookings: 85,
    rating: 4.7,
    revenue: 152915,
  },
];

const monthlyRevenue = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 61000 },
  { month: "Apr", amount: 85000 },
  { month: "May", amount: 95000 },
  { month: "Jun", amount: 110000 },
];

const getStatusBadgeClasses = (status) => {
  const variants = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  return variants[status] || "bg-gray-100 text-gray-800";
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");

  // Calculate dashboard metrics
  const totalBookings = 1248;
  const totalRevenue = 1876500;
  const totalCustomers = 876;
  const conversionRate = 8.4;

  // Chart rendering (simplified version)
  const maxRevenue = Math.max(...monthlyRevenue.map((item) => item.amount));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        {/* Logo */}
        <div
          className={`h-16 flex items-center px-4 border-b border-gray-200 ${
            !sidebarOpen && "justify-center"
          }`}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            {sidebarOpen && (
              <span className="ml-3 text-lg font-bold text-gray-900">
                TourMaster
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
          <ul className="px-2 space-y-1">
            {/* Dashboard */}
            <li>
              <button
                onClick={() => setActiveNavItem("dashboard")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeNavItem === "dashboard"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium">Dashboard</span>
                )}
              </button>
            </li>

            {/* Tours */}
            <li>
              <button
                onClick={() => setActiveNavItem("tours")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeNavItem === "tours"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium">Tours</span>
                )}
              </button>
            </li>

            {/* Bookings */}
            <li>
              <button
                onClick={() => setActiveNavItem("bookings")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeNavItem === "bookings"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium">Bookings</span>
                )}
              </button>
            </li>

            {/* Customers */}
            <li>
              <button
                onClick={() => setActiveNavItem("customers")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeNavItem === "customers"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium">Customers</span>
                )}
              </button>
            </li>

            {/* Reviews */}
            <li>
              <button
                onClick={() => setActiveNavItem("reviews")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeNavItem === "reviews"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium">Reviews</span>
                )}
              </button>
            </li>

            {/* Reports */}
            <li>
              <button
                onClick={() => setActiveNavItem("reports")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeNavItem === "reports"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium">Reports</span>
                )}
              </button>
            </li>

            {/* Settings */}
            <li>
              <button
                onClick={() => setActiveNavItem("settings")}
                className={`flex items-center w-full px-3 py-2 rounded-lg ${
                  activeNavItem === "settings"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium">Settings</span>
                )}
              </button>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                sidebarOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {sidebarOpen && <span className="ml-2">Collapse</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 relative">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@tourmaster.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Bookings */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-blue-50 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalBookings.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  12.5% from last month
                </p>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-green-50 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(totalRevenue / 1000).toFixed(1)}k
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  8.2% from last month
                </p>
              </div>
            </div>

            {/* Total Customers */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-purple-50 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Customers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCustomers.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  5.3% from last month
                </p>
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-yellow-50 p-3 rounded-full">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {conversionRate}%
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  1.2% from last month
                </p>
              </div>
            </div>
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Monthly Revenue
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                    This Year
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-full">
                    Last Year
                  </button>
                </div>
              </div>

              {/* Simple Chart Visualization */}
              <div className="h-64 flex items-end space-x-2">
                {monthlyRevenue.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-all"
                      style={{ height: `${(item.amount / maxRevenue) * 100}%` }}
                    ></div>
                    <div className="text-xs font-medium text-gray-600 mt-2">
                      {item.month}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tours */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Popular Tours
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {popularTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
                  >
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.name}
                      className="w-20 h-15 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-800">
                        {tour.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs text-gray-600 ml-1">
                          {tour.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${(tour.revenue / 1000).toFixed(1)}k
                      </p>
                      <p className="text-xs text-gray-500">
                        {tour.bookings} bookings
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Bookings
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {booking.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {booking.tour}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${booking.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClasses(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <button className="text-blue-600 hover:text-blue-900">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
