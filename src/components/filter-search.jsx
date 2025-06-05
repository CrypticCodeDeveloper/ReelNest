import React, {useState} from 'react'

import {IoMdClose} from "react-icons/io";
import {FaCaretDown} from "react-icons/fa";

import {useMediaQuery} from "react-responsive";


const FilterSearch = ({
                          currentFilterValue,
                          setCurrentFilterValue,
                          filters
                      }) => {


    const isMobile = useMediaQuery({
        maxWidth: 767
    })

    const [searchFilterVisible, setSearchFilterVisible] = useState(!isMobile)

    return (
        <div className="flex flex-col items-center justify-between w-[340px]">

            {/*mobile filter dropdown*/}
            <div
                onClick={() => setSearchFilterVisible(prevState => !prevState)}
                className="h-[40px] w-full glass mb-3 hidden max-lg:flex items-center justify-between px-4 uppercase
                        hover:bg-white/20 transition-all">
                <p>Showing results for <span className="font-semibold">{currentFilterValue}</span></p>
                {searchFilterVisible ? < IoMdClose/> : <FaCaretDown/>}
            </div>


            {searchFilterVisible &&
                <div className="h-[85vh] w-full glass ml-3 p-4">
                    <h2 className="uppercase font-bold">Show results for</h2>
                    <div className="mt-4 space-y-1">
                        {
                            filters.map((filter) => (
                                <span key={filter.value}
                                      onClick={() => {
                                          setCurrentFilterValue(filter.value)
                                          setSearchFilterVisible(false)
                                      }}
                                      className={`flex items-center gap-2 text-lg p-1 cursor-pointer 
                                      ${currentFilterValue === filter.value && 'glass'}`}
                                >
                                    < filter.icon/>
                                    {filter.label}
                                </span>
                            ))
                        }
                    </div>
                </div>
            }

        </div>
    );
};

export default FilterSearch
