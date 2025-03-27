import { useEffect, useState } from "react";
import Title from "./Title";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-2 transform -translate-y-1/2 
                 text-white text-4xl cursor-pointer z-10 
                 hover:scale-110 transition-all duration-300 drop-shadow-lg"
      onClick={onClick}
    >
      <FaArrowCircleRight
        className="bg-pink-500 dark:bg-[#3B0D28] rounded-full p-1 
                                     hover:bg-pink-700 dark:hover:bg-[#621640] 
                                     transition-colors duration-300 
                                     shadow-lg shadow-pink-500/50 dark:shadow-[#3B0D28]/50 
                                     hover:shadow-pink-700/60 dark:hover:shadow-[#621640]/60"
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-2 transform -translate-y-1/2 
                 text-white text-4xl cursor-pointer z-10 
                 hover:scale-110 transition-all duration-300 drop-shadow-lg"
      onClick={onClick}
    >
      <FaArrowCircleLeft
        className="bg-pink-500 dark:bg-[#3B0D28] rounded-full p-1 
                                    hover:bg-pink-700 dark:hover:bg-[#621640] 
                                    transition-colors duration-300 
                                    shadow-lg shadow-pink-500/50 dark:shadow-[#3B0D28]/50 
                                    hover:shadow-pink-700/60 dark:hover:shadow-[#621640]/60"
      />
    </div>
  );
}

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user/get_categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const slidesToShow = categories.length < 3 ? categories.length : 3;
  const autoplay = categories.length > 3;

  const sliderSettings = {
    dots: false,
    infinite: categories.length > Math.min(slidesToShow, 4),
    speed: 600,
    slidesToShow: Math.min(slidesToShow, 4),
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    centerMode: true, // Ensures the active item is centered
    variableWidth: false, // Keeps consistent item sizes
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, centerMode: false } },
      { breakpoint: 1024, settings: { slidesToShow: 3, centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerMode: true } },
    ],
  };

  return (
    <div className="pt-2 pb-10 px-4 sm:px-6 lg:px-12 xl:px-20">
      {/* Title */}
      <div className="text-center text-2xl pb-6">
        <Title text1={"Kategori"} text2={"Kue"} />
      </div>

      {/* Loading & Error Messages */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat kategori...</p>
      ) : error ? (
        <p className="text-center text-red-500">
          Terjadi kesalahan saat mengambil data.
        </p>
      ) : (
        <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
          {/* Centered Slider Wrapper */}
          <div className="flex justify-center">
            <Slider {...sliderSettings} className="w-full max-w-5xl">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-center px-2 sm:px-4 lg:px-5"
                  onClick={() =>
                    navigate("/collection", {
                      state: { selectedCategory: category.category_name },
                    })
                  }
                >
                  {/* Category Card */}
                  <div
                    className="cursor-pointer group flex flex-col items-center p-4 pt-8
            bg-white dark:bg-gray-900 backdrop-blur-md rounded-3xl
            border border-gray-300 dark:border-gray-700 
  shadow-sm
            transform transition-all duration-300
          w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px]"
                  >
                    {/* Image */}
                    <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mb-3 overflow-hidden rounded-full border-4 border-pink-300 shadow-lg">
                      <img
                        src={`/storage/${category.image}`}
                        alt={category.category_name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Category Name */}
                    <p className="text-lg font-semibold text-pink-700 text-center mt-2 group-hover:text-pink-900 transition-colors duration-300">
                      {category.category_name}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
