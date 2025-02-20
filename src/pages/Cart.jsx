import { useContext, useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { AppContext } from "../context/AppContext";

const Cart = () => {
  useEffect(() => {
    document.title = "AS Denim - Keranjang";
  }, []);

  const { currency, cartItems, updateQuantity, removeFromCart, navigate } =
    useContext(AppContext);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-2xl mb-3 pt-36">
        <Title text1={"Keranjang"} text2={"Anda"} />
        <p className="text-center py-10">Keranjang belanja kosong.</p>
      </div>
    );
  }

  return (
    <div className="border-t">
      <div className="text-2xl mb-3 pt-36">
        <Title text1={"Keranjang"} text2={"Anda"} />
      </div>
      <div>
        {cartItems.map((item) => {
          const productData = item.productData;

          if (!productData) {
            return (
              <div key={item.id}>
                <p>Produk tidak ditemukan.</p>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={
                    productData.images?.[0]?.image
                      ? `/storage/${productData.images[0].image}`
                      : "fallback-image-url"
                  }
                  alt={productData.product_name || "Product image"}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.product_name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {Number(productData.sale_price).toLocaleString("id-ID")}
                    </p>
                    {item.size && (
                      <p className="px-2 sm:px-3 md:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => {
                  const qty = Number(e.target.value);
                  if (qty > 0) {
                    updateQuantity(item.id, qty);
                  } else {
                    updateQuantity(item.id, 1);
                  }
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                value={item.qty}
              />
              <img
                onClick={() => removeFromCart(item.id)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Hapus Produk"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />

          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
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
