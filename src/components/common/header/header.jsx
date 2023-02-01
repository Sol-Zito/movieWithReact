import { Button, Typography } from '@mui/material';
import React from 'react';
import styles from './header.css';

const Header = ({setFavorite}) => {
    return (
        <div className="headerContainer">
            <Typography variant='h4' color="primary">
                Peliculas
            </Typography>

            <div className="containerBtn">
                <Button variant="contained" color="primary" onClick={ () => setFavorite(false) }>Todos</Button>
                <Button variant="contained" color="primary" onClick={ () => setFavorite(true) }>Favoritos</Button>
            </div>
        </div>
    )
}

export default Header;
