import { useEffect, useState } from "react";
import axios from "axios";

const Comics = ({search}) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/comics?title=${search}`);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [search]);

    return isLoading ? (
        <div className="loading">
            <p>Loading...</p>
        </div>
    ) : (
        
        <div className="container comics">
        <h1>Comics</h1>
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