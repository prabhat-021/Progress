import img2 from "../../assets/cardimg.avif"
import Card_1 from "../../components/Colleges/Card_1"
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
 
 function Colleges() {
  return (
    <div>
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
    
    
  );
}
export default Colleges


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