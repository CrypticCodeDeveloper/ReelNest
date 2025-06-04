import React, { useState } from 'react';

const SearchCardDisplay = ({ movie }) => {
    const { title, poster_path, overview, release_date } = movie;
    const release_year = release_date.split("-")[0];
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const poster = poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : "/no-poster.png";

    return (
        <>
            <div className="flex gap-3">

                <div className="w-[120px] h-[120px] min-w-[120px] min-h-[120px] overflow-hidden hover:*:scale-110 cursor-pointer">
                    <img className="h-full w-full object-cover aspect-auto transition-all" src={poster} alt={title}/>
                </div>

                <div className="">
                    <h1 className="mb-2 flex gap-3">
                        <span className="font-bold text-sm md:text-lg max-w-[400px] max-sm:max-w-[200px]">{title}</span>
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
