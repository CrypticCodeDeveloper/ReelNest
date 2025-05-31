import React from 'react'
import HeroMediaSlider from "../components/hero-media-slider.jsx";
import MediaSlider from "../components/media-slider.jsx";

//
import {getMoviesTrending, getShowsTrending} from "../api.js";

const Home = () => {
    return (
        <div>
            <HeroMediaSlider />
            <div className="mt-5">
                <MediaSlider
                    title="TV shows trending today"
                    queryKey={
                        ["today-shows"]
                    }
                    queryFn={getShowsTrending}
                    mediaType="tv"
                />
                <MediaSlider
                    title="Everyone's Watching"
                    queryKey={
                    ["popular-movies"]
                    }
                    queryFn={getMoviesTrending}
                    mediaType="movie"
                />
            </div>
        </div>
    )
}
export default Home
