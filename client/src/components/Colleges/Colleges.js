
import Card_1 from "../../components/Colleges/Card_1"
import glaimg from "../../assets/GLA-UNIVERSITY-365x240.jpg"
import abesimg from "../../assets/ABES-Engineering-College-Ghaziabad.jpg"
import kietimg from "../../assets/KIET.webp"
import jssimg from "../../assets/JSS.jpeg"
import mietimg from "../../assets/MIET.jpeg"
import akgecimg from "../../assets/AKGEC.jpeg"
import Button from "../Button/Button";
import college from "../../assets/iit.jpg";

const college_data = [
  {
    name: "GLA",
    img: glaimg,
    college: "college",
    location: "Greater Noida",
    email: "director@gla.edu",

  },
  {
    name: "ABES",
    img: abesimg,
    college: "college",
    location: "Ghaziabad",
    email: "director@abes.edu",

  },
  {
    name: "KIET",
    img: kietimg,
    college: "college",
    location: "Muragdnagar",
    email: "director@kiet.edu",

  },
  {
    name: "JSS",
    img: jssimg,
    college: "college",
    location: "Noida",
    email: "director@jss.edu",

  },
  {
    name: "MIET",
    img: mietimg,
    college: "college",
    location: "Meerut",
    email: "director@miet.edu",

  },
  {
    name: "AKGEC",
    img: akgecimg,
    college: "college",
    location: "Ghaziabad",
    email: "director@akgec.edu",

  },
];

function Colleges() {
  return (
    
    <div className="overflow-hidden bg-cover bg-fixed bg-no-repeat "
     style={{
      backgroundPosition: "80%",
      backgroundImage: `url(${college})`,
      height: "990px",
     }}
    >
      <div className="bg-[hsla(0,0%,0%,0.75)]">
        <div className="flex flex-wrap justify-center  ">
        <h1 className="mt-6  text-5xl font-bold tracking-tight md:text-5xl xl:text-5xl">
          <span className="text-white ml-8 items-center tracking-widest">COLLEGES</span>
          <div className=" text-base mb-4  flex justify-center  font-normal text-white text-my-grey  mt-4">
          Where knowledge meets opportunity, and friendships last a lifetime.
          </div>
        </h1>
      </div>
      
      <div className="flex gap-5 m-10  flex-wrap justify-center">
        {college_data.map((e, index) => (
          <Card_1 name={e.name} img={e.img} location={e.location} email = {e.email} college={e.college} key={index} />
        )
        )}
      </div>
      <div className="flex justify-center pb-10 items center">
        <Button />
      </div>
    </div>
    </div>
    
  );
}

export default Colleges;


{/*import React from 'react'
import Card_1 from "../../components/Colleges/Card_1";
import img2 from "../../assets/cardimg.avif";

const college_data = [
    {
      name: "gla",
      img: { img2 },
      
    },
    {
      name: "abes ",
      img: "",
     
    },
    {
      name: "kiet",
      img: "",
     
    },
    {
      name: "jss",
      img: "",
     
    },
    {
      name: "miet",
      img: "",
      
    },
    {
      name: "akgec",
      img: "",
      
    },
  ];
const Colleges = () => {
  return (
    <div>

      {/*<div>
       <div className="flex flex-wrap justify-center m-6 ">
        <h1 className="mt-6  text-5xl font-bold tracking-tight md:text-5xl xl:text-5xl">
                  <span className="dark:text-gray-900">COLLEGES</span>
                  <div className=" text-base mb-4  flex justify-center  font-normal dark:text-gray-900 text-my-grey  mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
                </h1>
        
       </div>

        <div className="flex gap-5 m-10 flex-wrap justify-center">
          {college_data.map((e) => (
            <Card_1 name={e.name} imglink={e.img} price={e.price} key={e} />
          ))}
        </div>
      </div>
    
     
    </div>

  )
}
export default Colleges */}