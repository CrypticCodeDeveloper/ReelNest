import React from 'react'
import {FaPlay} from "react-icons/fa";

const MediaBackdrop = ({
    backdrop_path, title, playTrailer
                       }) => {
    return (
        <div className="h-[60vh]  w-full absolute flex-center top-0"
        >
            {/*Play trailer button*/}
            <div
                className="text-primary p-5 rounded-full text-sm  glass hover:bg-white/20 transition-all cursor-pointer"
                onClick={playTrailer}
            >
                <FaPlay/>
            </div>
            {/*Overlay*/}
            <div className="w-full h-full bg-black/30 absolute -z-10"></div>
            {/**/}
            <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                 className="w-full h-full object-cover absolute -z-20" alt="" />
            <div
                className="h-[60px] w-full bottom-0 -z-20 absolute bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,1)]"></div>
        </div>
    )
}
export default MediaBackdrop
