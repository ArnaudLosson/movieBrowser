import {HiPlay, HiArrowLeft} from "react-icons/hi";
import {IconContext} from "react-icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {AiFillStar} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";
import { HiOutlineClock } from "react-icons/hi";
import {logDOM} from "@testing-library/react";
import Carousel from "react-elastic-carousel";
import {NavLink} from "react-router-dom"

export default function Detail() {
    const { id } = useParams()
    const API_KEY = 'api_key=61330235259d30ec7f0c37b884800e04'
    const BASE_URL = 'https://api.themoviedb.org/3/'
    const PARAMS = '&language=en-US&page=1'

    const [movieId, setMovieId] = useState(id)
    const [movie, setMovie] = useState([])
    const [movieRelated, setMovieRelated] = useState([])
    const [readMore, setReadMore] = useState(false)

    const URL_Movie = `movie/${movieId}?`
    const URL_Related = `movie/${movieId}/similar?`
    const [overview, setOverview] = useState();

    async function moviesDataPromise(url) {
        return await axios.get(BASE_URL + url + API_KEY + PARAMS)
    }

    async function fetchMovie() {
        const moviesData = await moviesDataPromise(URL_Movie)
        await setMovie(moviesData.data)
        await setOverview(moviesData.data.overview)
        const moviesRelatedData = await moviesDataPromise(URL_Related)
        await setMovieRelated(moviesRelatedData.data.results)
    }

    useEffect(async () => {
        await fetchMovie().then()
    }, [movieId, overview])

    useEffect(async () => {
        setMovieId(id)
    }, [id])

    function DisplayGenres() {
        const genres = movie.genres
        if (movie.length !== 0) {
            return(
                genres.map(genre => {
                    return <p key={genre.id} className="textGenre">{genre.name}</p>
                })
            )
        } else return <div>Loading</div>
    }

    function DisplayRelated() {
        return (
            <Carousel
                preventDefaultTouchmoveEvent={true}
                itemsToShow={2}
                pagination={false}
                showArrows={false}
            >{
            movieRelated.map(movie => {
                return (
                    <div className="movieRelated" key={movie.id}>
                        <Link className="link"
                              to={movie && "/detail/" + movie.id}>
                            <div className="divSize">
                                <img src={"https://image.tmdb.org/t/p/w400" + movie.poster_path} alt={movie.title}/>
                            </div>
                            <p>{movie.title} <span>({movie.release_date && movie.release_date.split('-')[0]})</span></p>
                        </Link>
                    </div>
                )
            })
            }
            </Carousel>
        )
    }

    function ButtonReadmore() {
        if(overview.length > 200) {
            return (
                <button
                    className="readMoreBtn"
                    onClick={ () => setReadMore(!readMore) }>{ readMore ? 'Show less' :'Readmore..' }
                </button>
            )
        } else {
            return;
        }
    }
    return (
        <div className="detailContainer">
            <div className="top">
                <img src={"https://image.tmdb.org/t/p/w400" + movie.backdrop_path} alt={movie.title}/>
                <NavLink to="/home">
                    <IconContext.Provider value={{className: "iconReturn"}}>
                        <HiArrowLeft/>
                    </IconContext.Provider>
                </NavLink>
                <IconContext.Provider value={{size: "15vw", className: "iconPlay"}}>
                    <HiPlay />
                </IconContext.Provider>
            </div>
            <div className="firstContainer">
                <p className="titleMovie">{movie.title}</p>
                <div className="infoGroup">
                    <div className="timeGroup">
                        <span className="timeIcon"><HiOutlineClock /></span>
                        <p>{movie.runtime} minutes</p>
                    </div>
                    <p className="rateText">
                        <IconContext.Provider value={{size: "5vw"}}>
                            <AiFillStar/>
                        </IconContext.Provider>
                        {movie.vote_average} (IMDb)
                    </p>
                </div>
            </div>
            <div className="underLine"></div>
            <div className="secondContainer">
                <div className="dateGroup">
                    <p className="titleDate">Release date</p>
                    <div>
                        <p className="textDate">{movie.release_date}</p>
                    </div>
                </div>
                <div className="genreGroup">
                    <p className="genreTitle">genre</p>
                    <div>
                        <DisplayGenres/>
                    </div>
                </div>
            </div>
            <div className="underLine"></div>
            <div className="desGroup">
                <p className="desTitle">Synopsis</p>
                <p className="desText">
                    {movie.overview}
                </p>
            </div>
            <div className="moreMovieGroup">
                <p className="moreMovieTitle">Related Movies</p>
                <DisplayRelated/>
            </div>
        </div>
    )
}