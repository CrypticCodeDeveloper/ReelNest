import {useSuspenseQuery} from "@tanstack/react-query";
import {getDiscoverMovies, searchMedia} from "../api.js";
import SearchCardDisplay from "../components/search-card-display.jsx";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";

import { MdOutlineLocalMovies, MdOutlineMovie, MdOutlinePeopleAlt  } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import {useMediaQuery} from "react-responsive";

const Search = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search") || "";
    const [currentFilterValue, setCurrentFilterValue] = useState("movie")

    const isMobile = useMediaQuery({
        maxWidth: 767
    })

    const [searchFilterVisible, setSearchFilterVisible] = useState(!isMobile)

    const {data: medias } = useSuspenseQuery({
        queryKey: ["search", currentFilterValue, searchTerm],
        queryFn: () => {
            if (searchTerm) {
                return searchMedia(currentFilterValue, searchTerm)
            } else {
                return getDiscoverMovies;
            }
        },
        select: (data) => data.results
    })

    const backdrop_path = medias.find((media) => media?.backdrop_path !== null)?.backdrop_path ||
        medias.find((media) => media?.profile_path !== null)?.profile_path || null;

    const filters = [
        {
            value: "movie",
            label: "Movie",
            icon: MdOutlineMovie
        },
        {
            value: "tv",
            label: "TV Shows",
            icon: MdOutlineLocalMovies
        },
        {
            value: "person",
            label: "Casts & Crews",
            icon: MdOutlinePeopleAlt
        }
    ]

    return (
        <div className="w-full mt-[16vh] pb-10">

            {/*Backdrop*/}
            <div className="h-[60vh] w-full fixed top-0 -z-30">
                {/*Overlay*/}
                <div className="w-full h-full bg-black/70 absolute"></div>
                <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                     className="w-full h-full object-cover" alt=""/>
                <div
                    className="h-[60px] w-full bottom-0 absolute bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,1)]"></div>
            </div>

            {/* Search display */}
            <div className="relative z-10 flex max-lg:flex-col-reverse max-lg:items-center justify-center gap-12 max-lg:gap-8 px-8">
                <div className="">
                    <h1 className="text-sm uppercase tracking-wide">{searchTerm ? `Showing Matches for "${searchTerm}"` : "Most searched movies"}</h1>
                    <div className="h-[1px] w-full bg-neutral-400 mt-2 mb-6"></div>
                    <div className="grid gap-10">
                        {
                            medias.map((media) => (
                                <>
                                    {
                                        currentFilterValue === "person" ?
                                            <p>People</p> :
                                            <SearchCardDisplay
                                                type={currentFilterValue}
                                                media={media}
                                            />
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>

                {/*Filter search*/}
                <div className="flex flex-col items-center justify-between w-[340px]">

                    {/*mobile filter dropdown*/}
                    <div
                        onClick={() => setSearchFilterVisible(prevState => !prevState)}
                        className="h-[40px] w-full glass mb-3 hidden max-lg:flex items-center justify-between px-4 uppercase
                        hover:text-white/20 transition-all">
                        <p>Showing results for <span className="font-semibold">{currentFilterValue}</span></p>
                        {searchFilterVisible ? < IoMdClose /> : <FaCaretDown />}
                    </div>
                    {/**/}

                    {searchFilterVisible && <div className="h-[85vh] w-full glass ml-3 p-4">
                        <h2 className="uppercase font-bold">Show results for</h2>
                        <div className="mt-4 space-y-1">
                            {
                                filters.map((filter) => (
                                    <span key={filter.value}
                                          onClick={() => setCurrentFilterValue(filter.value)}
                                          className={`flex items-center gap-2 text-lg p-1 cursor-pointer 
                                      ${currentFilterValue === filter.value && 'glass'}`}
                                    >
                                    < filter.icon/>
                                        {filter.label}
                                </span>
                                ))
                            }
                        </div>
                    </div>}

                </div>
            </div>
            {/*  Search display end  */}
        </div>
    );
}
export default Search
