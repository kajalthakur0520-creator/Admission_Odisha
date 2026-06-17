// src/pages/Wishlist/WishlistCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegEye,
  FaMapMarkerAlt,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import { ASSETS_BASE } from "../../config/api";

const WishlistCard = ({ college, onRemove, removing }) => {
  const imageUrl = college.banner_image
    ? college.banner_image.startsWith("http")
      ? college.banner_image
      : `${ASSETS_BASE}/${college.banner_image}`
    : college.image
      ? college.image.startsWith("http")
        ? college.image
        : `${ASSETS_BASE}/${college.image}`
      : "/src/assets/wishlist/wishlist-banner.jpeg";

  const courseText = (() => {
    if (Array.isArray(college.courses)) {
      return college.courses
        .slice(0, 3)
        .map((c) => (typeof c === "object" ? c.name : c))
        .join(", ");
    }
    if (typeof college.courses === "string") {
      try {
        const parsed = JSON.parse(college.courses);
        if (Array.isArray(parsed)) {
          return parsed
            .slice(0, 3)
            .map((c) => c.name || c)
            .join(", ");
        }
      } catch (e) {
        // If parsing fails, fall back to type or default
      }
    }
    return college.type || "Engineering";
  })();

  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt={college.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-lg">
          <FaHeart className="text-red-500 text-lg" />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-[#0B1B43] mb-2 line-clamp-2">
          {college.name}
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt />
            {college.location || college.city || "Bhubaneswar, Odisha"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF4FF] px-2 py-0.5 text-[#2563EB]">
            {courseText}
          </span>
        </div>

        {college.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {typeof college.description === "string" ? college.description : ""}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1 text-xs text-gray-700 font-semibold">
            <FaStar className="text-yellow-400" />
            {college.rating ? college.rating.toFixed(1) : "4.4"}
          </div>
          <span className="text-xs text-gray-500">
            {college.total_reviews
              ? `${college.total_reviews} Reviews`
              : "1280 Reviews"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to={`/colleges/${college.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1 border border-[#2563EB] text-[#2563EB] py-2 rounded-xl text-sm hover:bg-[#2563EB] hover:text-white transition-all duration-300"
          >
            <FaRegEye size={12} />
            View Details
          </Link>

          <button
            disabled={removing}
            onClick={onRemove}
            className="flex-1 inline-flex items-center justify-center gap-1 border border-red-300 text-red-500 py-2 rounded-xl text-sm hover:bg-red-500 hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            <FaTrash size={12} />
            {removing ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
