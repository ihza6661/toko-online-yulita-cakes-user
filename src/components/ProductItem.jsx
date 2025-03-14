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
  const hasDiscount = salePrice !== null && salePrice < originalPrice;
  const discountPercentage = hasDiscount
    ? (((originalPrice - salePrice) / originalPrice) * 100).toFixed(0)
    : 0;

  const productContent = (
    <>
      {/* Product Card with Taller Height */}
      <div className="relative overflow-hidden rounded-2xl w-full shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col h-[340px]">
        
        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 z-20 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            -{discountPercentage}%
          </span>
        )}

        {/* Product Image */}
        <div className="relative">
          <img
            className="w-full h-56 object-contain transition-transform duration-300 hover:scale-105 rounded-t-2xl"
            src={image}
            alt={name}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-sm font-bold">Stok Habis</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col flex-grow p-4 text-center">
          <p className="text-md font-semibold text-gray-800 flex-grow">{name}</p>
          
          {/* Pricing */}
          <div className="mt-auto">
            {hasDiscount ? (
              <div>
                <p className="text-xs text-gray-500 line-through">
                  Rp{originalPrice.toLocaleString("id-ID")}
                </p>
                <p className="text-sm font-bold text-red-600">
                  Rp{salePrice.toLocaleString("id-ID")}
                </p>
              </div>
            ) : (
              <p className="text-sm font-bold text-green-600">
                Rp{originalPrice.toLocaleString("id-ID")}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="w-full h-auto">

      {slug ? (
        <Link to={`/product/${slug}`} className="block">
          {productContent}
        </Link>
      ) : (
        <div>{productContent}</div>
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
