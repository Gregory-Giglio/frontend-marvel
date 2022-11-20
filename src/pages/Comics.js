import { useEffect, useState } from "react";
import axios from "axios";
import flecheGauche from "../components/img/Fleche-gauche-rouge-icon.png";
import flecheDroite from "../components/img/Fleche-droite-rouge-icon.png";


const Comics = ({search}) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const skip = (100 * (page - 1));
                const response = await axios.get(`https://site--backend-marvel--4pswvlk4zjzj.code.run/comics?title=${search}&skip=${skip}`);
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
        
        <div className="container">
            <h1>Comics</h1>
            <div className="paging">
                <p
                    onClick={()=>{
                        if (page > 1){
                            const previousPage = page - 1;
                            setPage(previousPage);
                            setIsLoading(true);
                        };
                    }}
                ><img src={flecheGauche} alt="previous" /></p>
                <p>page {page}</p>
                <p
                    onClick={()=>{
                        const nextPage = page + 1;
                        setPage(nextPage);
                        setIsLoading(true);
                    }}
                ><img src={flecheDroite} alt="next" /></p>
            </div>
            <div className="comics">
            {data.results.map((comic, index) => {
                return (
                    <div key={comic._id} className="comic">
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
    </div>
    );
};

export default Comics;