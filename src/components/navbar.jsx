import {navLinks} from "../constants/index.jsx";
import {NavLink} from "react-router-dom";
import Search from "./search.jsx";
import {useContext} from "react";
import {SearchContext} from "../contexts/searchProvider.jsx";
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const {isOpen} = useContext(SearchContext)
    const navigate = useNavigate()

    return (
        <nav className="h-[64px] glass text-white fixed top-0 w-full z-50 border-b border-gray-300 flex-between px-8">
            {/*Logo*/}
            <div
                onClick={() => navigate("/")}
            >
                <img src="/logo.png" width={100} alt="logo" />
            </div>
            {!isOpen && <div className="hidden lg:flex items-center gap-12">
                {navLinks.map((link) => (
                    <NavLink to={link.href}
                             key={link.name}
                             className={({isActive}) =>
                                 isActive ? "text-primary font-semibold" :
                                     "transition-all hover:scale-110"}
                    >{link.name}</NavLink>
                ))}
            </div>}
            <Search />
        </nav>
    )
}
export default Navbar
