import React from "react";
import Button from "./Button/Button";

const Courses = () => {
  return (
    <div className="bg-[#e4e6e6]">
      <div className="  ">
        <div className="flex items-center justify-center flex-wrap   ">
          <h1 className="mt-6  text-5xl font-bold tracking-tight md:text-5xl xl:text-5sxl">
            {/* <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
                  FEATURED  {" "}
                  </LinearGradient>{" "} */}
            <span className="dark:text-gray-900 ml-9 items-center tracking-widest">
              COURSES
            </span>
            <div className=" text-base mb-4  flex  font-normal dark:text-gray-900   mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </h1>
        </div>

        {/* <div className="text-lg text-my-orange font-thin text-white p-0  items-center justify-center flex">
              Read More
            </div> */}

        <div className="flex justify-evenly  flex-wrap  gap-3 pb-6 pr-4 pl-4 ">
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  ">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                B.Tech
              </h5>
            </a>
            <p class="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
              BTech is a highly sought-after undergraduate engineering degree,
              offering a gateway to diverse and rewarding career opportunities
              in the ever-evolving technological landscape
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>

          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                M.Tech
              </h5>
            </a>
            <p class="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
              MTech is a professional postgraduate engineering master's degree
              programme awarded to candidates after completion of two years of
              study in the discipline of engineering.
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>

          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-black ">
                M.B.A.
              </h5>
            </a>
            <p class="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
              A master of business administration (MBA) is a graduate degree
              that provides theoretical and practical training for business or
              investment management.
            </p>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center items center pb-10">
        <Button/>
        </div>
    </div>
  );
};

export default Courses;
