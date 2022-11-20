import {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Favorites = ({favoritesChars, handleFavoritesChar}) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        const tabFavoritesChars = favoritesChars.split(",");
        const fetchData = async () => {
            
            try {
                const response = await axios.post("https://site--backend-marvel--4pswvlk4zjzj.code.run/favorites-characters",
                {
                    favorites : tabFavoritesChars,
                }
                );
                setData(response.data);                
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        if (favoritesChars){
            fetchData();
        } else {
            navigate("/");
        }
    });
    
   
         
        
    return isLoading ? (
        <div className="loading">
            <p>Loading...</p>
        </div>
    ) : (
            <div className="container">
                <h1>Personnages favoris</h1>
                <div className="characters">
                {data.map((character, index) => {                    
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
                                    checked={true}                                 
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
            </div>
        );
    };

export default Favorites;