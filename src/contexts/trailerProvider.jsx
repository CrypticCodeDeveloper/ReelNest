import {createContext, useState} from 'react';

export const TrailerContext = createContext(null)

const TrailerProvider = ({children}) => {

    const [isTrailerPopupOpen, setIsTrailerPopupOpen] = useState(false);
    const [trailer, setTrailer] = useState(null);

    return (
        <TrailerContext.Provider value={{isTrailerPopupOpen, setIsTrailerPopupOpen, trailer, setTrailer}}>
            {children}
        </TrailerContext.Provider>
    )
}
export default TrailerProvider
