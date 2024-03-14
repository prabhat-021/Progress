import HeroSection from "../../components/HeroSection";
import StickyNavbar from "../../components/Navbar/Navbar";
import Card_1 from "../../components/Card_1";
import img2 from "../../assets/cardimg.avif";
import { RiGraduationCapLine } from "react-icons/ri";
import Footer from "../../components/Footer";
import { LinearGradient } from "react-text-gradients";

import CarouselCard from "../../components/Carousal";


const food_data = [
  {
    name: "gla",
    img: { img2 },
    // price:"100.00"
  },
  {
    name: "abes ",
    img: "",
    // price:"100.00"
  },
  {
    name: "kiet",
    img: "",
    // price:" 100.00"
  },
  {
    name: "jss",
    img: "",
    // price:"100.00"
  },
  {
    name: "miet",
    img: "",
    // price:"100.00"
  },
  {
    name: "akgec",
    img: "",
    // price:"100.00"
  },
];

function Home() {
  return (
    <div className="bg-stone-950 bg-opacity-100">
      <StickyNavbar />
      <HeroSection />

      {/* seclect you goal  */}

      <div className="  ">
        <div className="flex flex-wrap justify-center m-6 ">
        <h1 className="mt-6  text-5xl font-bold tracking-tight md:text-5xl xl:text-5sxl">
                  <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
                  FEATURED  {" "}
                  </LinearGradient>{" "}
                  <span className="text-white">COURSES</span>
                  <div className=" text-base mb-4  flex justify-center  font-normal text-white text-my-grey  mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
                </h1>
        
       </div>

        
        {/* <div className="text-lg text-my-orange font-thin text-white p-0  items-center justify-center flex">
              Read More
            </div> */}
        
      
        

        <div className="flex justify-evenly shadow-lg flex-wrap mt-8 gap-7 ">
          <div className="min-w-[200px] max-w-[300px] shadow-2xl p-10  bg-stone-600">
            <RiGraduationCapLine size={"80px"} />
            <div className="text-2xl text-my-blue font-bold mt-5">B.tech</div>
            <div className="text-my-grey mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              eaque. Lorem ipsum
            </div>

            <div className="text-xl text-my-orange font-bold mt-5">
              Read More
            </div>
          </div>
          <div className="min-w-[200px] max-w-[300px] shadow-2xl p-10  bg-stone-600">
            <RiGraduationCapLine size={"80px"} />
            <div className="text-2xl text-my-blue font-bold mt-5">M.tech</div>
            <div className="text-my-grey mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              eaque. Lorem ipsum{" "}
            </div>
            <div className="text-xl text-my-orange font-bold mt-5">
              Read More
            </div>
          </div>
          <div className="min-w-[200px] max-w-[300px]  shadow-2xl p-10  bg-stone-600">
            <RiGraduationCapLine size={"80px"} />
            <div className="text-2xl text-my-blue font-bold mt-5">MBA</div>
            <div className="text-my-grey mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              eaque. Lorem ipsum{" "}
            </div>

            <div className="text-xl text-my-orange font-bold mt-5">
              Read More
            </div>
          </div>
        </div>
      </div>

      {/* <Card/> */}
      <div>
      <div className="flex flex-wrap justify-center m-6 ">
        <h1 className="mt-6  text-5xl font-bold tracking-tight md:text-5xl xl:text-5sxl">
                  <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
                  TOP  {" "}
                  </LinearGradient>{" "}
                  <span className="text-white">COLLEGES</span>
                  <div className=" text-base mb-4  flex justify-center  font-normal text-white text-my-grey  mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
                </h1>
        
       </div>

        <div className="flex gap-5 m-10 flex-wrap justify-center">
          {food_data.map((e) => (
            <Card_1 name={e.name} imglink={e.img} price={e.price} key={e} />
          ))}
        </div>
      </div>
     {/* LATEST INFORMATION */}
     <div className="flex flex-wrap justify-center m-6 ">
        <h1 className="mt-6  text-5xl font-bold tracking-tight md:text-5xl xl:text-5sxl">
                  <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
                  LATEST {" "}
                  </LinearGradient>{" "}
                  <span className="text-white">NOTIFICATION</span>
                 
                </h1>
        
       </div>
   <CarouselCard/>
     {/* FOOTER */}
      <Footer />
    </div>
  );
}
export default Home;
