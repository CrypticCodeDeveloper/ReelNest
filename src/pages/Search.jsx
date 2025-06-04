import {useSuspenseQuery} from "@tanstack/react-query";
import {getDiscoverMovies, searchMedia} from "../api.js";
import SearchCardDisplay from "../components/search-card-display.jsx";
import React from "react";
import {useLocation} from "react-router-dom";

const Search = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("search") || "";

    const {data: movies } = useSuspenseQuery({
        queryKey: ["search", "movie", searchTerm],
        queryFn: () => {
            if (searchTerm) {
                return searchMedia("movie", searchTerm)
            } else {
                return getDiscoverMovies;
            }
        },
        select: (data) => data.results
    })

    const backdrop_path = movies.find((movie) => movie?.backdrop_path !== null)?.backdrop_path

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
            <div className="relative z-10 flex justify-center gap-12 px-8">
                <div className="">
                    <h1 className="text-sm uppercase tracking-wide">{searchTerm ? `Showing Matches for "${searchTerm}"` : "Most searched movies"}</h1>
                    <div className="h-[1px] w-full bg-neutral-400 mt-2 mb-6"></div>
                    <div className="grid gap-10">
                        {
                            movies.map((movie) => (
                                <>
                                    <SearchCardDisplay
                                        movie={movie}
                                    />
                                </>
                            ))
                        }
                    </div>
                </div>

                {/*Filter search*/}
                <div className="hidden lg:block h-[85vh] w-[340px] glass ml-3 p-4">
                    <h2 className="uppercase font-bold">Show results for</h2>
                </div>
            </div>
            {/*  Search display end  */}
        </div>
    );
}
export default Search
