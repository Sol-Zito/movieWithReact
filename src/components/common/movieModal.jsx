import React from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "black",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MovieModal = ({ open, handleClose, setIsMovieCreated }) => {
  const enviarForm = (data) => {
    let newMovie = {
      name: data.name,
      description: data.description,
      img: data.img,
      createAt: data.createAt,
      isLiked: false,
    };

    axios
      .post("http://localhost:5000/movies", newMovie)
      .then((rsp) => {
        handleClose();
        setIsMovieCreated(true);
      })
      .catch((err) => console.log(err));
  };

  const { handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      description: "",
      img: "",
      createAt: "",
    },
    onSubmit: enviarForm,
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContente: "space-between",
              alignItems: "center",
              height: "400px",
              gap: "5px",
            }}
            onSubmit={handleSubmit}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color="primary"
            >
              Complete los datos:
            </Typography>

            <TextField
              id="name-movie"
              name="name"
              label="Titulo de la pelicula"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="description-movie"
              name="description"
              label="Descripcion de la pelicula"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="img-movie"
              name="img"
              label="Portada"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="createAt-movie"
              name="createAt"
              label="Ingrese fecha"
              fullWidth
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              Agregar pelicula
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieModal;
