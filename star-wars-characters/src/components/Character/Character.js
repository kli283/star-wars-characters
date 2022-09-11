import React, {useEffect, useState} from "react";
import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Character= ({
    characterInfo,
    films
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [planet, setPlanet] = useState();
    const [isLoadingPlanet, setIsLoadingPlanet] = useState(true);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                setIsLoadingPlanet(true);
                const resultPlanet = await axios(`${characterInfo.homeworld}`);
                setPlanet(resultPlanet.data.results);
                setIsLoadingPlanet(false);
            }  catch (err) {
                console.error(err);
            }
        };
        fetchPlanet();
    }, [planet]);

    return (
        <div>
            <Button
                onClick={(handleOpen)}
                className={"character-card"}
            >
                <h3>{characterInfo.name}</h3>
            </Button>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-character"
                aria-describedby="modal-modal-character-detail-model"
            >
                <Box sx={style}>
                    <p className="films">
                        <strong>Appeared in:</strong>
                    </p>
                    <ul>
                        {characterInfo.films.map((characterFilm) => (
                            <li key={characterFilm}>
                                {films.find((film) => film.url === characterFilm).title}
                            </li>
                        ))}
                    </ul>
                    <p>
                        <strong>Birth year:</strong> {characterInfo.birth_year}
                    </p>
                    <div>
                        <p>
                            <strong>Eye colour:</strong> {characterInfo.eye_color}
                        </p>
                        <strong>Home planet:</strong>
                            { isLoadingPlanet ? (
                                <div className="loader-container">
                                    <LoadingSpinner />
                                </div>
                            ) :
                                <div>{planet ? planet.name : "Planet not found"}</div>
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Character;