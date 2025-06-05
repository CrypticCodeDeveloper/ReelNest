import {useSuspenseQuery} from "@tanstack/react-query";
import {getDiscoverMovies, searchMedia} from "../api.js";
import SearchCardDisplay from "../components/search-card-display.jsx";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";

import {MdOutlineLocalMovies, MdOutlineMovie, MdOutlinePeopleAlt} from "react-icons/md";

import PersonCardDisplay from "../components/person-card-display.jsx";

import GeneralBackdrop from "../components/general-backdrop.jsx";
import NoSearchFound from "../components/no-search-found.jsx";
import FilterSearch from "../components/filter-search.jsx";

const Search = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search") || "";
    const [currentFilterValue, setCurrentFilterValue] = useState("movie")


    const {data: medias} = useSuspenseQuery({
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

            <GeneralBackdrop backdrop_path={backdrop_path}/>

            {/* Search display */}
            <div
                className="relative z-10 flex max-lg:flex-col-reverse
                max-lg:items-center justify-center gap-12 max-lg:gap-8 px-8">

                <div className="">

                    <h1 className="text-sm uppercase tracking-wide">
                        {searchTerm ?
                            `Showing Matches for "${searchTerm}"`
                            : "No search Term"}
                    </h1>

                    <div className="h-[1px] w-full bg-neutral-400 mt-2 mb-6"></div>
                    {
                        medias?.length > 0 ? <div className="grid gap-10">
                            {
                                medias.map((media) => (
                                    <>
                                        {
                                            currentFilterValue === "person" ?
                                                <PersonCardDisplay person={media}/> :
                                                <SearchCardDisplay
                                                    type={currentFilterValue}
                                                    media={media}
                                                />
                                        }
                                    </>
                                ))
                            }
                        </div> : <NoSearchFound/>

                    }
                </div>

                {/* Filter movies */}
                <FilterSearch
                    currentFilterValue={currentFilterValue}
                    filters={filters}
                    setCurrentFilterValue={setCurrentFilterValue}
                />

            </div>

            {/*  Search display end  */}
        </div>
    );
}
export default Search
