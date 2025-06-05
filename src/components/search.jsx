import {useContext} from "react";
import {SearchContext} from "../contexts/searchProvider.jsx";
import { CiSearch, CiCircleRemove  } from "react-icons/ci";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import toast from "react-hot-toast"

const Search = () => {

    const navigate = useNavigate();
    const {isOpen, setIsOpen} = useContext(SearchContext)

    const searchRef = useRef(null);

    const searchMedia = () => {
        if (searchRef.current.value.trim() !== "" ){
            navigate(`/search?search=${searchRef.current.value}`)
            searchRef.current.value = ""
        } else {
            toast("Please input a search query", {

            })
        }
    }

    return (
        <div className="flex items-center gap-3">
            <div
                onClick={() => setIsOpen(true)}
                className={`flex items-center gap-3 ${isOpen && 'px-5'} glass p-2 rounded-full text-white cursor-pointer  ${!isOpen && 'hover:bg-white/30'} transition-all`}
            >

                {isOpen &&
                    <input type="text" placeholder="movies, shows, people ... "
                           ref={searchRef}
                           className="focus:outline-none placeholder:text-gray-400 text-xs sm:text-sm max-sm:max-w-[70px]"/>}

                <CiSearch className="size-5" onClick={() => isOpen && searchMedia()}/>

            </div>
            {isOpen && <CiCircleRemove
                onClick={() => setIsOpen(false)}
                className="size-9"/>}
        </div>
    );
}
export default Search
