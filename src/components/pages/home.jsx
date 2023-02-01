import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardMovie from '../common/cardMovie';
import style from './homeModule.css';
import Header from '../common/header/header';

import confetti from 'canvas-confetti';
import { Button } from '@mui/material';
import MovieModal from '../common/createMovieModal/movieModal';


const Home = () => {

    const [movies, setMovies] = useState([]);
    const [dispatchLike, setDispatchLike] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [isMovieCreated, setIsMovieCreated] = useState(false);
    const [isMovieDelete, setIsMovieDelete] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/movies")
            .then((resp) => setMovies(resp.data))
            .catch((err) => console.log(err))

        setDispatchLike(false);
        setIsMovieCreated(false);
        setIsMovieDelete(false);

    }, [dispatchLike, isMovieCreated, isMovieDelete]);

    const handleLike = (movie) => {
        if (!movie.isLiked) {
            confetti({
                zIndex: 999,
                particleCount: 500,
                spread: 160,
                angle: -100,
                origin: {
                    x: 0.5,
                    y: 0
                }
            });
        }

        axios.patch(`http://localhost:5000/movies/${movie.id}`, { isLiked: !movie.isLiked })
            .then(resp => console.log(resp.data))
            .then(resp => setDispatchLike(true))
            .catch(err => console.log(err))

    }

    const moviesFilterd = movies.filter(movie => movie.isLiked);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteMovie = (movie) => {
        console.log('id de la pelicula: ', movie.id);

        axios.delete(`http://localhost:5000/movies/${movie.id}`)
            .then(resp => setIsMovieDelete(true))
            .catch(err => console.log(err));

    }


    return (
        < >
           
            <Header setFavorite={setFavorite} />
            <Button variant='contained' onClick={handleOpen}> Crear pelicula </Button>
            <MovieModal open={open} handleClose={handleClose} setIsMovieCreated={setIsMovieCreated}></MovieModal>
          

            <div className='containerCards'>

                {
                    !favorite ? (
                        movies.map((movie) => {
                            return (
                                <CardMovie movie={movie} key={movie.id} handleLike={handleLike} deleteMovie={deleteMovie} />
                            )
                        })
                    ) : (
                        moviesFilterd.map((movie) => {
                            return (
                                <CardMovie movie={movie} key={movie.id} handleLike={handleLike} deleteMovie={deleteMovie} />
                            )
                        })
                    )
                }

            </div>
        </>

    );
}

export default Home;
