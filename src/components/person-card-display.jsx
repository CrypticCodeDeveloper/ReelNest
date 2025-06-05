import React from "react";

const PersonCardDisplay = ({
    person
                           }) => {

    const {profile_path, name, known_for_department, known_for} = person

    const profile_picture = profile_path ? `https://image.tmdb.org/t/p/original/${profile_path}` : "/no-poster.png";
    const works = known_for ? known_for.slice(0,2) : []

    return (
        <>
            <div className="flex gap-3">

                {/*Profile picture*/}
                <div
                    className="w-[120px] h-[120px] min-w-[120px] min-h-[120px] border border-neutral-400 overflow-hidden hover:*:scale-110 cursor-pointer">
                    <img className="h-full w-full object-cover aspect-auto transition-all" src={profile_picture}
                         alt={name}/>
                </div>
                {/*    */}

                <div>

                    <div>
                        <h2 className="text-lg font-semibold">{name}</h2>
                        <p className="text-xs mt-1">known for {known_for_department}</p>
                    </div>

                    <div className="mt-2 space-y-1">
                        {
                            works.map((work) => (<p className="text-xs glass p-1 px-2 max-w-[200px] rounded-md">{work.title || work.name}</p>))
                        }
                    </div>

                </div>


            </div>
            <div className="h-[1px] w-full bg-neutral-500"></div>
        </>
    );
}
export default PersonCardDisplay
