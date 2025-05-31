import React from 'react'

const EpisodeSeasonCard = ({
    image,
    name,
    number,
    date,
    poster_path,
    overview,
    title,
    type
                           }) => {
    return (
        <div>
            <h1 className="text-xl mb-3">{title}</h1>
            <div className="w-[500px] h-[200px]  rounded-md glass flex shadow-xl overflow-hidden ">

                <div className="w-[180px] min-w-[150px] h-full ">
                    <img
                        src={image ? `https://image.tmdb.org/t/p/original/${image}` : poster_path}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-5 overflow-y-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-lg font-medieval-sharp">{name}</h2>
                    </div>
                    <div className="text-xs flex items-center gap-2">
                        <p >{date}</p>
                        <p className="font-semibold">{type} {number}</p>
                    </div>
                    <p className="mt-2 text-xs text-neutral-200">{overview}</p>
                </div>
            </div>
        </div>
    )
}
export default EpisodeSeasonCard
