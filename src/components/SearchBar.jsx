import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(AppContext);
    const [visible, setVisible] = useState(false);  // Set visible to true by default

    const location = useLocation();
    useEffect(() => {
        // Ensure that the search bar remains visible if location includes 'collection'
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }

    }, [location, setShowSearch]);

    return showSearch && visible ? (
        <div className='border-t border-b  text-center pt-20'>
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='flex-1 outline-none bg-inherit text-sm'
                    type="text"
                    placeholder='Cari'
                />
                <img className='w-4 cursor-pointer' src={assets.search_icon} alt="search icon" />
            </div>
            <img
                onClick={() => setShowSearch(false)}
                className='inline w-3 cursor-pointer'
                src={assets.cross_icon}
                alt="close icon"
            />
        </div>
    ) : null;
};

export default SearchBar;
