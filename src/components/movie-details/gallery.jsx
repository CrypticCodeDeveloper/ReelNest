
const Gallery = ({images}) => {

    const imgs = images.slice(1,4)
    console.log("images", imgs)
    const firstImage = imgs[0]?.file_path ? imgs[0].file_path : images[0]?.file_path
    const secondImage = imgs[1]?.file_path
    const thirdImage = imgs[2]?.file_path

    return (
        <div className="max-w-[250px] min-w-[180px] max-xl:w-[220px] max-sm:w-[250px] h-full flex flex-col gap-3 items-center">
            <div className="w-full h-[150px]">
                <img src={`https://image.tmdb.org/t/p/original/${firstImage}`}
                     className="w-full h-full object-cover" alt=""/>
            </div>

            <div className="w-full grid grid-cols-2 gap-2">

                <div className=" h-[80px]">
                    <img src={`https://image.tmdb.org/t/p/original/${!secondImage ? firstImage : secondImage}`}
                         className="w-full h-full object-cover" alt=""/>
                </div>

                <div className="h-[80px]">
                    <img src={`https://image.tmdb.org/t/p/original/${!thirdImage ? firstImage : thirdImage}`}
                         className="w-full h-full object-cover" alt=""/>
                </div>


            </div>

            {/*   Button */}
            <button className="h-[60px] w-full glass cursor-pointer hover:bg-white/20 transition-all">
                View all
            </button>
        </div>
    );
}
export default Gallery
