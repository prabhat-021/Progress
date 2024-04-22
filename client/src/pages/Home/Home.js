import HeroSection from "../../components/HeroSection";
import Footer from "../../components/Footer";
// import CarouselCard from "../../components/Carousal";
import Navbar from "../../components/Navbar/NavbarNew"
import Courses from "../../components/Courses";
import Colleges from "../../components/Colleges/Colleges"
// import { LinearGradient } from "react-text-gradients";




function Home() {
  return (
    <div className="bg-gradient-to-b  from-[#d8d8d4] to-[#050736] bg-opacity-100">
      
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
