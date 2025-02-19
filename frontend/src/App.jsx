import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Mentors from "./pages/Mentors"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Meeting from "./pages/Meeting"
import MyMeetings from "./pages/MyMeetings"
import MyProfile from "./pages/MyProfile"
import Footer from "./components/Footer"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify"
import AllColleges from "./pages/AllColleges";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Mentors" element={<Mentors />} />
        <Route path="/College" element={<AllColleges />} />
        <Route path="/Mentors/:speciality" element={<Mentors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Meeting/:docId" element={<Meeting />} />
        <Route path="/my-Meetings" element={<MyMeetings />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App