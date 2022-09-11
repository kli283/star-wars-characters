import { useEffect, useState } from "react";
import Character from "../Character/Character";


const CharacterList = ({
    characters,
    films,
    selectedFilms
}) => {
    const [filteredCharacters, setFilteredCharacters] = useState(characters);

    useEffect(() => {
        const filtered = characters.filter((c) =>
            c.films.some((characterFilm) => selectedFilms.some((film) => film.url === characterFilm))
        );

        setFilteredCharacters(filtered);
    }, [selectedFilms, characters]);

    return (
        <div>
            {filteredCharacters.length > 0 ? (
                <div>
                    {filteredCharacters.map((characterInfo) => (
                        <Character
                            key={characterInfo.name}
                            characterInfo={characterInfo}
                            films={films}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    <p>No characters found</p>
                </div>
            )}
        </div>
    );
};

export default CharacterList;