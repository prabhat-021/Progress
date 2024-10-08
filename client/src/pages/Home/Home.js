import HeroSection from "../../components/DashBoard/HeroSection";
import Footer from "../../components/Footer";
import CarouselCard from "../../components/Carousal";
import Navbar from "../../components/Navbar/NavbarNew"
// import Navbar from "../../components/Navbar/Navbar";

import Courses from "../../components/Courses";
import Colleges from "../../components/Colleges/Colleges"
// import CarouselBasicExample from "../../components/Carousal";

// import AccordionCustomIcon from "../../components/Accordin";
// import { LinearGradient } from "react-text-gradients";




function Home() {
  return (
    <div className="bg-gradient-to-b  bg-slate-900 bg-opacity-100">
      
      <Navbar/>
      <HeroSection />
      <Courses/>
      <Colleges/>
      {/* <CarouselBasicExample/>/ */}
      <CarouselCard/>
      {/* <AccordionCustomIcon/> */}
      <Footer />
    </div>
  );
}
export default Home;
