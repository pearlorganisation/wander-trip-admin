"use client";
import { getAlldestination } from "@/lib/redux/actions/destinationAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const { destinationsdata, isLoading, error } = useSelector(
    (state) => state.destination
  );

  useEffect(() => {
    dispatch(getAlldestination({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Destinations</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Failed to load destinations.</p>}

      {!isLoading && destinationsdata?.length === 0 && (
        <p className="text-gray-500">No destinations found.</p>
      )}

      {!isLoading && destinationsdata?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-6 py-3 border-b">#</th>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Country</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinationsdata.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{index + 1}</td>
                  <td className="px-6 py-4 border-b">{item.name}</td>
                  <td className="px-6 py-4 border-b">
                    {item.country || "N/A"}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <button className="text-blue-600 hover:underline mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
