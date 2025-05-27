"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, MapPin, Calendar, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../lib/redux/actions/reviewAction";
import moment from "moment"; // Optional: use for better date formatting
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState("1");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [showRatingMenu, setShowRatingMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const { setValue } = useForm({
    defaultValues: {
      rating: "1",
      sortBy: "newest",
    },
  });

  const dispatch = useDispatch();
  const { reviews, pagination, loading, error } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    dispatch(
      getAllReviews({
        page: 1,
        limit: 10,
        rating: selectedRating,
        sortBy: selectedSort,
      })
    );
  }, [dispatch, selectedRating, selectedSort]);

  const handleRatingChange = (value) => {
    setSelectedRating(value);
    setValue("rating", value);
    setShowRatingMenu(false);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    setValue("sortBy", value);
    setShowSortMenu(false);
  };

  const ratingOptions = [
    { label: "All ratings", value: "1" },
    { label: "5 stars", value: "5" },
    { label: "4 stars & up", value: "4" },
    { label: "3 stars & up", value: "3" },
    { label: "2 stars & up", value: "2" },
    { label: "1 star & up", value: "1" },
  ];

  const sortOptions = [
    { label: "Date: Newest to Oldest", value: "newest" },
    { label: "Date: Oldest to Newest", value: "oldest" },
    { label: "Rating: High to Low", value: "highest" },
    { label: "Rating: Low to High", value: "lowest" },
  ];

  const DecimalStarRating = ({ rating, totalStars = 5 }) => {
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (rating >= i) {
        // full star
        stars.push(<FaStar key={i} className="text-yellow-400 text-xl" />);
      } else if (rating >= i - 0.5) {
        // half star
        stars.push(
          <FaStarHalfAlt key={i} className="text-yellow-400 text-xl" />
        );
      } else {
        // empty star
        stars.push(<FaRegStar key={i} className="text-gray-300 text-xl" />);
      }
    }
  };
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  const getRatingLabel = () =>
    ratingOptions.find((o) => o.value === selectedRating)?.label ||
    "All ratings";

  const getSortLabel = () =>
    sortOptions.find((o) => o.value === selectedSort)?.label ||
    "Date: Newest to Oldest";

  if (loading) return <p className="p-6">Loading reviews...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-sm text-gray-600 mt-1">
            Showing {reviews?.length || 0} of {pagination?.total || 0} reviews
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 relative">
          {/* Rating Filter */}
          <div className="relative">
            <button
              onClick={() => setShowRatingMenu(!showRatingMenu)}
              className="border px-4 py-2 rounded-md min-w-[140px] flex justify-between items-center text-sm"
            >
              {getRatingLabel()}
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {showRatingMenu && (
              <ul className="absolute z-10 mt-1 bg-white border rounded shadow-md w-[180px]">
                {ratingOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleRatingChange(option.value)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedRating === option.value
                        ? "bg-gray-100 font-medium"
                        : ""
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="border px-4 py-2 rounded-md min-w-[180px] flex justify-between items-center text-sm"
            >
              {getSortLabel()}
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {showSortMenu && (
              <ul className="absolute z-10 mt-1 bg-white border rounded shadow-md w-[220px]">
                {sortOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedSort === option.value
                        ? "bg-gray-100 font-medium"
                        : ""
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold uppercase">
                  {review.user?.fullName?.charAt(0) || "U"}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.user?.fullName || "Anonymous"}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {review.destination?.name || "Unknown"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {moment(review.createdAt).format("MMM D, YYYY")}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-3">
                    {renderStars(review.rating)}
                  </div>

                  <p className="text-gray-700 mt-4 leading-relaxed">
                    {review.content}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-900 font-semibold">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {review.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
      <DecimalStarRating rating={3.4} />
      <DecimalStarRating rating={2.5} />
    </div>
  );
}
