// import { Card } from "@material-tailwind/react";
import HeroSection from "../../components/HeroSection";
import StickyNavbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card";

// import Navbar from "../../components/Navbar/Navbar";

export default function Home() {
    return (
        <div>
             <StickyNavbar />
             <HeroSection/>
             <Card/>
        </div>
       
        
    );
}