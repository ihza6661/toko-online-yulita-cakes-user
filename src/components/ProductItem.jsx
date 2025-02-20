import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductItem = ({
  image = "/placeholder.jpg",
  name = "Unknown Product",
  originalPrice = 0,
  salePrice = null,
  slug = null,
  stock = 1,
}) => {
  const isOutOfStock = stock === 0;

  // Cek apakah ada diskon
  const hasDiscount = salePrice !== null && salePrice < originalPrice;
  const discountPercentage = hasDiscount
    ? (((originalPrice - salePrice) / originalPrice) * 100).toFixed(2)
    : 0;

  const productContent = (
    <>
      {/* Container gambar dengan tinggi tetap */}
      <div className="relative overflow-hidden rounded-lg w-full">
        {/* Badge diskon dengan z-index agar tetap terlihat */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 z-20 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Diskon {discountPercentage}%
          </span>
        )}
        <img
          className="w-full h-full object-cover transition-transform ease-in-out duration-300 hover:scale-105"
          src={image}
          alt={name}
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <span className="text-white text-sm font-bold">Stok Habis</span>
          </div>
        )}
      </div>
      {/* Nama Produk */}
      <p className="pt-3 pb-1 text-sm font-semibold text-center">{name}</p>
      {/* Harga Produk */}
      <div className="flex flex-col items-center">
        {hasDiscount ? (
          <>
            <p className="text-xs text-gray-500 line-through">
              Rp{originalPrice.toLocaleString("id-ID")}
            </p>
            <p className="text-sm font-medium text-green-600">
              Rp{salePrice.toLocaleString("id-ID")}
            </p>
          </>
        ) : (
          <p className="text-sm font-medium text-green-600">
            Rp{originalPrice.toLocaleString("id-ID")}
          </p>
        )}
      </div>
    </>
  );

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-96">
      {slug ? (
        <Link className="text-gray-700 w-full cursor-pointer" to={`/product/${slug}`}>
          {productContent}
        </Link>
      ) : (
        <div className="text-gray-700 w-full">{productContent}</div>
      )}
    </div>
  );
};

ProductItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  originalPrice: PropTypes.number,
  salePrice: PropTypes.number,
  slug: PropTypes.string,
  stock: PropTypes.number,
};

export default ProductItem;
