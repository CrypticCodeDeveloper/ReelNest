import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import SearchProvider from "../contexts/searchProvider.jsx";

const MainLayout = () => {
    return (
        <>
            <SearchProvider>
                <Navbar/>
            </SearchProvider>
            <Outlet/>
        </>
    );
}

export default MainLayout