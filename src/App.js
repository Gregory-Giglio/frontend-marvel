import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useState} from "react";

import Header from "./components/Header";
import NoMatch from "./pages/NoMatch";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import ComicsByCharacter from "./pages/ComicsByCharacter";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Characters search={search}/>} />
        <Route path="/comics" element={<Comics search={search}/>} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/comicsbycharacter/:characterId" element={<ComicsByCharacter/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </Router>
  );
}

export default App;
