import React from 'react'

const GeneralBackdrop = ({
    backdrop_path
                         }) => {
    return (
        <div className="h-[60vh] w-full fixed top-0 -z-30">
            {/*Overlay*/}
            <div className="w-full h-full bg-black/70 absolute"></div>
            <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                 className="w-full h-full object-cover" alt=""/>
            <div
                className="h-[60px] w-full bottom-0 absolute bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,1)]"></div>
        </div>
    )
}
export default GeneralBackdrop
