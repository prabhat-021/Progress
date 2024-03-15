import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/Home/About";
import Contact from "./pages/Home/Contact"

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} exact/>
        <Route path="/about" element={<About/>}   exact/>
        {/* <Route path="/project" element={<Project />} /> */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
