import {DotLottieReact} from "@lottiefiles/dotlottie-react";

const NoSearchFound = () => {
    return (
        <div className="flex flex-col items-center">
            <DotLottieReact
                src="/no-search-found.lottie"
                loop
                className="w-[400px] max-sm:w-[300px]"
                autoplay
            />
            <p className="mt-4 font-semibold text-lg">No search found</p>
        </div>
    )
}
export default NoSearchFound
