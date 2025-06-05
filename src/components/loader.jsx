import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = () => {
    return (
        <div className="min-h-screen flex-center bg-[#242424] overflow-hidden">
            <DotLottieReact
                src="/loader.lottie"
                loop
                className="w-[400px]"
                autoplay
            />
        </div>
    );
}
export default Loader
