import { useEffect, useState } from "react";
import axios from "axios";

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
        
        <div className="container comics">
            <h1>Comics</h1>
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
            {data.results.map((comic, index) => {
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

export default Comics;