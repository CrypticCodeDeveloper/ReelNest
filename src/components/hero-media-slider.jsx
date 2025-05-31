import { Navigation, Pagination,  A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {useNavigate} from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {useSuspenseQuery} from "@tanstack/react-query";
import {getDiscoverMovies} from "../api.js";
import StarRate from "./star-rate.jsx";

import { FaPlay, FaRegBookmark  } from "react-icons/fa";

import {useContext} from "react";
import {TrailerContext} from "../contexts/trailerProvider.jsx";
import TrailerPopup from "./trailer-popup.jsx";

import {useState} from "react";
import {useMediaQuery} from "react-responsive"

const HeroMediaSlider = () => {

    const navigate = useNavigate()
    const {isTrailerPopupOpen, setIsTrailerPopupOpen} = useContext(TrailerContext);

    const isMobile = useMediaQuery({
        maxWidth: 768,
    })


    const [movieTitle, setMovieTitle] = useState(null);

    const {data: movies} = useSuspenseQuery({
        queryKey: ["discover-movies"],
        queryFn: getDiscoverMovies,
        select: (data) => data.results
    })


    return (
        <div className="max-h-screen max-sm:max-h-[60vh] bg-black select-none">

            {/*Trailer Popup*/}
            {isTrailerPopupOpen && <TrailerPopup title={`Play Trailer - ${movieTitle}`}/>}

            {/* Hero Slider */}
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                className="max-sm:h-[60vh]"
            >
                {
                    movies.map((movie) => {

                        const {id, backdrop_path, original_title, overview, vote_average} = movie

                        return (
                            <SwiperSlide key={id} className="h-full !flex items-center relative">


                                <div className="w-full h-full bg-black/20 absolute -z-0"></div>

                                <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                                     className="w-full h-full object-cover absolute -z-10" alt={original_title}/>

                                <div className="px-10 sm:px-14 lg:px-16 xl:px-20 z-10">

                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl max-w-[600px] text-white font-semibold font-medieval-sharp">{original_title}</h1>
                                    <
                                        div className="mt-4 flex items-center gap-3">

                                        <StarRate vote_average={vote_average} star_size={isMobile ? '14px' :'20px'}  />

                                        <p className="text-primary text-xl max-sm:2xl font-bold font-medieval-sharp">{(vote_average / 2).toFixed(1)}</p>
                                    </div>
                                    <p className="text-white max-w-[650px] mt-8 line-clamp-2 max-sm:text-sm">{overview}</p>

                                    {/*  Buttons  */}
                                    <div className="mt-6 flex items-center gap-8">
                                        <button
                                            onClick={() => {
                                                navigate(`/details/movie/${id}`)
                                            }}
                                            className="flex items-center gap-2 btn px-8">
                                            View Details</button>
                                        
                                        <div className="flex items-center">
                                            <button
                                                className="btn bg-green-800"
                                                onClick={() => {
                                                    setMovieTitle(original_title)
                                                    setIsTrailerPopupOpen(true)
                                                }}
                                            >
                                                <FaPlay />
                                            </button>
                                            <button className="btn bg-green-600">
                                                <FaRegBookmark />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>
        </div>
    )
}
export default HeroMediaSlider
