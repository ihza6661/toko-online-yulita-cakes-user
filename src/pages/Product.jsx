import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Product = () => {
  const { slug } = useParams();
  const { addToCart } = useContext(AppContext);
  const [productData, setProductData] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  function stripHtmlTags(str) {
    if (!str) {
      return "";
    }
    return str.replace(/<[^>]*>?/gm, "");
  }

  const fetchProductData = async () => {
    try {
      const response = await fetch(`/api/user/product/${slug}/detail`);
      if (!response.ok) {
        throw new Error("Produk tidak ditemukan.");
      }
      const data = await response.json();
      if (data.product) {
        const product = data.product;
        setProductData(product);
        setImages(product.images.map((image) => `/storage/${image.image}`));
        setSelectedImage(`/storage/${product.images[0]?.image}`);
      } else {
        setProductData(null);
        console.error("Produk tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!productData) {
    return <p>Produk tidak ditemukan.</p>;
  }

  const handleAddToCart = () => {
    addToCart(productData.id.toString());
  };

  return (
    <div className="border-t-2 pt-36 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Bagian Gambar Produk */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {images.map((item, index) => (
              <img
                key={index}
                onClick={() => setSelectedImage(item)}
                src={item}
                alt={`Product ${index + 1}`}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                  selectedImage === item ? "border-2 border-black" : ""
                }`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={selectedImage}
              alt={productData.product_name}
            />
          </div>
        </div>

        {/* Bagian Detail Produk */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {productData.product_name}
          </h1>
          {productData.original_price === productData.sale_price && (
            <p className="mt-5 text-3xl font-medium ">
              Rp{productData.original_price.toLocaleString("id-ID")}
            </p>
          )}
          {productData.original_price > productData.sale_price && (
            <p className="mt-5 text-2xl text-gray-500 font-medium line-through">
              Rp{productData.original_price.toLocaleString("id-ID")} 
            </p>
          )}
          {productData.original_price > productData.sale_price && (
            <span className="mt-5 text-1xl bg-red-500 font-medium">
              Diskon {(((productData.original_price - productData.sale_price) / productData.original_price) * 100).toFixed(2)} %
            </span>
          )}
          {productData.original_price !== productData.sale_price && (
            <p className="mt-5 text-3xl font-medium ">
              Rp{productData.sale_price.toLocaleString("id-ID")}
            </p>
          )}
          

          {/* Informasi Ukuran dan Stok Produk */}
          <div className="flex flex-col gap-4 my-8">
            <p>Ukuran:</p>
            <div className="flex gap-2">
              <span
                className="px-4 py-2 border bg-black text-white"
                style={{ cursor: "default" }}
              >
                {productData.size}
              </span>
            </div>
            <p>Stok: {productData.stock}</p>
          </div>

          {/* Tombol Tambah ke Keranjang */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            Tambah ke Keranjang
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Produk Original</p>
          </div>
        </div>
      </div>

      {/* Bagian Deskripsi Produk */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Deskripsi</b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{stripHtmlTags(productData.description)}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
