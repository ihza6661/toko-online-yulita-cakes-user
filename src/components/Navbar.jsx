import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft } from "lucide-react";

import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

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
    <div className="navbar flex items-center justify-between px-8 py-5 font-medium h-20 fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-md bg-gradient-to-r from-pink-300 via-orange-200 to-yellow-300 md:px-32">
      {/* Logo */}
      <div className="flex flex-col">
        <Link to="/" className="logo flex-col">
          <img
            src="/yulita_cake.png"
            className="w-20 transition-transform transform hover:scale-110"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-8 text-lg text-gray-800">
        {["/", "/collection", "/about", "/contact"].map((path, index) => (
          <NavLink
            to={path}
            key={index}
            className="flex flex-col items-center gap-2 group"
            activeclassname="text-gray-900"
            end
          >
            {({ isActive }) => (
              <>
                <p
                  className={`text-gray-600 hover:text-gray-900 transition-colors duration-300 ease-in-out font-semibold text-lg md:text-base whitespace-nowrap md:mr-5 ${
                    isActive ? "text-pink-700" : ""
                  }`}
                >
                  {["BERANDA", "PRODUK", "LOKASI TOKO", "KONTAK"][index]}
                </p>
                <div
                  className={`w-1/2 h-[2px] bg-pink-700 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left ${
                    isActive ? "scale-x-100 bg-pink-700" : ""
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        {/* User Icon with Dropdown (berbasis click) */}
        <div className="relative" ref={profileRef}>
          {token ? (
            <>
              <FontAwesomeIcon
                icon={faUser}
                className="cursor-pointer text-xl"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
              />
              {showProfileDropdown && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg transition-opacity duration-200"
                  style={{ zIndex: 1000 }}
                >
                  <div className="py-2 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg shadow-md">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileDropdown(false)}
                      className="block px-4 py-2 text-pink-800 font-semibold hover:bg-pink-300 hover:text-pink-900 rounded-md transition"
                    >
                      🎂 Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-pink-800 font-semibold hover:bg-pink-300 hover:text-pink-900 rounded-md transition"
                    >
                      🍰 Keluar
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm text-gray-100 bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-2xl transition-all"
            >
              MASUK
            </Link>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="w-5 cursor-pointer"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-pink-500 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu Icon */}
        <img
          onClick={() => setSidebarVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu icon"
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full bg-gradient-to-tl from-pink-300 via-pink-200 to-pink-100 shadow-xl transition-all duration-300 ease-in-out transform ${
          sidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 999 }}
      >
        <div className="flex flex-col text-gray-600 p-6">
          {/* Back Button */}
          <div
            onClick={() => setSidebarVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer hover:bg-pink-200 rounded-lg transition-all duration-200 ease-in-out"
          >
            {/* <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back Icon" /> */}
            <ChevronLeft className="h-5 w-5 text-gray-800 stroke-[2]" />
            <p className="text-gray-800 font-semibold">Kembali</p>
          </div>

          {/* Sidebar Links */}
          {["/", "/collection", "/about", "/contact"].map((path, index) => (
            <NavLink
              key={index}
              onClick={() => setSidebarVisible(false)}
              className="py-3 pl-6 border-b border-gray-300 hover:bg-pink-200 rounded-lg text-gray-800 font-medium transition-all duration-200 ease-in-out"
              to={path}
            >
              {["BERANDA", "PRODUK", "LOKASI TOKO", "KONTAK"][index]}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
