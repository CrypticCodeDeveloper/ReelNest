import {useState, useContext} from "react";
import {SearchContext} from "../contexts/searchProvider.jsx";
import { CiSearch, CiCircleRemove  } from "react-icons/ci";

const Search = () => {

    const {isOpen, setIsOpen} = useContext(SearchContext)

    return (
        <div className="flex items-center gap-3">
            <div
                onClick={() => setIsOpen(true)}
                className={`flex items-center gap-3 ${isOpen && 'px-5'} glass p-2 rounded-full text-white cursor-pointer  ${!isOpen && 'hover:bg-white/30'} transition-all`}
            >

                {isOpen &&
                    <input type="text" placeholder="movies, shows, people ... "
                           className="focus:outline-none placeholder:text-gray-100 text-xs sm:text-sm max-sm:max-w-[70px]"/>}

                <CiSearch className="size-5"/>

            </div>
            {isOpen && <CiCircleRemove
                onClick={() => setIsOpen(false)}
                className="size-9"/>}
        </div>
    );
}
export default Search
