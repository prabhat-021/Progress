import HeroSection from "../../components/HeroSection";
import StickyNavbar from "../../components/Navbar/Navbar";
import Card_1 from "../../components/Card_1";
import img2 from "../../assets/cardimg.jpeg";
import { RiGraduationCapLine } from "react-icons/ri";
import Footer from "../../components/Footer";


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

      <div className="mb-16 mt-14 ">
        <div className=" mt-20 md:m-3 text-2xl flex justify-center md:text-4xl text-white text-my-blue font-bold">
          SELECT YOUR STUDY GOAL
        </div>

        <div className="md:text-xl text-center font-semibold text-white text-my-grey justify-center flex mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>

        <div className="flex justify-evenly shadow-lg flex-wrap mt-16 gap-7 ">
          <div className="min-w-[200px] max-w-[300px] shadow-2xl p-10 rounded-2xl bg-stone-600">
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
          <div className="min-w-[200px] max-w-[300px] shadow-2xl p-10 rounded-2xl bg-stone-600">
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
          <div className="min-w-[200px] max-w-[300px]  shadow-2xl p-10 rounded-2xl bg-stone-600">
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
        <div className="text-my-blue flex justify-center text-3xl md:text-5xl font-bold m-5 text-white">
          TOP COLLEGES
        </div>
        <div className=" flex justify-center text-my-grey text-white text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          ipsum!
        </div>

        <div className="flex gap-5 m-10 flex-wrap justify-center">
          {food_data.map((e) => (
            <Card_1 name={e.name} imglink={e.img} price={e.price} key={e} />
          ))}
        </div>
      </div>
     {/* LATEST INFORMATION */}
     <div className=" flex justify-center text-xl md:text-5xl font-bold m-5 text-white">
          LATEST NOTIFICATION
        </div>
      {/* <CarouselTestimonial/> */}
     {/* FOOTER */}
      <Footer />
    </div>
  );
}
export default Home;
