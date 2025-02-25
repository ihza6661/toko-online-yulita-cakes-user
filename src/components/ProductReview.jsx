import { useState, useEffect, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ProductReview = ({ productId }) => {
  const { authFetch, token } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [eligible, setEligible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editHoverRating, setEditHoverRating] = useState(0);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authFetch("/api/user/get_user", {
          method: "GET",
          headers: { Accept: "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    if (token) {
      fetchUserProfile();
    }
  }, [authFetch, token]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await authFetch(
          `/api/user/product/${productId}/reviews`,
          { method: "GET", headers: { Accept: "application/json" } }
        );
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [authFetch, productId]);

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        const response = await authFetch(
          `/api/user/product/${productId}/review-eligibility`,
          { method: "GET", headers: { Accept: "application/json" } }
        );
        if (response.ok) {
          const data = await response.json();
          setEligible(data.eligible);
        } else {
          setEligible(false);
        }
      } catch (error) {
        console.error("Error checking review eligibility:", error);
        setEligible(false);
      }
    };
    if (token) {
      checkEligibility();
    }
  }, [authFetch, productId, token]);

  const hasReviewed =
    token && currentUser
      ? reviews.some((review) => review.user && review.user.id === currentUser.id)
      : false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Silakan berikan rating.");
      return;
    }
    setLoading(true);
    try {
      const response = await authFetch(
        `/api/user/product/${productId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ rating, review: reviewText }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Review berhasil dikirim.");
        // Pastikan objek review baru memiliki properti user
        const newReview = data.review;
        if (!newReview.user && currentUser) {
          newReview.user = currentUser;
        }
        setReviews((prev) => [newReview, ...prev]);
        setRating(0);
        setReviewText("");
      } else {
        throw new Error(data.message || "Gagal mengirim review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Terjadi kesalahan saat mengirim review.");
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (review) => {
    setEditingReviewId(review.id);
    setEditRating(review.rating);
    setEditText(review.review);
  };

  const cancelEditing = () => {
    setEditingReviewId(null);
    setEditRating(0);
    setEditText("");
  };

  const handleEditSubmit = async (reviewId) => {
    if (editRating === 0) {
      toast.error("Silakan berikan rating.");
      return;
    }
    setLoading(true);
    try {
      const response = await authFetch(`/api/user/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ rating: editRating, review: editText }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Review berhasil diperbarui.");
        // Pastikan objek review yang diupdate memiliki properti user
        const updatedReview = data.review;
        if (!updatedReview.user && currentUser) {
          updatedReview.user = currentUser;
        }
        setReviews((prev) =>
          prev.map((rev) => (rev.id === reviewId ? updatedReview : rev))
        );
        cancelEditing();
      } else {
        throw new Error(data.message || "Gagal memperbarui review.");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Terjadi kesalahan saat memperbarui review.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus review ini?")) return;
    setLoading(true);
    try {
      const response = await authFetch(`/api/user/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Review berhasil dihapus.");
        setReviews((prev) => prev.filter((rev) => rev.id !== reviewId));
      } else {
        throw new Error(data.message || "Gagal menghapus review.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Terjadi kesalahan saat menghapus review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Review Produk</h2>
      {token && eligible && !hasReviewed ? (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-medium mb-4">Berikan Penilaian Anda</h3>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <FaStar
                  className={`text-2xl ${
                    (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Tulis review Anda..."
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {loading ? "Mengirim..." : "Kirim Review"}
          </button>
        </form>
      ) : token && eligible && hasReviewed ? (
        <p className="mb-8 text-gray-600">
          Anda sudah memberikan review. Anda dapat mengedit atau menghapus review Anda.
        </p>
      ) : null}

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow mb-4">
            {editingReviewId === review.id ? (
              <div>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                      onMouseEnter={() => setEditHoverRating(star)}
                      onMouseLeave={() => setEditHoverRating(0)}
                    >
                      <FaStar
                        className={`text-lg ${
                          (editHoverRating || editRating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full border p-3 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditSubmit(review.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-lg ${review.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-3 text-sm text-gray-600">
                    {review.user?.name || "Unknown"}
                  </span>
                </div>
                <p className="text-gray-800">{review.review}</p>
                {token && currentUser && review.user?.id === currentUser.id && (
                  <div className="mt-2 flex gap-3">
                    <button onClick={() => startEditing(review)} className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:underline">
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">Belum ada review untuk produk ini.</p>
      )}
    </div>
  );
};

export default ProductReview;
