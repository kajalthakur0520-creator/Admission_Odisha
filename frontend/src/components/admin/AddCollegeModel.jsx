import React, { useEffect, useRef, useState } from "react";
import API_BASE from "../../config/api";

export default function AddCollegeModel({ onClose, onCreated }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    shortName: "",
    location: "",
    rating: "",
    description: "",
    type: "",
    status: "Active",
    established: "",
    website: "",
    address: "",
  });

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose?.();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose?.();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Phase 2: call backend API to create a college
    setSubmitting(true);
    setError(null);
    fetch(`${API_BASE}?r=site/api-colleges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        short_name: form.shortName,
        location: form.location,
        rating: form.rating,
        description: form.description,
        type: form.type,
        established_year: form.established,
        website: form.website,
        address: form.address,
        is_status: form.status === "Active" ? 1 : 0,
      }),
    })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.status === "error") {
          throw new Error(json.message || `Server error (${res.status})`);
        }
        onCreated?.();
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to create college");
      })
      .finally(() => setSubmitting(false));
  }

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 p-4"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1200px] rounded-2xl bg-white p-6 shadow-lg sm:my-6 sm:p-8"
        style={
          {
            // ensure left/right spacing ~15-20% on large screens via maxWidth
          }
        }
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Add College</h2>
          <button
            onClick={() => onClose?.()}
            aria-label="Close modal"
            className="-mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]"
        >
          <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  College Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                  placeholder="Enter college name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Short Name
                </label>
                <input
                  name="shortName"
                  value={form.shortName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                  placeholder="Enter short name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Location (City)
                </label>
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select city</option>
                  <option>Bhubaneswar</option>
                  <option>Cuttack</option>
                  <option>Rourkela</option>
                  <option>Berhampur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Rating
                </label>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select rating</option>
                  <option value="5">5.0 (Excellent)</option>
                  <option value="4.5">4.5 (Very Good)</option>
                  <option value="4">4.0 (Good)</option>
                  <option value="3">3.0 (Below Average)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Image (Optional)
                </label>
                <div className="mt-2 flex h-28 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                  <span className="text-sm text-slate-400">
                    Click to upload image (JPG, PNG)
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Banner Image (Optional)
                </label>
                <div className="mt-2 flex h-28 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
                  <span className="text-sm text-slate-400">
                    Click to upload banner
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-600">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
                placeholder="Enter college description"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Established Year
                </label>
                <select
                  name="established"
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select year</option>
                  <option>2024</option>
                  <option>2010</option>
                  <option>2000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option>State University</option>
                  <option>Private University</option>
                  <option>Government College</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => onClose?.()}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save College"}
              </button>
            </div>
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

          <aside className="hidden rounded-2xl border border-slate-100 bg-slate-50 p-4 lg:block">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-white p-2 shadow">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-blue-600"
                >
                  <path
                    d="M12 2L20 6v6c0 5-4 9-8 11-4-2-8-6-8-11V6l8-4z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  College Profile Preview
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Fill the form to see how the college profile will appear.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Add high quality images</li>
                <li>• Provide accurate information</li>
                <li>• Keep description informative</li>
                <li>• Add all relevant courses</li>
              </ul>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
