import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { useLocation } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";

const Collection = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(AppContext);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const [category, setCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");
  const [filterProducts, setFilterProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const baseImageUrl = "/storage/";

  useEffect(() => {
    document.title = "Yulita Cakes - Koleksi";
  }, []);

  // Reset search state on component mount
  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  // Set or reset category based on location.state
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setCategory([location.state.selectedCategory]);
    } else {
      setCategory([]); // Reset category when there's no selectedCategory
      setShowFilter([]);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/user/get_products");
        const data = await response.json();
        const formattedProducts = data.map((item) => {
          const primaryImage = item.images.find((img) => img.is_primary === 1);
          return {
            id: item.id,
            name: item.product_name,
            original_price: item.original_price,
            sale_price: item.sale_price,
            image:
              baseImageUrl +
              (primaryImage ? primaryImage.image : item.images[0].image),
            category: item.category.category_name,
            description: item.description,
            slug: item.slug,
            stock: item.stock, // Menambahkan properti stok
          };
        });
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleFilter = (value, filterType) => {
    if (filterType === "category") {
      setCategory((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (filterType === "subCategory") {
      setSubCategory((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const applyFiltersAndSort = () => {
    let filteredProducts = [...products];

    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        category.includes(item.category)
      );
    }

    // Sorting products
    switch (sortType) {
      case "low-high":
        filteredProducts.sort((a, b) => a.sale_price - b.sale_price);
        break;
      case "high-low":
        filteredProducts.sort((a, b) => b.sale_price - a.sale_price);
        break;
      default:
        break;
    }

    setFilterProducts(filteredProducts);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [category, subCategory, search, showSearch, sortType, products]);

  const uniqueCategories = [...new Set(products.map((item) => item.category))];

  return (
    <div className="container mx-auto px-4 py-6">
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-0 sm:pt-6 mt-10 pb-10 px-2">
      
      {/* Sticky Sidebar */}
      <div className="min-w-60 pt-8 sm:pt-20 sm:sticky top-0 sm:h-screen overflow-hidden">


        <p className=" text-lg text-pink-900 flex items-center gap-2 cursor-pointer">
          CARI
          <FontAwesomeIcon
            onClick={() => setShowSearch(true)}
            icon={faSearch}
            className="cursor-pointer text-gray-700 dark:text-gray-400"
          />  
        </p>
        <p
          className="my-2 text-lg text-pink-900 flex items-center gap-2 cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTER
          <FontAwesomeIcon
            icon={faArrowRight}
            className={`h-6 sm:hidden cursor-pointer text-gray-700 dark:text-gray-400 ${
              showFilter ? "rotate-90" : ""
            } transform transition-transform duration-300`}
          />
        </p>
  
        {/* Search and Filter Controls */}
        <div
          className={`p-6 mb-5 rounded-xl bg-pink-50 dark:bg-gray-900 shadow-sm transition-all ${
            showFilter ? "" : "hidden sm:block"
          }`}
        >
          <h3 className="mb-4 text-lg font-semibold tracking-wide">KATEGORI</h3>
  
          <div className="flex flex-col gap-3 text-md font-medium text-gray-700">
            {uniqueCategories.map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer text-gray-700 dark:text-gray-400"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-pink-600 cursor-pointer"
                  value={item}
                  checked={category.includes(item)}
                  onChange={() => toggleFilter(item, "category")}
                />
                <span className="hover:text-pink-700 transition-all">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
  
        <hr />
      </div>
  
      {/* Product Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 px-4">
          <Title text1={"SEMUA"} text2={"PRODUK ✨"} />
  
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 py-2 w-48 h-10 rounded-md 
            bg-gradient-to-r from-pink-500 to-pink-700 text-gray-200 shadow-md"
          >
            <option value="relevent" className="text-black">
              Urutkan: Paling Sesuai
            </option>
            <option value="low-high" className="text-black">
              Urutkan: Harga Terendah
            </option>
            <option value="high-low" className="text-black">
              Urutkan: Harga Tertinggi
            </option>
          </select>
        </div>
  
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item.id}
              name={item.name}
              originalPrice={item.original_price}
              salePrice={item.sale_price}
              image={item.image}
              slug={item.slug}
              stock={item.stock}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Collection;
