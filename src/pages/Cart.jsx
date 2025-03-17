import { useContext, useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  useEffect(() => {
    document.title = "Sweet Treats - Keranjang";
  }, []);

  const { currency, cartItems, updateQuantity, removeFromCart, navigate } =
    useContext(AppContext);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center text-center pt-36">
        <Title text1={"Keranjang"} text2={"Anda"} />
        <p className="text-gray-500 text-lg py-10">Keranjang belanja kosong.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10">
      <div className="text-center">
        <Title text1={"Keranjang"} text2={"Anda"} />
      </div>

      {/* Cart Container */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 mt-6">
        {cartItems.map((item) => {
          const productData = item.productData;

          if (!productData) {
            return (
              <div key={item.id} className="text-center text-gray-500 py-4">
                <p>Produk tidak ditemukan.</p>
              </div>
            );
          }

          // Jika sale_price bernilai 0, gunakan original_price sebagai harga final
          const finalPrice =
            Number(productData.sale_price) === 0
              ? Number(productData.original_price)
              : Number(productData.sale_price);

          return (
            <div
              key={item.id}
              className="py-4 border-b text-gray-700 flex flex-col sm:flex-row items-center gap-6 text-center"
            >
              {/* Image & Product Details */}
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                <img
                  className="w-20 h-20 object-cover rounded-lg shadow"
                  src={
                    productData.images?.[0]?.image
                      ? `/storage/${productData.images[0].image}`
                      : "fallback-image-url"
                  }
                  alt={productData.product_name || "Product image"}
                />
                <div>
                  <p className="text-lg font-medium">
                    {productData.product_name}
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <p className="text-lg font-semibold text-pink-600">
                      {currency}
                      {finalPrice.toLocaleString("id-ID")}
                    </p>
                    {item.size && (
                      <p className="px-3 py-1 border bg-pink-100 text-pink-600 rounded-md">
                        {item.size}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="flex items-center gap-4 justify-center">
                <input
                  onChange={(e) => {
                    const qty = Number(e.target.value);
                    updateQuantity(item.id, qty > 0 ? qty : 1);
                  }}
                  className="border text-center w-12 px-2 py-1 rounded-md shadow"
                  type="number"
                  min={1}
                  value={item.qty}
                />
                {/* Delete Button */}
                <img
                  onClick={() => removeFromCart(item.id)}
                  className="w-5 cursor-pointer transition-transform duration-200 hover:scale-110"
                  src={assets.bin_icon}
                  alt="Hapus Produk"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Section */}
      <div className="w-full max-w-3xl flex flex-col items-center my-10">
        <div className="w-full sm:w-[450px] p-6 bg-white shadow-lg rounded-2xl">
          <CartTotal />

          <div className="w-full flex justify-center">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg my-6 px-8 py-3 shadow transition duration-200"
            >
              LANJUT KE PEMBAYARAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
