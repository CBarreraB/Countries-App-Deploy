import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Landing from "./views/LandingPage/LandingPage";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import About from "./views/About/About";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./components/NotFound/NotFound";
import Activities from "./views/Activities/Activities";

// Ubicamos la ruta actual
function App() {
  const location = useLocation();
  // Renderizamos
  return (
    <div className="App">
      {/* renderizamos NavBar solo cuando no es igual / */}
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/countries/:id" element={<Detail />} />
        <Route exact path="/form" element={<Form />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
