// src/pages/Wishlist/Wishlist.jsx

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaTrash, FaArrowRight, FaShoppingBag } from "react-icons/fa";
import API_BASE from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import WishlistCard from "./WishlistCard";

const Wishlist = () => {
  const { token, toggleWishlist, clearWishlist } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [removingId, setRemovingId] = useState(null);
  const [clearing, setClearing] = useState(false);

  const storedToken = token || localStorage.getItem("token");

  useEffect(() => {
    if (!storedToken) {
      navigate("/login");
      return;
    }

    const getWishlist = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE}?r=site/api-get-wishlist-colleges`,
          {
            headers: {
              Authorization: storedToken,
            },
          },
        );

        const data = await response.json();

        if (data.status === "success") {
          setWishlist(data.data || []);
        } else if (data.status === "error") {
          if (data.message === "Unauthorized") {
            navigate("/login");
          } else {
            setError(data.message || "Failed to load wishlist.");
          }
        }
      } catch (err) {
        console.error("Wishlist fetch error:", err);
        setError("Failed to load wishlist. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getWishlist();
  }, [storedToken, navigate]);

  const handleRemove = async (collegeId) => {
    setRemovingId(collegeId);
    setError("");
    setSuccessMessage("");

    try {
      await toggleWishlist(collegeId);
      setWishlist((prev) => prev.filter((item) => item.id !== collegeId));
      setSuccessMessage("College removed from wishlist.");
    } catch (err) {
      console.error("Remove wishlist error:", err);
      setError("Could not remove college. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleRemoveAll = async () => {
    setClearing(true);
    setError("");
    setSuccessMessage("");

    try {
      await clearWishlist();
      setWishlist([]);
      setSuccessMessage("Wishlist cleared successfully.");
    } catch (err) {
      console.error("Clear wishlist error:", err);
      setError("Unable to clear wishlist. Please try again.");
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <div className="bg-[#EEF4FF] py-14 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link
                to="/"
                className="hover:text-[#2563EB] transition-colors duration-200"
              >
                Home
              </Link>
              <span>{">"}</span>
              <span className="text-[#2563EB] font-medium">Wishlist</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
                <FaHeart className="text-[#2563EB] text-2xl" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#2563EB] font-semibold">
                  Saved Colleges
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-[#0B1B43] leading-tight">
                  My Wishlist
                </h1>
                <p className="mt-4 text-gray-600 text-lg max-w-2xl">
                  Colleges you've saved to explore later. Manage your saved
                  selections with real-time sync to your account.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md">
            <img
              src="/src/assets/wishlist/wishlist-banner.jpeg"
              alt="Wishlist banner"
              className="w-full rounded-[32px] object-cover shadow-xl"
            />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 py-10">
        <div className="bg-white rounded-3xl border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1B43] mb-2">
                Saved Colleges ({wishlist.length})
              </h2>
              <p className="text-gray-500">
                Review your saved colleges or remove a selection when you're
                ready.
              </p>
            </div>

            {wishlist.length > 0 && (
              <button
                onClick={handleRemoveAll}
                disabled={clearing}
                className="inline-flex items-center gap-2 border border-red-300 text-red-500 px-5 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                <FaTrash />
                {clearing ? "Clearing..." : "Remove All"}
              </button>
            )}
          </div>

          {successMessage && (
            <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 px-5 py-4 text-green-700">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="min-h-[320px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full border-4 border-[#2563EB] border-t-transparent animate-spin"></div>
                <p className="text-gray-600 font-medium">
                  Loading your wishlist...
                </p>
              </div>
            </div>
          ) : wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {wishlist.map((college) => (
                <WishlistCard
                  key={college.id}
                  college={college}
                  onRemove={() => handleRemove(college.id)}
                  removing={removingId === college.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB] text-4xl">
                <FaHeart />
              </div>
              <h2 className="text-3xl font-bold text-[#0B1B43] mb-3">
                Wishlist Empty
              </h2>
              <p className="max-w-xl mx-auto text-gray-500 text-lg mb-8">
                You have not saved any colleges yet. Browse the college list and
                add your favorites to keep them handy.
              </p>
              <Link
                to="/colleges"
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300"
              >
                Explore Colleges
                <FaArrowRight />
              </Link>
            </div>
          )}

          <div className="mt-12 border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                <FaShoppingBag className="text-[#2563EB] text-3xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0B1B43] mb-1">
                  Want to add more colleges?
                </h3>
                <p className="text-gray-500">
                  Browse all colleges and save relevant profiles to your
                  wishlist.
                </p>
              </div>
            </div>
            <Link
              to="/colleges"
              className="bg-[#2563EB] text-white px-8 py-4 rounded-xl inline-flex items-center gap-3 hover:bg-blue-700 transition-all duration-300"
            >
              Explore Colleges
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
