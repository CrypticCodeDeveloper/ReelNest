import React from 'react'

const PosterActions = ({poster_path}) => {
    return (
        <div className="max-w-[400px]">
            <div className="w-full min-w-[180px] h-[300px]">
                <img src={poster_path}
                     className="w-full h-full object-cover" alt="" />
            </div>
            <button className="w-full h-[50px] glass mt-4 hover:bg-white/20 transition-all">
                Show Comments
            </button>
        </div>
    )
}
export default PosterActions
