import logo from "./img/langfr-1920px-MarvelLogo.svg_uw9pi8.png";
import {Link} from "react-router-dom";

const Header = ({search, setSearch}) => {
    return (
        <header>
            <Link to="/"><img src={logo} alt="logo Marvel" /></Link>

            <input
                className="header-search" type="text" placeholder="Recherche" value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            />
            <nav>
                <Link to="/"><p>Personnages</p></Link>
                <Link to="/comics"><p>Comics</p></Link>
                <Link to="/favorites"><p>Favoris</p></Link>
               
            </nav>


        </header>
    );
};

export default Header;