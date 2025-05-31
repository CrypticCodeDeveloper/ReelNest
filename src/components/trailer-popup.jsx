import React, { useContext } from 'react';
import { TrailerContext } from '../contexts/trailerProvider';
import { FaTimes } from 'react-icons/fa';
import ReactPlayer from "react-player";

const TrailerPopup = ({title, videoKey}) => {
    const { isTrailerPopupOpen, setIsTrailerPopupOpen } = useContext(TrailerContext);

    if (!isTrailerPopupOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="relative glass rounded-lg w-[80%] max-w-[800px] p-4">
               <div className="flex-between">
                   {/*Title*/}
                   <h1 className="font-semibold text-xl max-w-[500px]  truncate">
                       {title ? title : "Play Video"}
                   </h1>
                   {/* Close Icon */}
                   <button
                       className="absolute top-3 right-3 text-white text-xl hover:text-gray-400"
                       onClick={() => setIsTrailerPopupOpen(false)}
                   >
                       <FaTimes />
                   </button>
               </div>

                <div className="w-full h-0 pb-[56.25%] relative mt-8">
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white">
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${videoKey}`}
                            width="100%"
                            height="100%"
                            controls
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailerPopup;