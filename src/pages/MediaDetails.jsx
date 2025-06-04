import {useSuspenseQuery} from "@tanstack/react-query";
import {getMediaDetails, getSimilarMedias, getRecommendedMedias} from "../api.js";
import {useParams} from "react-router-dom";
import PosterActions from "../components/movie-details/poster-actions.jsx";
import {useContext} from "react";
import {TrailerContext} from "../contexts/trailerProvider.jsx";
import StarRate from "../components/star-rate.jsx";

import Gallery from "../components/movie-details/gallery.jsx";
import MediaSlider from "../components/media-slider.jsx";
import MediaBackdrop from "../components/movie-details/media-backdrop.jsx";
import OtherMediaDetails from "../components/movie-details/other-media-details.jsx";
import EpisodeSeasonCard from "../components/movie-details/episode-season-card.jsx";

import TrailerPopup from "../components/trailer-popup.jsx";
import toast from "react-hot-toast"


const MediaDetails = () => {
    const {media: mediaType, id} = useParams();
    const {isTrailerPopupOpen, setIsTrailerPopupOpen} = useContext(TrailerContext);

    const {data: mediaDetails} = useSuspenseQuery({
        queryKey: ["details", mediaType, id],
        queryFn: getMediaDetails,
    });


    // Destructure all important details
    const {
        backdrop_path, overview,
        genres = [], tagline, origin_country = [], original_language, revenue, runtime,
        vote_average, credits, production_companies, images = {},
        number_of_episodes, number_of_seasons, status: seriesStatus,
        last_episode_to_air, next_episode_to_air, seasons = [], similar,
        recommendations, videos: {results: videos},
    } = mediaDetails;

    const poster_path = mediaDetails.poster_path ?`https://image.tmdb.org/t/p/original/${mediaDetails.poster_path}` : '/no-poster.png';

    // Explicitly declare inconsistent variable across media types
    const title = mediaType === "movie" ? mediaDetails.title : mediaDetails.name;
    const release_date = mediaType === "movie" ? mediaDetails.release_date : mediaDetails.first_air_date;

    const last_season = seasons.length > 0 ? seasons[seasons.length - 1] : null;


    const trailerKey = videos.find(video => video.name.toLowerCase().includes("trailer"))?.key || videos[0]?.key;


    // Media details
    const otherDetails = [
        {
            name: "Premiere",
            value: release_date,
        }, {
            name: "Country",
            value: origin_country[0] || "N/A",
        }, {
            name: "Language",
            value: original_language,
        }, {
            name: mediaType === "movie" ? "Revenue" : "Episodes",
            value: mediaType === "movie" ? `$${revenue}` : `${number_of_episodes}`,
        }, {
            name: mediaType === "movie" ? "Runtime" : "Seasons",
            value: mediaType === "movie" ? `${runtime}` : `${number_of_seasons}`,
        },
    ];

    return (
        <>
            <div className="min-h-screen w-full flex-center pb-5 relative">
                {/*Trailer Popup*/}
                {isTrailerPopupOpen && trailerKey && <TrailerPopup
                    videoKey={trailerKey}
                    title={`${mediaType === "movie" ? "Movie" : "TV"} Trailer - ${title}`}/>}

                {/*   Backdrop section*/}
                <MediaBackdrop
                    backdrop_path={backdrop_path}
                    title={title}
                    playTrailer={() => {
                        if (trailerKey) {
                            setIsTrailerPopupOpen(true)
                        } else {
                            toast.error("Trailer is not available for this media.")
                        }
                    }}/>
                {/*    section ended*/}

                {/*    Details*/}
                <div className="w-[80%]  mt-[40vh]">

                    <div className="border-b border-neutral-300 w-full flex-between pb-3">
                        <h1
                            className="text-2xl font-medieval-sharp"
                        >{title} ({release_date.split('-')[0]})</h1>
                    </div>

                    <div className="mt-4 flex gap-5 max-lg:flex-col">

                        <PosterActions poster_path={poster_path}/>

                        <div className="w-full">
                            {/*    More media info */}
                            <section
                                className="flex max-sm:flex-col w-full justify-between gap-6 border-b border-neutral-400 pb-5">

                                <div>
                                    <h1 className="text-2xl font-medieval-sharp">{title}
                                        {
                                            mediaType === "tv" && (
                                                <div
                                                    className="text-xs flex items-center gap-4 border-l
                                                 px-4 border-neutral-500">
                                                    <p>{seriesStatus}</p>
                                                </div>
                                            )
                                        }
                                    </h1>
                                    <p className="text-sm  text-neutral-200 mt-2">{tagline}</p>

                                    {/**/}
                                    <div
                                        className="border-t border-b border-neutral-600 w-full py-1 mt-3 flex items-center gap-4">
                                        <p className="max-sm:text-xs">{(vote_average / 2).toFixed(2)} </p>
                                        <StarRate vote_average={parseInt(vote_average).toFixed(1)} star_size="10px"/>
                                        {/* genres */}
                                        <div className="text-xs flex items-center gap-4">
                                            {
                                                genres.slice(0, 2).map((genre, index) => (
                                                    <span key={index}>{genre.name}</span>
                                                ))
                                            }
                                        </div>
                                        {/*    genres end*/}
                                        {/* Tv show stats   */}

                                    </div>

                                    {/* Other movie details - casts, production companies ...    */}
                                    <OtherMediaDetails
                                        otherDetails={otherDetails}
                                        credits={credits}
                                        production_companies={production_companies}
                                    />

                                </div>

                                {/*Gallery - Media images*/}
                                {
                                    images.backdrops.length > 0 && <Gallery images={images.backdrops}/>
                                }
                            </section>
                            {/*  More media info ends  */}

                            <div className="mt-5">

                                <h2 className="text-2xl font-medieval-sharp">Storyline</h2>
                                <p className="mt-4 text-neutral-400 max-lg:text-sm">
                                    {overview ? overview : "No storyline available for this media."}
                                </p>

                            </div>
                        </div>

                    </div>


                    {/*Extra information about shows */}
                    {
                        mediaType === "tv" && (
                            <div className="mt-12 flex items-center gap-8 pb-5 overflow-x-auto">

                                {/*Card - Current Season */}
                                {last_season && <EpisodeSeasonCard
                                    title="Current Season"
                                    type="season"
                                    image={last_season.poster_path}
                                    name={last_season.name}
                                    poster_path={poster_path}
                                    date={last_season.air_date}
                                    number={last_season.season_number}
                                    overview={last_season.overview}
                                />}
                                {/*    End of Card*/}

                                {/*Card - Last episode*/}
                                {last_episode_to_air && <EpisodeSeasonCard
                                    title="Last Episode"
                                    type="episode"
                                    image={last_episode_to_air.still_path}
                                    name={last_episode_to_air.name}
                                    poster_path={poster_path}
                                    date={last_episode_to_air.air_date}
                                    number={last_episode_to_air.episode_number}
                                    overview={last_episode_to_air.overview}
                                />}
                                {/*    End of Card*/}

                                {/*Card - Next- episode*/}
                                {next_episode_to_air && <EpisodeSeasonCard
                                    title="Next Episode"
                                    image={next_episode_to_air.still_path}
                                    name={next_episode_to_air.name}
                                    poster_path={poster_path}
                                    date={next_episode_to_air.air_date}
                                    number={next_episode_to_air.episode_number}
                                    overview={next_episode_to_air.overview}
                                />}
                                {/*    End of Card*/}


                            </div>
                        )
                    }


                </div>

            </div>

            {/*Recommendations and similar section*/}
            <div className="md:px-16 mb-6">

                {/*Recommended Movies*/}
                {
                    recommendations?.results.length > 0 && <div className="mt-10">
                        <div className="mt-4">
                            <MediaSlider
                                title="AI Picked For You"
                                mediaType={mediaType}
                                queryKey={
                                    [`recommended-${mediaType}`, id]
                                }
                                queryFn={
                                    () => getRecommendedMedias(mediaType, id)
                                }
                            />
                        </div>
                    </div>
                }

                {/*    Similar Movies */}
                {
                    similar?.results.length > 0 && <div className="mt-6">
                        <div className="mt-4">
                            <MediaSlider
                                title={`More ${mediaType === "movie" ? "Movies" : "TV Shows"} Like This`}
                                mediaType={mediaType}
                                queryKey={
                                    [`similar-${mediaType}`, id]
                                }
                                queryFn={
                                    () => getSimilarMedias(mediaType, id)
                                }
                            />
                        </div>
                    </div>
                }

            </div>
        </>
    );
}
export default MediaDetails;

