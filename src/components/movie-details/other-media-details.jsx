import {Avatar} from "antd";
import { FaUserCircle } from "react-icons/fa";
import { IoImageSharp } from "react-icons/io5";
import { BsArrowDownCircle } from "react-icons/bs";

const OtherMediaDetails = ({otherDetails, credits, production_companies}) => {
    return (
    <div className="mt-4 flex gap-14 max-xl:gap-9 max-sm:grid grid-cols-2">
        <div>
            <h2 className="text-xl max-xl:text-lg">Details</h2>
            <div className="text-sm mt-3 space-y-2">

                {
                    otherDetails.map((detail) => (
                        <div key={detail.name} className="flex gap-2 max-xl:text-xs">
                            <p>{detail.name}: </p>
                            <span className="text-neutral-400">{detail.value}</span>
                        </div>
                    ))
                }

            </div>
        </div>

        {/*    casts*/}
        <div>
            <h2 className="text-xl max-xl:text-lg">Cast</h2>
            <div className="text-sm mt-3 space-y-2">
                {
                    credits.cast.slice(0,3).map((cast) => (
                        <div key={cast.id} className="flex gap-2">
                            <Avatar size={22} icon={<FaUserCircle className="size-10" />} src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`} />
                            <span className="text-neutral-400 max-xl:text-xs max-w-[100px] max-sm:max-w-[80px] truncate">{cast.name}</span>
                        </div>
                    ))
                }
                <div className="flex gap-3 items-center">
                    <BsArrowDownCircle />
                    <span className="text-neutral-300 hover:underline hover:underline-offset-4 cursor-pointer transition-all">All</span>
                </div>
            </div>
        </div>


        <div>
            <h2 className="text-xl max-xl:text-lg">Studios</h2>
            <div className="text-sm mt-3 space-y-2">
                {
                    production_companies.length > 0 ? (
                        production_companies.slice(0,4).map((company) => (
                            <div key={company.id} className="flex gap-2">
                                <Avatar size={22} icon={<IoImageSharp className="size-10" />} src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}  />
                                <span className="text-neutral-400 max-xl:text-xs">{company.name}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-neutral-400">No data</p>
                    )
                }
            </div>
        </div>

    </div>
    )
}
export default OtherMediaDetails
