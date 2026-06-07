import { createContext, useState, useEffect } from "react";
import API_BASE from "../config/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async (currentToken) => {
    const isAdminPage =
      window.location.pathname.includes("/admin") ||
      window.location.pathname.includes("/dashboard");
    if (isAdminPage) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}?r=site/api-get-wishlist`, {
        headers: { Authorization: currentToken },
      });
      const data = await response.json();
      if (data.status === "success") {
        setWishlist(data.data.map((id) => parseInt(id, 10)));
      }
    } catch (e) {
      console.error("Error fetching wishlist", e);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchWishlist(storedToken);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    fetchWishlist(token);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");

    await fetch(`${API_BASE}?r=auth/logout`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });

    localStorage.removeItem("token");
    setToken(null); // 🔥 IMPORTANT
    setWishlist([]);
  };

  const toggleWishlist = async (collegeId) => {
    if (!token) {
      alert("Please login before wishlisting.");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    const normalizedCollegeId = parseInt(collegeId, 10);
    const alreadyWishlisted = wishlist.includes(normalizedCollegeId);

    setWishlist((prev) =>
      alreadyWishlisted
        ? prev.filter((id) => id !== normalizedCollegeId)
        : [...prev, normalizedCollegeId],
    );

    try {
      const response = await fetch(`${API_BASE}?r=site/api-toggle-wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ college_id: normalizedCollegeId }),
      });

      const data = await response.json();
      if (data.status === "success") {
        return data;
      }

      if (data.status === "error" && data.message === "Unauthorized") {
        alert("Session expired. Please login again.");
        logout();
        window.location.href = "/login";
      }

      setWishlist((prev) =>
        alreadyWishlisted
          ? [...prev, normalizedCollegeId]
          : prev.filter((id) => id !== normalizedCollegeId),
      );
      throw new Error(data.message || "Unable to update wishlist.");
    } catch (e) {
      console.error("Error toggling wishlist", e);
      setWishlist((prev) =>
        alreadyWishlisted
          ? [...prev, normalizedCollegeId]
          : prev.filter((id) => id !== normalizedCollegeId),
      );
      throw e;
    }
  };

  const clearWishlist = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE}?r=site/api-clear-wishlist`, {
        method: "POST",
        headers: { Authorization: token },
      });
      const data = await response.json();
      if (data.status === "success") {
        setWishlist([]);
        return data;
      }
      throw new Error(data.message || "Unable to clear wishlist.");
    } catch (e) {
      console.error("Error clearing wishlist", e);
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, wishlist, toggleWishlist, clearWishlist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
