import { Navigation,  A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import {useSuspenseQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const MediaSlider = ({className, title, queryKey, queryFn, mediaType}) => {

    const navigate = useNavigate()

    const {data: medias} = useSuspenseQuery({
        queryKey,
        queryFn,
        select: (data) => data.results
    })


    return (
        <div className={`select-none p-4 ${className}`}>
            {title && <h1 className="text-lg sm:text-xl capitalize font-semibold mb-3">{title}</h1>}
            <Swiper
                modules={[Navigation,  A11y]}
                spaceBetween={10}
                slidesPerView={6}
                navigation
                scrollbar={{ draggable: true }}
                className="h-[280px]"
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 }
                }}
            >
                {
                    medias.map((media) => {

                        const {id, poster_path, original_title} = media
                        const poster =  poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` :
                            `/no-poster.png`

                        return (
                                <SwiperSlide
                                    key={id}
                                    className="!flex items-end relative overflow-hidden hover:*:scale-110"
                                    onClick={
                                        () => navigate(`/details/${mediaType}/${id}`)
                                    }
                                >
                                    {/*<div className="w-full h-full bg-black/20 absolute -z-0"></div>*/}
                                    <img src={poster}
                                         className="w-full h-full object-cover absolute -z-10 transition-all"
                                         alt={original_title} />
                                </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}
export default MediaSlider
