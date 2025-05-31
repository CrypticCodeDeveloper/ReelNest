import {createContext, useState} from "react";

export const SearchContext = createContext(null)

const SearchProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <SearchContext.Provider value={{isOpen, setIsOpen}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider;
