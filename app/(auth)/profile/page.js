"use client";
import { useState } from "react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("view"); // view, edit, password
  const [formData, setFormData] = useState({
    name: "Wandertrip",
    email: "wandertrp@gmail.com",
    phone: "1234567895",
    role: "ADMIN",
    verified: "Yes",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("Updated Details:", formData);
    setActiveTab("view");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    console.log("New Password:", formData.newPassword);
    setFormData({ ...formData, newPassword: "" });
    setActiveTab("view");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("view")}
          className={`px-4 py-2 rounded-t-md font-medium ${
            activeTab === "view"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          View Profile
        </button>
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-2 rounded-t-md font-medium ${
            activeTab === "edit"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Update Details
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-4 py-2 rounded-t-md font-medium ${
            activeTab === "password"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Update Password
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-lg shadow p-6">
        {activeTab === "view" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <div className="mb-2">
              <strong>Name:</strong> {formData.name}
            </div>
            <div className="mb-2">
              <strong>Email:</strong> {formData.email}
            </div>
            <div className="mb-2">
              <strong>Phone Number:</strong> {formData.phone}
            </div>
            <div className="mb-2">
              <strong>Role:</strong> {formData.role}
            </div>
            <div className="mb-2">
              <strong>Verified:</strong> {formData.verified}
            </div>
          </div>
        )}

        {activeTab === "edit" && (
          <form onSubmit={handleSaveChanges}>
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("view")}
                className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {activeTab === "password" && (
          <form onSubmit={handleUpdatePassword}>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Update Password
            </h2>

            <div className="mb-6">
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
