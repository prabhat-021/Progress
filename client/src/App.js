import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import ResetForm from "./components/resetForm/ResetForm";
import Login from "./pages/Auth/Login";
import OtpInput from "./components/OtpInput";


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/verifyOtp" element={<OtpInput />} />
        <Route path="/about" element={<About />} exact />
        <Route path="/resetPassword" element={<ResetForm />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
