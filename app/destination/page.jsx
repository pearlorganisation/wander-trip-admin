"use client";

import {
  createDestination,
  deleteDestinationById,
  getAlldestination,
  updateDestination,
} from "@/lib/redux/actions/destinationAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Star,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Activity,
  Eye,
  Edit,
  Trash2,
  X,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteModal from "@/component/DeleteModal";
import { toast } from "react-toastify";
import Pagination from "@/component/Pagination";

export default function DestinationsCards() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [id, setId] = useState();
  const [editFormData, setEditFormData] = useState({
    name: "",
    slug: "",
    country: "",
    description: "",
    averageRating: 0,
    image: "",
    banner: "",
    category: "",
  });
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();
  const { destinationsdata, pagination, isLoading, error } = useSelector(
    (state) => state.destination
  );
  console.log("pagination", pagination.current_page);
  console.log("pagination", pagination);
  const [imagePreview, setImagePreview] = useState();
  const [bannerPreview, setBannerPreview] = useState();

  console.log("destionation", destinationsdata);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlldestination({ page: 1, limit: 10 }));
  }, [dispatch]);

  const openEditModal = (destination) => {
    setCurrentDestination(destination);
    setEditFormData({
      slug: destination.slug,
      name: destination.name,
      country: destination.country,
      description: destination.description,
      averageRating: destination.averageRating || 0,
      imageUrl: destination.imageUrl,
      bannerUrl: destination.bannerUrl,
      category: destination.category,
    });
    setIsEditModalOpen(true);
  };
  const handleImagechange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      if (type === "image") {
        setImagePreview(preview);
        setEditFormData((prev) => ({ ...prev, image: file }));
      } else if (type === "banner") {
        setBannerPreview(preview);
        setEditFormData((prev) => ({ ...prev, banner: file }));
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Set name field
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If changing name, also update slug
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-");

      setEditFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("slug", editFormData.slug);
    formData.append("name", editFormData.name);
    formData.append("country", editFormData.country);
    formData.append("description", editFormData.description);
    formData.append("averageRating", editFormData.averageRating);
    formData.append("image", editFormData.image);
    formData.append("banner", editFormData.banner);
    formData.append("category", editFormData.category);

    if (editFormData.image) {
    }
    Object(formData)
      .values()
      .forEach((element) => {
        console.log("data", element);
      });

    dispatch(updateDestination({ slug: editFormData.slug, formData })).then(
      () => {
        dispatch(getAlldestination({ page: 1, limit: 10 }));
        console.log("something", something);
      }
    );

    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = (id) => {
    setId(id);
    setDeleteModal(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setDeleteModal(false);
  };
  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      if (type === "images") {
        setImagePreview(preview);
        if (type === "banner") {
          setBanner(preview);
        }
      }
    }
  };
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };
  const handleNameChange = (e) => {
    const name = e.target.value;
    setValue("name", name); // Update the name field value
    setValue("slug", generateSlug(name)); // Update slug based on name
  };

  const handleDelete = () => {
    dispatch(deleteDestinationById(id)).then((res) => {
      if (res.payload.success == true) {
        setDeleteModal(false);
        dispatch(getAlldestination({ page: 1, limit: 10 }));
      }
    });
  };

  const onSubmit = (data) => {
    console.log(data, "daattttt");

    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("slug", data.slug);
    formdata.append("country", data.country);
    formdata.append("description", data.description);
    formdata.append("averageRating", data.averageRating);
    formdata.append("category", data.category);
    formdata.append("image", data.image[0]);
    formdata.append("banner", data.banner[0]);

    dispatch(createDestination(formdata)).then((res) => {
      if (res.payload.success == true) {
        setAddModal(false);
        dispatch(getAlldestination({ page: 1, limit: 10 }));
      }
    });
  };
  const startResult = (pagination.current_page - 1) * pagination.limit + 1;
  const endResult = Math.min(
    pagination.current_page * pagination.limit,
    pagination.total
  );
  const handlePageChange = (page) => {
    dispatch(getAlldestination({ page, limit: 10 }));
  };
  return (
    <>
      <div className="flex justify-between px-4 py-4">
        <div></div>
        <button
          onClick={() => setAddModal(true)}
          className="flex items-center gap-2 bg-[#1eb4f3] text-white px-4 py-2 rounded-full hover:bg-[#0da6e8] transition"
        >
          <Plus className="w-4 h-4" />
          Add Destination
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Popular Destinations</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationsdata?.map((destination) => {
            return (
              <div
                key={destination._id}
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{destination.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {destination.country}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    {destination.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-600 mb-2 gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {destination.averageRating} ({destination.numberOfRatings})
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    {/* <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Best time: {info.bestTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price per day: ${info.pricePerDay}
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Activities: {info.activities}
                    </div> */}
                  </div>

                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      onClick={() => openEditModal(destination)}
                      className="text-blue-600 hover:underline text-sm flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleConfirmDelete(destination._id)}
                      className="text-red-600 hover:underline text-sm flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold mb-4">Edit Destination</h3>

              <form onSubmit={handleSubmitEdit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={editFormData.name || ""}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full border px-4 py-2 rounded"
                />

                <input
                  type="text"
                  name="slug"
                  value={editFormData.slug || ""}
                  onChange={handleInputChange}
                  placeholder="Slug"
                  className="w-full border px-4 py-2 rounded"
                />

                <input
                  type="text"
                  name="country"
                  value={editFormData.country || ""}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-full border px-4 py-2 rounded"
                />

                <textarea
                  name="description"
                  value={editFormData.description || ""}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full h-32 border px-4 py-2 rounded"
                />

                <input
                  type="number"
                  name="averageRating"
                  step="0.1"
                  value={editFormData.averageRating || ""}
                  onChange={handleInputChange}
                  placeholder="Average Rating"
                  className="w-full border px-4 py-2 rounded"
                />

                {/* Main Image Preview and Upload */}
                <div>
                  <label className="block font-medium mb-1">Image</label>
                  <img
                    src={editFormData.imageUrl || "/placeholder.jpg"}
                    alt="Destination"
                    className="w-full max-w-64 h-40 object-cover rounded"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setEditFormData((prev) => ({
                        ...prev,
                        image: file,
                        imageUrl: file
                          ? URL.createObjectURL(file)
                          : prev.imageUrl,
                      }));
                    }}
                    className="mt-2"
                  />
                </div>

                {/* Banner Image Preview and Upload */}
                <div>
                  <label className="block font-medium mb-1">Banner Image</label>
                  <img
                    src={editFormData.bannerUrl || "/banner-placeholder.jpg"}
                    alt="Banner"
                    className="w-full h-40 object-cover rounded"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setEditFormData((prev) => ({
                        ...prev,
                        banner: file,
                        bannerUrl: file
                          ? URL.createObjectURL(file)
                          : prev.bannerUrl,
                      }));
                    }}
                    className="mt-2"
                  />
                </div>

                {/* Category Dropdown */}
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={editFormData.category || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        category: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="BEACH">Beach</option>
                    <option value="MOUNTAINS">Mountains</option>
                    <option value="CITIES">Cities</option>
                    <option value="CULTURAL">Cultural</option>
                    <option value="LUXURY">Luxury</option>
                    <option value="HIDDEN_GEMS">Hidden Gems</option>
                    <option value="ADVENTURE">Adventure</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 
create form */}
        {addModal && (
          <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setAddModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-4">Create Destination</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  {...register("name", { required: "Name is required" })}
                  onChange={(e) => {
                    const value = e.target.value;
                    const slug = value
                      .toLowerCase()
                      .trim()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/--+/g, "-");
                    setValue("name", value);
                    setValue("slug", slug);
                  }}
                  type="text"
                  placeholder="Name"
                  className="w-full border px-4 py-2 rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                {/* Slug Field (Read-Only) */}
                <div className="">
                  <label className="block text-sm font-medium">Slug</label>
                  <input
                    type="text"
                    {...register("slug")}
                    className="w-full p-2 border rounded-md bg-gray-100"
                  />
                </div>

                <input
                  {...register("country", { required: "Country is required" })}
                  type="text"
                  placeholder="Country"
                  className="w-full border px-4 py-2 rounded"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}

                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="w-full h-32 border px-4 py-2 rounded"
                />

                <input
                  {...register("averageRating", {
                    required: "Rating is required",
                    min: {
                      value: 0,
                      message: "Rating must be at least 0",
                    },
                    max: {
                      value: 5,
                      message: "Rating must not exceed 5 stars",
                    },
                  })}
                  type="number"
                  step="0.1"
                  placeholder="Average Rating (0-5)"
                  className="w-full border px-4 py-2 rounded"
                />
                {errors.averageRating && (
                  <p className="text-red-500 text-sm">
                    {errors.averageRating.message}
                  </p>
                )}

                {/* Main Image Upload */}
                <div>
                  <label className="block font-medium mb-1">Main Image</label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: "Image is required" })}
                    onChange={(e) => handleImageChange(e, "image")}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm">
                      {errors.image.message}
                    </p>
                  )}
                </div>

                {/* Banner Upload */}
                <div>
                  <label className="block font-medium mb-1">Banner Image</label>
                  {bannerPreview && (
                    <img
                      src={bannerPreview}
                      alt="Banner Preview"
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    {...register("banner", { required: "Banner is required" })}
                    onChange={(e) => handleImageChange(e, "banner")}
                  />
                  {errors.banner && (
                    <p className="text-red-500 text-sm">
                      {errors.banner.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Category</label>
                  <select
                    {...register("category")}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    defaultValue=""
                  >
                    {" "}
                    <option value="">All</option>
                    <option value="BEACH">Beach</option>
                    <option value="MOUNTAINS">Mountain</option>
                    <option value="CITIES">Cities</option>
                    <option value="CULTURAL">Cultural</option>
                    <option value="LUXURY_ADVENTURE">
                      Luxury Adventure
                    </option>{" "}
                    {/* Corrected value */}
                    <option value="HIDDEN_GEMS">Hidden Gems</option>
                    <option value="ACADEMY">Academy</option>{" "}
                    {/* Optional: added based on earlier messages */}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Create Destination
                </button>
              </form>
            </div>
          </div>
        )}
        <Pagination
          pagination={pagination}
          handlePageChange={handlePageChange}
          startResult={startResult}
          endResult={endResult}
        />
      </div>

      {openDeleteModal && (
        <DeleteModal
          isOpen={openDeleteModal}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
