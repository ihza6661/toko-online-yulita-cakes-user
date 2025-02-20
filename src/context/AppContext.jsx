import { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("token") || null
  );
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const currency = "Rp. ";
  const delivery_fee = 0;
  const navigate = useNavigate();

  // Inactivity timeout in milliseconds (e.g., 15 minutes)
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  let inactivityTimer = null;

  // Function to reset inactivity timer
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      handleLogout(); // Log out the user after inactivity
      toast.info("Sesi Anda telah berakhir karena tidak ada aktivitas.");
    }, INACTIVITY_TIMEOUT);
  };

  // Function to handle logout
  const handleLogout = useCallback(async() => {
    try {
      const response = await authFetch("http://127.0.0.1:8000/api/user/logout", {
        method: "POST"
      });

      if(!response.ok){
        console.error("Logout API error:", await response.text());
      }
    } catch (error){
      console.error("Error saat logout:", error);
    } finally{
      updateToken(null);
      setCartItems([]);
      navigate("/login");
      toast.success("Anda berhasil keluar");
    }
  }, [navigate]);

  // Function to update token and store it in sessionStorage
  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      sessionStorage.setItem("token", newToken);
    } else {
      sessionStorage.removeItem("token");
    }
  };

  // Function to fetch data with authentication header
  const authFetch = useCallback(
    async (url, options = {}) => {
      const defaultHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const mergedOptions = {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      };

      try {
        const response = await fetch(url, mergedOptions);

        if (response.status === 401) {
          // Unauthorized, token might be expired or invalid
          handleLogout();
          toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
        }

        return response;
      } catch (error) {
        console.error("Network error:", error);
        toast.error("Terjadi kesalahan jaringan. Silakan coba lagi.");
        throw error;
      }
    },
    [token, handleLogout]
  );

  // Function to fetch cart items
  const fetchCartItems = useCallback(async () => {
    try {
      const response = await authFetch("/api/user/shopping_cart");

      const data = await response.json();

      if (response.ok) {
        const transformedCartItems = data.map((item) => ({
          id: item.id,
          product_id: item.product_id,
          qty: item.qty,
          size: item.size,
          productData: item.product,
        }));
        setCartItems(transformedCartItems);
      } else {
        toast.error(data.message || "Gagal mengambil data keranjang");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Terjadi kesalahan saat mengambil data keranjang");
    }
  }, [authFetch]);

  // Effect to initialize event listeners for user activity
  useEffect(() => {
    if (token) {
      fetchCartItems();

      // List of events that indicate user activity
      const activityEvents = [
        "click",
        "mousemove",
        "keydown",
        "scroll",
        "touchstart",
      ];

      // Reset inactivity timer on any of these events
      activityEvents.forEach((eventName) => {
        window.addEventListener(eventName, resetInactivityTimer);
      });

      // Start the inactivity timer
      resetInactivityTimer();

      // Cleanup event listeners on unmount
      return () => {
        activityEvents.forEach((eventName) => {
          window.removeEventListener(eventName, resetInactivityTimer);
        });
        clearTimeout(inactivityTimer);
      };
    } else {
      setCartItems([]);
    }
  }, [token, fetchCartItems]);

  // Function to add item to cart
  const addToCart = useCallback(
    async (itemId, size, quantity = 1) => {
      try {
        const response = await authFetch("/api/user/shopping_cart", {
          method: "POST",
          body: JSON.stringify({
            product_id: itemId,
            qty: quantity,
            size: size,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Produk berhasil ditambahkan ke keranjang");
          fetchCartItems();
        } else {
          toast.error(data.message || "Gagal menambahkan produk ke keranjang");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Terjadi kesalahan saat menambahkan produk ke keranjang");
      }
    },
    [authFetch, fetchCartItems]
  );

  // Function to update item quantity in cart
  const updateQuantity = useCallback(
    async (cartItemId, qty) => {
      try {
        const response = await authFetch(`/api/user/shopping_cart/${cartItemId}`, {
          method: "PUT",
          body: JSON.stringify({
            qty: qty,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Jumlah produk berhasil diperbarui");
          fetchCartItems();
        } else {
          toast.error(data.message || "Gagal mengupdate jumlah produk");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
        toast.error("Terjadi kesalahan saat mengupdate jumlah produk");
      }
    },
    [authFetch, fetchCartItems]
  );

  // Function to remove item from cart
  const removeFromCart = useCallback(
    async (cartItemId) => {
      try {
        const response = await authFetch(`/api/user/shopping_cart/${cartItemId}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Produk berhasil dihapus dari keranjang");
          fetchCartItems();
        } else {
          toast.error(data.message || "Gagal menghapus produk dari keranjang");
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Terjadi kesalahan saat menghapus produk dari keranjang");
      }
    },
    [authFetch, fetchCartItems]
  );

  // Function to clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Function to get total item count in cart
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  // Function to get total cart amount
  const getCartAmount = () => {
    return cartItems.reduce((total, cartItem) => {
      const price = cartItem.productData?.sale_price || 0;
      return total + price * cartItem.qty;
    }, 0);
  };

  // Values provided to the entire app through context
  const value = {
    token,
    setToken: updateToken,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    getCartAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    navigate,
    handleLogout,
    authFetch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
