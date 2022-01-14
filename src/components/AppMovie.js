import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from './Home'
import Detail from './Detail'
import Discover from './Discover'
import Nav from "./NavBar";


export default function App() {
    const API_KEY = 'api_key=b7aa21e32bd3a1f8cbfe8069739600a0'
    const BASE_URL = 'https://api.themoviedb.org/3/'
    const PARAMS = '&language=en-US&sort_by=popularity.desc&page=1'
    const URL_Trending = 'trending/movie/day?'
    const URL_Genres = 'genre/movie/list?'

    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])

    async function moviesDataPromise(url) {
        return await axios.get(BASE_URL + url + API_KEY + PARAMS)
    }

    useEffect(() => {
        async function fetchMovie() {
            const moviesData = await moviesDataPromise(URL_Trending)
            await setMovies(moviesData.data.results)
            const genresData = await moviesDataPromise(URL_Genres)
            await setGenres(genresData.data.genres)
        }
        fetchMovie().then()
    }, [])

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/detail/:id">
                        <Detail />
                    </Route>
                    <Route path="/discover">
                        <Discover genres={genres} />
                    </Route>
                    <Route path="/home">
                        <Home movies={movies}/>
                    </Route>
                    <Route path="/profile">
                        <Nav />
                        <p>Profile</p>
                    </Route>
                    <Route path="/">
                        <Navigate to="/home" />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}