import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductItem = ({
  image = "/placeholder.jpg",
  name = "Unknown Product",
  originalPrice = 0,
  salePrice = null,
  slug = null,
  stock = 1,
  label = null, // New prop for labels like "Bestseller"
}) => {
  const isOutOfStock = stock === 0;
  const hasDiscount = salePrice !== null && salePrice < originalPrice;
  const discountPercentage = hasDiscount
    ? (((originalPrice - salePrice) / originalPrice) * 100).toFixed(0)
    : 0;

    const productContent = (
      <div className="min-h-[18rem] sm:min-h-max relative bg-white dark:bg-[#101010] text-black dark:text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-[280px] xl:max-w-[300px] px-3 sm:p-4 transform hover:scale-105 gap-4">
        {/* Product Image */}
        <div className="relative flex justify-center items-center w-full aspect-[4/3] rounded-md mt-2 sm:mt-4">
          <img
            className="w-full h-full object-contain rounded-md opacity-90 dark:opacity-75 p-2"
            src={image}
            alt={name}
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
        </div>
    
        {/* Product Details */}
        <div className="flex flex-col flex-grow text-center">
          <p className="text-base sm:text-md font-semibold tracking-wide text-gray-700 dark:text-gray-400">
            {name}
          </p>
    
          {/* <p className="text-xs sm:text-xs text-gray-600 dark:text-gray-400 mt-1">
            {isOutOfStock ? "" : "Tersedia"}
          </p>
     */}
          {/* Pricing */}
          <div className="mt-1 sm:mt-2">
            {hasDiscount ? (
              <div>
                <p className="text-xs sm:text-xs text-gray-500 dark:text-gray-600 line-through">
                  Rp.{" "}
                  {originalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
                <p className="text-md sm:text-md font-bold text-pink-900 dark:text-gray-400">
                  Rp.{" "}
                  {salePrice.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
            ) : (
              <p className="text-md sm:text-lg font-bold text-pink-900">
                Rp.{" "}
                {originalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            )}
          </div>
    
          {/* Label (like Bestseller, Wedding, etc.) */}
          {label && (
            <span className="mt-2 px-3 py-1 text-xs sm:text-sm font-bold bg-pink-600 text-white rounded-full">
              {label}
            </span>
          )}
        </div>
      </div>
    );
    
    return (
      <div className="w-full flex justify-center">
        {slug ? (
          <Link to={`/product/${slug}`} className="block">
            {productContent}
          </Link>
        ) : (
          productContent
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
  label: PropTypes.string,
};

export default ProductItem;
