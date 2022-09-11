import './App.css';
import React, {useEffect, useRef, useState} from 'react';
import {MainPage} from "./views/MainPage/MainPage";
import axios from "axios";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);
    const [isLoadingFilms, setIsLoadingFilms] = useState(true);
    const [isLoadingCharacters, setIsLoadingCharacters] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [selectedFilms, setSelectedFilms] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const maxCharacters = useRef();

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const resultFilms = await axios(`https://swapi.dev/api/films`);
                setFilms(resultFilms.data.results);
                setSelectedFilms(resultFilms.data.results);
                setIsLoadingFilms(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFilms();
    }, []);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setIsLoadingCharacters(true);
                const resultCharacters = await axios(`https://swapi.dev/api/people/`);
                setCharacters(sortCharacters(resultCharacters.data.results));
                maxCharacters.current = resultCharacters.data.count;
                setPageNumber(pageNumber + 1)
                console.log(pageNumber);
                setIsLoadingCharacters(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCharacters();
    }, []);

    const pageUp = async () => {
        setIsLoadingMore(true);
        setPageNumber(pageNumber + 1);
        const result = await axios(`https://swapi.dev/api/people/?page=${pageNumber}`);
        console.log(pageNumber);
        setCharacters(sortCharacters(result.data.results));

        setIsLoadingMore(false);
    };

    const pageDown = async () => {
        setIsLoadingMore(true);
        setPageNumber(pageNumber - 1);
        const result = await axios(`https://swapi.dev/api/people/?page=${pageNumber}`);
        setCharacters(sortCharacters(result.data.results));
        console.log(pageNumber);
        setIsLoadingMore(false);
    };

    function sortCharacters(characterList) {
        return characterList.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
        });
    }
    return (
        <div className="App">
            {isLoadingFilms ? (
                <div className="loader-container">
                    <LoadingSpinner />
                </div>
            ) : (
                    <MainPage
                        isLoadingCharacters={isLoadingCharacters}
                        characters={characters}
                        films={films}
                        selectedFilms={selectedFilms}
                        isLoadingMore={isLoadingMore}
                        pageNumber={pageNumber}
                        pageUp={pageUp}
                        pageDown={pageDown}
                    />
            )}
        </div>
    );
};

export default App;
