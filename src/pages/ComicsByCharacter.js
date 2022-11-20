import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ComicsByCharacter = () => {
    const {characterId} = useParams();

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://site--backend-marvel--4pswvlk4zjzj.code.run/comics/${characterId}`);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [characterId]);

    return isLoading ? (
        <div className="loading">
            <p>Loading...</p>
        </div>
    ) : (
        
        <div className="container comics">
        <h1>Comics of {data.name}</h1>
        {data.comics.map((comic, index) => {
            return (
                <div key={comic._id}>
                    <h3>{comic.title}</h3>
                    <img
                        src={
                            comic.thumbnail.path + "." + comic.thumbnail.extension
                        }
                        alt="comic"
                    />
                    {comic.description && <p>{comic.description}</p>}
                </div>
            );
        })}
    </div>
    );
};

export default ComicsByCharacter;