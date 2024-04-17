import React from 'react'
import { RiGraduationCapLine } from "react-icons/ri";

const Courses = () => {
  return (
    <div>
      <div className="  ">
        <div className="flex items-center justify-center flex-wrap  m-6 ">
        <h1 className="mt-6  text-5xl font-bold tracking-tight md:text-5xl xl:text-5sxl">
                  {/* <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
                  FEATURED  {" "}
                  </LinearGradient>{" "} */}
                  <span className="dark:text-gray-900 items-center">COURSES</span>
                  <div className=" text-base mb-4  flex  font-normal dark:text-gray-900   mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
                </h1>
        
       </div>

        
        {/* <div className="text-lg text-my-orange font-thin text-white p-0  items-center justify-center flex">
              Read More
            </div> */}

        <div className="flex justify-evenly  flex-wrap  mb-8 gap-7 ">
          <div className=" max-w-[300px] h-fit    shadow-2xl p-10  rounded-full  bg-white">
            <RiGraduationCapLine size={"80px"} />
            <div className="text-2xl text-my-blue font-bold mt-5 ">B.tech</div>
            {/* <div className="text-my-grey mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              eaque. Lorem ipsum
            </div> */}

            {/* <div className="text-xl text-my-orange font-bold mt-5">
              Read More
            </div> */}
          </div>

          <div className=" max-w-[300px] h-fit    shadow-2xl p-10  rounded-full  bg-white">
            <RiGraduationCapLine size={"80px"} />
            <div className="text-2xl text-my-blue font-bold mt-5 ">M.tech</div>
            {/* <div className="text-my-grey mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              eaque. Lorem ipsum
            </div> */}

            {/* <div className="text-xl text-my-orange font-bold mt-5">
              Read More
            </div> */}
          </div>

          <div className=" max-w-[300px] h-fit    shadow-2xl p-10  rounded-full  bg-white">
            <RiGraduationCapLine size={"80px"} />
            <div className="text-2xl text-my-blue font-bold mt-5 ">M.B.A</div>
            {/* <div className="text-my-grey mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas,
              eaque. Lorem ipsum
            </div> */}

            {/* <div className="text-xl text-my-orange font-bold mt-5">
              Read More
            </div> */}
          </div>
         
         
        </div>
      </div>

 
      </div>
  )
}

export default Courses
