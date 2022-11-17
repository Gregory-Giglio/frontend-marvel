import {useEffect, useState} from "react";
import axios from "axios";

const Characters = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://localhost:4000/characters");
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <h1>Characters</h1>
            {data.results.map((character, index) => {
                return (
                    <div key={character._id}>
                        <h3>{character.name}</h3>
                        <img
                            src={
                                character.thumbnail.path + "." + character.thumbnail.extension
                            }
                            alt="character"
                        />
                        {character.description && <p>{character.description}</p>}
                    </div>
                );
            })}
        </div>
    );
};

export default Characters;