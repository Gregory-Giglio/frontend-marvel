import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Characters = ({search, favoritesChars, handleFavoritesChar}) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const skip = (100 * (page - 1));
                const response = await axios.get(`https://site--backend-marvel--4pswvlk4zjzj.code.run/characters?name=${search}&skip=${skip}`);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [search, page]);

    
    return isLoading ? (
        <div className="loading">
            <p>Loading...</p>
        </div>
    ) : (
        <div className="container characters">
            
            <h1>Personnages</h1>
            <div className="paging">
                <button
                    onClick={()=>{
                        if (page > 1){
                            const previousPage = page - 1;
                            setPage(previousPage);
                            setIsLoading(true);
                        };
                    }}
                >précédente</button>
                <p>page {page}</p>
                <button
                    onClick={()=>{
                        const nextPage = page + 1;
                        setPage(nextPage);
                        setIsLoading(true);
                    }}
                >suivante</button>
            </div>
            {data.results.map((character, index) => {
                let check = false;
                const tabFavoritesChars = favoritesChars.split(",");
                for (let i=0; i<tabFavoritesChars.length; i++) {
                    if (tabFavoritesChars[i] === character._id){
                        check = true;
                        break;
                    }
                };
                
                return (
                    <div key={character._id}>
                         <Link to={`/comicsbycharacter/${character._id}`} className="nodecoration">
                            <h3>{character.name}</h3>
                            <img
                                src={
                                    character.thumbnail.path + "." + character.thumbnail.extension
                                }
                                alt="character"
                            />
                            {character.description && <p>{character.description}</p>}
                        </Link>
                        <div>
                            <input type="checkbox"
                                                                
                                checked={check}                                 
                                onChange={() => {
                                    handleFavoritesChar(character._id);
                                }}
                            />          
                            <span>Favoris</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Characters;