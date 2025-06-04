const { createDestination } = require("@/lib/redux/actions/destinationAction");

function CreateDestination() {
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

  {
    addModal && (
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
            <div className="bg-red-500">
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
              <p className="text-red-500 text-sm">{errors.country.message}</p>
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
                <p className="text-red-500 text-sm">{errors.image.message}</p>
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
                <p className="text-red-500 text-sm">{errors.banner.message}</p>
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
                <option value="LUXURY_ADVENTURE">Luxury Adventure</option>{" "}
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
    );
  }
}
