import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Delete } from '@mui/icons-material';


const cardMovie = ({ movie, handleLike, deleteMovie }) => {


    return (
        <Card sx={{ width: 300, height: 500, padding: 2 }}>
            <CardHeader title={movie.name} subheader={movie.createAt} />
            <CardMedia component="img" height="194" image={movie.img} alt={movie.name} />
            <CardContent sx={{ maxHeight: 150, scrollbarColor: 'black', scrollbarGutter: 'auto' }}>
                <Typography variant="body2" color="text.secondary" sx={{ height: 200 }} >
                    {movie.description}
                </Typography>
            </CardContent>
                  

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => handleLike(movie)}>
                    <FavoriteIcon color={movie.isLiked ? "error" : "disabled"} />
                </IconButton>
                <IconButton onClick={() => deleteMovie(movie)}>
                    <Delete></Delete>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default cardMovie; 