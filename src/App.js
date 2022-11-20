import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState} from "react";
import Cookies from "js-cookie";

import Header from "./components/Header";
import NoMatch from "./pages/NoMatch";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import ComicsByCharacter from "./pages/ComicsByCharacter";

function App() {
  const [search, setSearch] = useState("");
  const [favoritesChars, setFavoritesChars] = useState(Cookies.get("favoriteschars") || "");
  
  
  const handleFavoritesChar = (charId) => {
        
    let isFound = false;
    if(favoritesChars){
    const tabFavoritesChars = favoritesChars.split(",");
    for (let i=0; i<tabFavoritesChars.length; i++){
      if (tabFavoritesChars[i] === charId) {
        isFound = true;        
        tabFavoritesChars.splice(i, 1);
        const tempfavoritesChars = tabFavoritesChars.join(",");
        setFavoritesChars(tempfavoritesChars);
        Cookies.set("favoriteschars", tempfavoritesChars, {expires: 100});    
        break;
      };
    };    

    if (isFound === false){
      tabFavoritesChars.push(charId);
      const tempfavoritesChars = tabFavoritesChars.join(",");
      setFavoritesChars(tempfavoritesChars);
      Cookies.set("favoriteschars", tempfavoritesChars, {expires: 100});
    };
    } else {
      setFavoritesChars(charId);
      Cookies.set("favoriteschars", charId, {expires: 100});
    };
  };

  return (
    <Router>
      <Header search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Characters search={search} favoritesChars={favoritesChars} handleFavoritesChar={handleFavoritesChar}/>} />
        <Route path="/comics" element={<Comics search={search}/>} />
        <Route path="/favorites" element={<Favorites favoritesChars={favoritesChars} handleFavoritesChar={handleFavoritesChar}/>} />
        <Route path="/comicsbycharacter/:characterId" element={<ComicsByCharacter/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </Router>
  );
}

export default App;
