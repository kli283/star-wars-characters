import React  from 'react';
import {Grid} from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import CharacterList from "../../components/CharacterList/CharacterList";

export const MainPage = ({
    isLoadingCharacters,
    characters,
    films,
    selectedFilms,
    isLoadingMore,
    pageNumber,
    pageUp,
    pageDown
}) => {
    return (
        <div className="container">
            <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={3}>
                    <h1>Star wars characters</h1>
                </Grid>
                <Grid item xs={3}>
                    {isLoadingCharacters ? (
                        <div className="loader-container">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            <CharacterList
                                characters={characters}
                                films={films}
                                selectedFilms={selectedFilms}
                            />
                            {isLoadingMore ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    {pageNumber === 1 ? (
                                        <button type="button" onClick={() => pageUp()}>
                                            Next Page
                                        </button>
                                    ) : (
                                        <div>
                                            <button type="button" onClick={() => pageDown()}>
                                                Previous Page
                                            </button>
                                            <button type="button" onClick={() => pageUp()}>
                                                Next Page
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </div>

    );
};