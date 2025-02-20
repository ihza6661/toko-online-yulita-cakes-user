import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { getCartCount, token, setToken, setCartItems, authFetch, handleLogout } =
    useContext(AppContext);
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
    <div className="flex items-center justify-between px-8 py-5 font-medium h-20 bg-white fixed top-0 left-0 w-full z-50 border border-gray-300 shadow-sm md:px-32">
      {/* Logo */}
      <div className="flex flex-col">
        <Link to="/" className="logo flex-col">
          <img src={assets.as_logo} className="w-36" alt="Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, index) => (
          <NavLink
            to={path}
            key={index}
            className="flex flex-col items-center gap-1"
          >
            <p className="hover:text-black transition-all duration-300">
              {["BERANDA", "KOLEKSI", "TENTANG KAMI", "KONTAK"][index]}
            </p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
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
                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileDropdown(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm hover:text-black transition-all"
            >
              Masuk
            </Link>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="w-5 cursor-pointer"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white aspect-square rounded-full text-[8px]">
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
        className={`fixed top-0 right-0 bottom-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out transform ${
          sidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 999 }}
      >
        <div className="flex flex-col text-gray-600">
          {/* Back Button */}
          <div
            onClick={() => setSidebarVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back Icon"
            />
            <p>Kembali</p>
          </div>

          {/* Sidebar Links */}
          {["/", "/collection", "/about", "/contact"].map((path, index) => (
            <NavLink
              key={index}
              onClick={() => setSidebarVisible(false)}
              className="py-2 pl-6 border"
              to={path}
            >
              {["BERANDA", "KOLEKSI", "TENTANG KAMI", "KONTAK"][index]}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
