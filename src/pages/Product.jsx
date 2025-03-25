import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import ProductReview from "../components/ProductReview";
import LatestCollection from "../components/LatestColletion";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { slug } = useParams();
  const { addToCart } = useContext(AppContext);
  const [productData, setProductData] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    document.title = "Yulita Cakes - Produk";
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/user/product/${slug}/detail`);
        if (!response.ok) throw new Error("Produk tidak ditemukan.");
        const data = await response.json();
        if (data.product) {
          setProductData(data.product);
          const imageUrls = data.product.images.map(
            (img) => `/storage/${img.image}`
          );
          setImages(imageUrls);
          setSelectedImage(imageUrls[0]);
        } else {
          setProductData(null);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center mt-20 text-pink-400 font-semibold">
        Loading...
      </p>
    );
  if (!productData)
    return (
      <p className="text-center mt-20 text-pink-400 font-semibold">
        Produk tidak ditemukan.
      </p>
    );

  return (
    <div className="pt-24 sm:pt-36 pb-10 border-t-2">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Image Gallery */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex flex-row sm:flex-col gap-4 sm:w-1/5">
              {images.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setSelectedImage(item)}
                  src={item}
                  alt={`Product ${index + 1}`}
                  className="w-20 sm:w-full rounded-lg cursor-pointer border-2 border-transparent hover:border-pink-400 transition"
                />
              ))}
            </div>
            <div className="flex-1">
              <img
                className="w-full rounded-lg shadow-md object-cover border"
                src={selectedImage}
                alt={productData.product_name}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 p-6 bg-white shadow-md rounded-xl">
            <h1 className="text-4xl font-bold mb-3 text-gray-800">
              {productData.product_name}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-semibold text-pink-900">
                Rp{" "}
                {(
                  productData.sale_price ?? productData.original_price
                ).toLocaleString("id-ID")}
              </p>
              {productData.sale_price !== null &&
                productData.original_price !== productData.sale_price && (
                  <p className="text-lg text-gray-500 line-through">
                    Rp {productData.original_price.toLocaleString("id-ID")}
                  </p>
                )}
            </div>

            <p className="mt-2 text-gray-400 font-medium">
              Stok: <span className="font-semibold">{productData.stock}</span>
            </p>

            <button
              onClick={() => addToCart(productData.id.toString())}
              className="mt-5 bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-3 rounded-full hover:bg-pink-500 transition duration-300 ease-in-out hover:shadow-md hover:scale-105"
            >
              Tambah ke Keranjang
            </button>

            {/* Description & Reviews */}
            <div className="mt-6 rounded-xl shadow bg-white border border-slate-300 overflow-hidden">
              <div className="flex border-b">
                <button
                  className={`relative px-6 py-3 text-sm font-medium flex-1 transition text-gray-600 hover:text-gray-900 ${
                    activeTab === "description"
                      ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-pink-400"
                      : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Deskripsi
                </button>
                <button
                  className={`relative px-6 py-3 text-sm font-medium flex-1 transition text-gray-600 hover:text-gray-900 ${
                    activeTab === "reviews"
                      ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-pink-400"
                      : ""
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Review
                </button>
              </div>

              <div className="p-6 text-gray-600">
                {activeTab === "description" ? (
                  <div
                    className="rounded-lg p-6"
                    dangerouslySetInnerHTML={{
                      __html: productData.description,
                    }}
                  />
                ) : (
                  <ProductReview productId={productData.id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts category={productData.category_id} />
    </div>
  );
};

export default Product;
