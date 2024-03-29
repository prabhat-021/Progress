import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./pages/Home/About";
// import Contact from "./pages/Home/Contact";
import ResetForm from "./components/resetForm/ResetForm";
import Login from "./pages/Auth/Login";
// import Demo from "./pages/Auth/Demo";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/sign-in" element={<Login />} />
        {/* <Route path="/demo" element={<Demo />} /> */}
        {/* <Route path="/about" element={<About />} exact /> */}
        <Route path="/resetPassword" element={<ResetForm />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
