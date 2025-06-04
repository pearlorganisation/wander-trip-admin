"use client";

import { getAllCategories } from "@/lib/redux/actions/categoryAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryListPage() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">All Categories</h1>

      {loading && <p className="text-blue-600">Loading categories...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="list-disc pl-5 space-y-1">
        {categories?.length > 0
          ? categories.map((cat) => <li key={cat._id}>{cat.name}</li>)
          : !loading && <p className="text-gray-500">No categories found.</p>}
      </ul>
    </div>
  );
}
