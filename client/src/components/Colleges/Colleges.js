
import Card_1 from "../../components/Colleges/Card_1"
import glaimg from "../../assets/GLA-UNIVERSITY-365x240.jpg"
import abesimg from "../../assets/ABES-Engineering-College-Ghaziabad.jpg"
import kietimg from "../../assets/KIET.webp"
import jssimg from "../../assets/JSS.jpeg"
import mietimg from "../../assets/MIET.jpeg"
import akgecimg from "../../assets/AKGEC.jpeg"
import Button from "../Button/Button";

const college_data = [
  {
    name: "GLA",
    img: glaimg,
    location: "Greater Noida",

  },
  {
    name: "ABES",
    img: abesimg,
    location: "Ghaziabad",

  },
  {
    name: "KIET",
    img: kietimg,
    location: "Muragdnagar",

  },
  {
    name: "JSS",
    img: jssimg,
    location: "Noida",

  },
  {
    name: "MIET",
    img: mietimg,
    location: "Meerut",

  },
  {
    name: "AKGEC",
    img: akgecimg,
    location: "Ghaziabad",

  },
];

function Colleges() {
  return (
    <div>
      <div className="flex flex-wrap justify-center m-6 ">
        <h1 className="mt-6  text-5xl font-bold tracking-tight md:text-5xl xl:text-5xl">
          <span className="text-white ml-8 items-center tracking-widest">COLLEGES</span>
          <div className=" text-base mb-4  flex justify-center  font-normal text-white text-my-grey  mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </h1>
      </div>
      <div className="flex gap-5 m-10  flex-wrap justify-center">
        {college_data.map((e, index) => (
          <Card_1 name={e.name} img={e.img} location={e.location} key={index} />
        )
        )}
      </div>
      <div className="flex justify-center pb-10 items center">
        <Button />
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