import axios from 'axios'
import toast from "react-hot-toast"

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`


const handleError = (e) => {
    toast.error(e.response.data?.status_message || "Error occurred somewhere")
    console.log("The problem:: ", e)
}

// Function to return a random page
const getRandomPage = (totalPage) => {
    return Math.floor(Math.random() * totalPage)
}

// Get movie details
export const getMediaDetails = async ({queryKey}) => {

    const media = queryKey[1]
    const id = parseInt(queryKey[2])

    try{
        const response = await axios.get(`/${media}/${id}`, {
            params: {
                append_to_response: "credits,images,similar,recommendations,videos"
            }
        })
        return response.data
    } catch (e) {
        handleError(e)
    }
}


// Endpoint to fetch medias
const fetchMedia = async (endpoint) => {
    try{
        const response = await axios.get(endpoint, {
            params: {
                page: 1,
            }
        })
        return response.data
    } catch (e) {
        handleError(e)
    }
}

// All fetch media instances
export const getDiscoverMovies = () => fetchMedia('/discover/movie')
export const getMoviesTrending = () => fetchMedia('/trending/movie/day')
export const getShowsTrending = () => fetchMedia('/trending/tv/day')
export const getSimilarMedias = (mediaType, id) => fetchMedia(`/${mediaType}/${id}/similar`)
export const getRecommendedMedias = (mediaType, id) => fetchMedia(`/${mediaType}/${id}/recommendations`)