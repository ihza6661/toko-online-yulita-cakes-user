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
      className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-4xl cursor-pointer z-10 hover:scale-110 transition-all duration-300 drop-shadow-lg"
      onClick={onClick}
    >
      <FaArrowCircleRight className="bg-pink-500 rounded-full p-1 hover:bg-pink-700 transition-colors duration-300" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-4xl cursor-pointer z-10 hover:scale-110 transition-all duration-300 drop-shadow-lg"
      onClick={onClick}
    >
      <FaArrowCircleLeft className="bg-pink-500 rounded-full p-1 hover:bg-pink-700 transition-colors duration-300" />
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
    infinite: categories.length > slidesToShow,
    speed: 600,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: slidesToShow } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(2, slidesToShow) } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center text-2xl pb-4">
        <Title text1={"KATEGORI"} text2={"PRODUK"} />
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Memuat kategori...</p>
      ) : error ? (
        <p className="text-center text-red-500">Terjadi kesalahan saat mengambil data.</p>
      ) : (
        <Slider {...sliderSettings}>
          {categories.map((category) => (
            <div
              key={category.id}
              className="px-2"
              onClick={() =>
                navigate("/collection", {
                  state: { selectedCategory: category.category_name },
                })
              }
            >
              <div className="cursor-pointer group flex flex-col items-center p-4 bg-white/30 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-40 h-40 mb-2 overflow-hidden rounded-full border-4 border-pink-300 shadow-lg">
                  <img
                    src={`/storage/${category.image}`}
                    alt={category.category_name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-lg font-semibold text-pink-700 text-center mt-2 group-hover:text-pink-900 transition-colors duration-300">
                  {category.category_name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Categories;
