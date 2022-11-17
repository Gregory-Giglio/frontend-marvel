import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Characters from "./pages/Characters";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Characters />} />
      </Routes>
    </Router>
  );
}

export default App;
