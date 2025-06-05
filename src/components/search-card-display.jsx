import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const SearchCardDisplay = ({ media, type }) => {

    const navigate = useNavigate();

    const { poster_path, overview} = media;

    const title = type === "movie" ? media.title : media.name;
    const release_year = type === "movie" ? media.release_date.split("-")[0] : media.first_air_date.split("-")[0];

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const poster = poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : "/no-poster.png";

    return (
        <>
            <div className="flex gap-3">

                <div
                    onClick={() => navigate(`/details/${type}/${media.id}`)}
                    className="w-[120px] h-[150px] min-w-[120px] min-h-[150px] border border-neutral-400 overflow-hidden hover:*:scale-110 cursor-pointer">
                    <img className="h-full w-full object-cover aspect-auto transition-all" src={poster} alt={title}/>
                </div>

                <div className="">
                    <h1 className="mb-2 flex gap-3">
                        <span
                            onClick={() => navigate(`/details/${type}/${media.id}`)}
                            className="font-bold text-sm md:text-lg max-w-[400px] max-sm:max-w-[200px]
                             hover:text-primary cursor-pointer"
                        >{title}</span>
                        <span className="text-lg md:text-xl font-thin">{release_year}</span>
                    </h1>
                    <p className="text-xs max-w-[500px] text-neutral-300">
                        {isExpanded ? overview : `${overview.slice(0, 150)}...`}
                        {overview.length > 150 && (
                            <span
                                className="text-primary cursor-pointer"
                                onClick={toggleReadMore}
                            >
                            {isExpanded ? ' show less' : ' read more'}
                        </span>
                        )}
                    </p>
                </div>
            </div>
            <div className="h-[1px] w-full bg-neutral-500"></div>
        </>
    );
};

export default SearchCardDisplay;
