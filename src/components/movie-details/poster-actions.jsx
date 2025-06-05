import React from 'react'
import {CommentSection} from "../comment-section.jsx";

const PosterActions = ({poster_path}) => {
    return (
        <div className="max-w-[400px]">
            <div className="w-full min-w-[180px] h-[300px]">
                <img src={poster_path}
                     className="w-full h-full object-cover" alt="" />
            </div>
            <CommentSection />
        </div>
    )
}
export default PosterActions
