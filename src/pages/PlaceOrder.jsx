import { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { FiArrowDown } from "react-icons/fi";

const PlaceOrder = () => {
  useEffect(() => {
    document.title = "AS Denim - Pembayaran";
  });

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = "SB-Mid-client-gVNayamvrFo-fuwt"; // Ganti dengan client key Anda

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);

  const {
    navigate,
    cartItems,
    authFetch,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const response = await authFetch("/api/user/addresses");
        if (response.ok) {
          const addresses = await response.json();
          const defaultAddr = addresses.find((addr) => addr.is_default);
          if (defaultAddr) {
            setDefaultAddress(defaultAddr);
          } else {
            toast.error(
              "Anda belum memiliki alamat default. Silakan tambahkan alamat di halaman alamat."
            );
            navigate("/dashboard/addresses");
          }
        } else {
          toast.error("Gagal mengambil data alamat.");
          navigate("/dashboard/addresses");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Terjadi kesalahan saat mengambil data alamat.");
        navigate("/dashboard/addresses");
      }
    };

    fetchDefaultAddress();
  }, [authFetch, navigate]);

  useEffect(() => {
    if (defaultAddress && cartItems.length > 0) {
      fetchShippingOptions();
    }
  }, [defaultAddress, cartItems]);

  const fetchShippingOptions = async () => {
    if (!defaultAddress) return;

    const totalWeight = cartItems.reduce((total, item) => {
      return total + item.productData.weight * item.qty;
    }, 0);

    try {
      const response = await authFetch(`/api/calculate-shipping-cost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Kita tidak perlu mengirim 'origin' dari frontend jika sudah ditetapkan di backend
          destination: defaultAddress.postal_code,
          weight: totalWeight,
          // jne:pos:tiki:sicepat:ide:sap:jnt:ninja:lion:anteraja:ncs:rex:rpx:sentral:star:wahana,
          courier:
            "jne:pos:tiki:sicepat:ide:sap:jnt:ninja:lion:anteraja:ncs:rex:rpx:sentral:star:wahana",
          price: "lowest",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setShippingOptions(data);
      } else {
        toast.error("Gagal mengambil opsi pengiriman.");
        console.error("Response error:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching shipping options:", error);
      toast.error("Terjadi kesalahan saat mengambil opsi pengiriman.");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!defaultAddress) {
      toast.error("Alamat pengiriman tidak tersedia.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Keranjang belanja Anda kosong.");
      return;
    }

    if (!selectedShippingOption) {
      toast.error("Silakan pilih metode pengiriman.");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const payload = {
        cartItems: cartItems.map((item) => ({
          product_id: item.productData.id,
          qty: item.qty,
        })),
        address_id: defaultAddress.id,
        shipping_option: selectedShippingOption, // Tambahkan ini
      };

      const response = await authFetch("/api/midtrans/snap-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Terjadi kesalahan.");
      }

      const data = await response.json();
      const snapToken = data.snapToken;

      const snapContainer = document.getElementById("snap-container");
      if (!snapContainer) {
        console.error("Snap container not found.");
        setIsProcessing(false);
        return;
      }

      if (window.snap.isOpen) {
        window.snap.hide();
      }

      window.snap.embed(snapToken, {
        embedId: "snap-container",
        onSuccess: function () {
          toast.success("Pembayaran berhasil!");
          clearCart();
          navigate("/payment-success", {state: {paymentSuccess: true}});
        },
        onPending: function () {
          toast.info("Pembayaran tertunda.");
          clearCart();
        },
        onError: function () {
          toast.error("Pembayaran gagal.");
        },
        onClose: function () {
          toast.warn("Transaksi dibatalkan.");
        },
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error(
        error.message || "Terjadi kesalahan saat memproses pembayaran."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Fungsi untuk menambah kuantitas
  const handleIncreaseQuantity = (cartItem) => {
    const newQty = cartItem.qty + 1;
    updateQuantity(cartItem.id, newQty);
  };

  // Fungsi untuk mengurangi kuantitas
  const handleDecreaseQuantity = (cartItem) => {
    const newQty = cartItem.qty - 1;
    if (newQty > 0) {
      updateQuantity(cartItem.id, newQty);
    } else {
      removeFromCart(cartItem.id);
    }
  };

  // Fungsi untuk menghapus item dari keranjang
  const handleRemoveItem = (cartItem) => {
    removeFromCart(cartItem.id);
  };

  return (
    <div className="pt-24 sm:pt-36 min-h-screen flex flex-col">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-between gap-8 mx-4 sm:mx-16"
      >
        {/* Left side: Address and Cart Items */}
        <div className="flex flex-col gap-6 w-full sm:w-2/3">
          {/* Shipping Address */}
          <div>
            <Title text1={"Alamat"} text2={"Pengiriman"} />
            {defaultAddress ? (
              <div className="border border-gray-300 p-4 rounded mt-4">
                <p className="font-semibold">{defaultAddress.recipient_name}</p>
                <p>{defaultAddress.phone_number}</p>
                <p>{defaultAddress.address_line1}</p>
                {defaultAddress.address_line2 && (
                  <p>{defaultAddress.address_line2}</p>
                )}
                <p>
                  {defaultAddress.city}, {defaultAddress.province},{" "}
                  {defaultAddress.postal_code}
                </p>
                {/* <p>Nomor HP: {defaultAddress.phone_number}</p> */}
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/addresses")}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Ubah Alamat
                </button>
              </div>
            ) : (
              <p className="mt-4">Memuat alamat...</p>
            )}
          </div>

          {/* Cart Items */}
          <div>
            <Title text1={"Produk"} text2={"Pesanan"} />
            {cartItems.length > 0 ? (
              <div className="border border-gray-300 p-4 rounded mt-4">
                <ul className="space-y-4">
                  {cartItems.map((cartItem) => (
                    <li key={cartItem.id} className="flex items-center">
                      <img
                        src={
                          cartItem.productData.images?.[0]?.image
                            ? `/storage/${cartItem.productData.images[0].image}`
                            : "fallback-image-url"
                        }
                        alt={
                          cartItem.productData.product_name || "Product image"
                        }
                        className="w-20 h-20 object-cover mr-4 rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-lg">
                          {cartItem.productData.product_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Ukuran: {cartItem.productData.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          Berat: {cartItem.productData.weight} gram
                        </p>
                        <p className="text-sm text-gray-600">
                          Harga: Rp{" "}
                          {(
                            cartItem.productData.sale_price ||
                            cartItem.productData.original_price
                          ).toLocaleString()}
                        </p>
                        {/* Quantity controls */}
                        <div className="flex items-center mt-2">
                          <button
                            type="button"
                            onClick={() => handleDecreaseQuantity(cartItem)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-t border-b">
                            {cartItem.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleIncreaseQuantity(cartItem)}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* Remove item button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(cartItem)}
                        className="text-red-500 hover:text-red-600 ml-4"
                      >
                        Hapus
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-4">Keranjang belanja Anda kosong.</p>
            )}
          </div>
        </div>

        {/* Right side: Shipping options and Payment method */}
        <div className="w-full sm:w-1/3">
          <div className="mb-8">
            <CartTotal
              shippingCost={
                selectedShippingOption ? selectedShippingOption.cost : 0
              }
            />
          </div>

          {/* Shipping Options */}
          <div>
            <Title text1={"Metode"} text2={"Pengiriman"} />
            {shippingOptions.length > 0 ? (
              <div className="relative mt-4">
                <div className="max-h-60 overflow-y-auto pr-2 border border-gray-200 rounded">
                  {shippingOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 border-b border-gray-100 last:border-b-0"
                    >
                      <input
                        type="radio"
                        name="shippingOption"
                        id={`shippingOption-${index}`}
                        value={index}
                        onChange={() => setSelectedShippingOption(option)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={`shippingOption-${index}`}
                        className="ml-3 text-sm leading-tight"
                      >
                        <span className="font-medium">
                          {option.name} - {option.service}
                        </span>
                        <br />
                        <span className="text-gray-600 text-xs">
                          {option.description}
                        </span>
                        <br />
                        <span className="text-gray-800 font-semibold">
                          Biaya: Rp {option.cost.toLocaleString()}
                        </span>
                        <br />
                        <span className="text-gray-600 text-xs">
                          Estimasi: {option.etd}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                {/* Indikator scroll */}
                <div className="mt-2 flex items-center justify-center text-gray-500 text-xs space-x-1">
                  <span>Geser ke bawah untuk melihat lebih banyak opsi</span>
                  <FiArrowDown className="animate-bounce" />
                </div>
              </div>
            ) : (
              <p className="mt-4">Memuat opsi pengiriman...</p>
            )}

            <div className="w-full text-center mt-8">
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white px-4 py-3 text-lg rounded disabled:opacity-50"
                disabled={!defaultAddress || isProcessing}
              >
                {isProcessing ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </div>
          </div>

          {/* Payment Widget */}
          <div id="snap-container" className="w-full mt-8"></div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
