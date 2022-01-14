import Nav from "./NavBar";
import {BiSearch} from "react-icons/bi";
import {IconContext} from "react-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Discover (props) {
    const genresArrays = props.genres

    const API_KEY = 'api_key=b7aa21e32bd3a1f8cbfe8069739600a0'
    const BASE_URL = 'https://api.themoviedb.org/3/'
    const PARAMS = '&language=en-US&page=1'

    const [genreId, setGenreId] = useState(28)
    const [page, setPage] = useState(1)
    const [isFetching, setIsFetching] = useState(false)

    const URL_Discover = 'discover/movie?'

    async function movieDataByGenrePromise(id) {
        return await axios.get(BASE_URL + URL_Discover + API_KEY + PARAMS + id)
    }

    const [listMovieGenre, setListMovieGenre] = useState([])

    async function fetchMovie () {
        const moviesData = await movieDataByGenrePromise(genreId)
        setPage(page + 1)
        setIsFetching(false)
        return moviesData.data.results
    }

    const onScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){
            return;
        }
        setIsFetching(true)
    }

    useEffect(() => {
        setListMovieGenre([])
        setPage(1)
        console.log(page)
        fetchMovie().then((result) => setListMovieGenre(result))
        window.addEventListener("scroll", onScroll)
    }, [genreId])

    useEffect(() => {
        if (isFetching) {
            fetchMovie().then((result) => setListMovieGenre(prevState => [...prevState, ...result]))
        }
    }, [isFetching]);

    function MoviesGenres() {
        return(
            listMovieGenre.map(movie => {
                return (
                    <div className="movieGenre" key={movie.id}>
                        <Link className="link" to={movie && "/detail" + movie.id}>
                            <div className="divSize">
                                <img src={"http://image.tmdb.org/t/p/w400" + movie.poster_path} alt={movie.title} />
                            </div>
                            <p>{movie.title} <span>({movie.release_date && movie.release_date.split('-')[0]})</span></p>
                        </Link>
                    </div>
                )
            })
        )
    }

    function NavGenres() {
        function changeGenre(e) {
            setGenreId(e.target.id)
            setPage(1)
            e.target.classList.add('color')
        }

        return (
            genresArrays.map(genre => {
                return (
                    <p onClick={(e) => changeGenre(e)} id= {genre.id}>{genre.name}</p>
                )
            })
        )
    }

    return(
        <div>
            <Nav />
            <h1 className='title'><span>Movie</span>Browser</h1>
            <div className='input'>
                <input placeholder={'Sherlock Holms'} />
                <IconContext.Provider value={{size: '3vh'}}>
                    <BiSearch />
                </IconContext.Provider>
            </div>
            <nav className='navGenres'>
                <NavGenres />
            </nav>
            <div className='movieGenre'>
                <MoviesGenres />
            </div>
        </div>
    )
}