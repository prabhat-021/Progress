import HeroSection from "../../components/HeroSection";
import Footer from "../../components/Footer";
// import CarouselCard from "../../components/Carousal";
import Navbar from "../../components/Navbar/NavbarNew"
import Courses from "../../components/Courses";
import Colleges from "../../components/Colleges/Colleges"
// import { LinearGradient } from "react-text-gradients";




function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-700 via-[#717365] to-[#030426] bg-opacity-100">
      
      <Navbar/>
      <HeroSection />
      <Courses/>
      <Colleges/>
      {/* <CarouselCard/> */}
      <Footer />
    </div>
  );
}
export default Home;
