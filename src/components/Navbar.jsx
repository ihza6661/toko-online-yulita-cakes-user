import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft } from "lucide-react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import DarkModeToggle from "./ui/DarkModeToggle";

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const {
    getCartCount,
    token,
    setToken,
    setCartItems,
    authFetch,
    handleLogout,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 p-4 ${
        isScrolled
          ? "py-2 sm:py-3 shadow-md bg-gray-100 dark:bg-black md:dark:bg-black/50 md:backdrop-blur-lg"
          : " py-4 sm:py-4  shadow-md bg-gray-100/50 dark:bg-black/50"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col">
          <Link
            to="/"
            className="text-xl font-serif font-bold text-pink-600 dark:text-pink-400 px-2"
          >
            Yulita Cakes
            {/* <img
              src="/yulita_cake.png"
              className="w-20 transition-transform transform hover:scale-110 
    dark:brightness-90 dark:contrast-125 dark:drop-shadow-lg"
              alt="Logo"
            /> */}
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden sm:flex gap-8 text-lg">
          {["/", "/collection", "/about", "/contact"].map((path, index) => (
            <NavLink
              to={path}
              key={index}
              className="flex flex-col items-center gap-2 group"
              isActive="text-gray-900 dark:text-gray-200"
              end
            >
              {({ isActive }) => (
                <>
                  <p
                    className={` text-gray-900 hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out font-semibold text-lg md:text-base whitespace-nowrap md:mr-5 ${
                      isActive ? "text-pink-700 dark:text-pink-400" : ""
                    }`}
                  >
                    {["Beranda", "Produk", "Lokasi Toko", "Kontak"][index]}
                  </p>
                  <div
                    className={`w-1/2 h-[2px] bg-pink-900 dark:bg-pink-400 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left ${
                      isActive ? "scale-x-100 bg-pink-900 dark:bg-pink-400" : ""
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Icons Section */}
        <div className="flex items-center gap-6">
          <DarkModeToggle />

          {/* User Icon with Dropdown */}
          <div className="relative" ref={profileRef}>
            {token ? (
              <>
                <FontAwesomeIcon
                  icon={faUser}
                  className="cursor-pointer text-xl text-gray-800 dark:text-gray-300"
                  onClick={() => setShowProfileDropdown((prev) => !prev)}
                />
                {showProfileDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#442231] border border-gray-200 dark:border-pink-800 rounded-md shadow-lg transition-opacity duration-200"
                    style={{ zIndex: 1000 }}
                  >
                    <div className="py-2 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-[#3B1E2E] dark:to-[#552839] rounded-lg shadow-md">
                      <Link
                        to="/dashboard"
                        onClick={() => setShowProfileDropdown(false)}
                        className="block px-4 py-2 font-semibold hover:bg-pink-300 dark:hover:bg-[#5A2A3A] hover:text-pink-900 dark:hover:text-white rounded-md transition"
                      >
                        🎂 Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left block px-4 py-2 font-semibold hover:bg-pink-300 dark:hover:bg-[#5A2A3A] hover:text-pink-900 dark:hover:text-white rounded-md transition"
                      >
                        🍰 Keluar
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="btn py-2 px-4">
                MASUK
              </Link>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="w-5 cursor-pointer text-gray-800 dark:text-gray-300"
            />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-pink-500 dark:bg-pink-600 text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>

          {/* Hamburger Menu Icon */}
          <img
            onClick={() => setSidebarVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden dark:invert"
            alt="menu icon"
          />
        </div>

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-full md:hidden glass shadow-xl transition-all duration-300 ease-in-out transform ${
            sidebarVisible ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ zIndex: 999 }}
        >
          <div className="fixed inset-0 w-full h-full flex flex-col p-6 bg-white/50 dark:bg-black/50 backdrop-blur-lg z-50">
            {/* Back Button */}
            <div
              onClick={() => setSidebarVisible(false)}
              className="flex items-center gap-4 p-3 cursor-pointer hover:bg-pink-200 dark:hover:bg-[#5A2A3A] rounded-lg transition-all duration-200 ease-in-out"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2]" />
              <p className="font-semibold">Kembali</p>
            </div>

            {/* Sidebar Links */}
            {["/", "/collection", "/about", "/contact"].map((path, index) => (
              <NavLink
                key={index}
                onClick={() => setSidebarVisible(false)}
                className="py-3 pl-6 border-b border-pink-300 dark:border-pink-800 hover:bg-pink-200 dark:hover:bg-[#5A2A3A] rounded-lg font-medium transition-all duration-200 ease-in-out"
                to={path}
              >
                {["BERANDA", "PRODUK", "LOKASI TOKO", "KONTAK"][index]}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
