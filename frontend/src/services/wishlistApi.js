import axios from "axios";
import API_BASE from "../config/api";

const WISHLIST_BASE = `${API_BASE}?r=site`;

export const getWishlist = (token) =>
  axios.get(`${WISHLIST_BASE}/api-get-wishlist-colleges`, {
    headers: { Authorization: token },
  });

export const addWishlist = (token, collegeId) =>
  axios.post(
    `${WISHLIST_BASE}/api-add-wishlist`,
    { college_id: collegeId },
    {
      headers: { Authorization: token },
    },
  );

export const removeWishlist = (token, collegeId) =>
  axios.post(
    `${WISHLIST_BASE}/api-remove-wishlist`,
    { college_id: collegeId },
    {
      headers: { Authorization: token },
    },
  );

export const toggleWishlist = (token, collegeId) =>
  axios.post(
    `${WISHLIST_BASE}/api-toggle-wishlist`,
    { college_id: collegeId },
    {
      headers: { Authorization: token },
    },
  );

export const clearWishlist = (token) =>
  axios.post(
    `${WISHLIST_BASE}/api-clear-wishlist`,
    {},
    {
      headers: { Authorization: token },
    },
  );
