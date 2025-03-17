import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Search, X } from "lucide-react"; // Import Lucide icons

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b text-center pt-20">
      <div className="inline-flex items-center justify-center border border-pink-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Cari"
        />
        <Search className="w-5 h-5 text-pink-500 cursor-pointer" />
      </div>
      <X
        onClick={() => setShowSearch(false)}
        className="inline w-5 h-5 text-gray-600 cursor-pointer" // Lucide Close Icon
      />
    </div>
  ) : null;
};

export default SearchBar;
