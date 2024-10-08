import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function CarouselCard() {
  useEffect(() => {
    const slider = new Glide(".glide-06", {
      type: "carousel",
      focusAt: "center",
      perView: 3,
      autoplay: 3000,
      animationDuration: 700,
      gap: 10,
      classNames: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-[#e4e6e6]">
        <div className="flex items-center justify-center flex-wrap   ">
          <h1 className="mt-6  text-5xl font-bold tracking-tight md:text-5xl xl:text-5sxl">
            <div className="flex justify-center">
              <span className="text-white tracking-widest dark:text-gray-900">NOTIFICATION</span>
            </div>
            <div className=" text-base mb-6  ml-4 flex  font-normal dark:text-gray-900   mt-4">
              Keeping you informed and connected in a fast-paced world.
            </div>
          </h1>
        </div>
        <div className="glide-06 relative w-full overflow-hidden rounded dark:bg-[#6EE7B7">
          {/*    <!-- Slides --> */}
          <div className="overflow-hidden" data-glide-el="track">
            <ul className="whitespace-no-wrap pb-16  flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
              <li className="">
                <Card className="mt-6 w-96 bg-white">
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 text-gray-900"
                    >
                      Colleges Reviews
                    </Typography>
                    <Typography className="text-gray-900">
                    One reviewer says that the people at the college are nice and friendly, but that the location is a drawback. They also say that placements depend on your CV and exposure.
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              </li>
              <li>
                <Card className="mt-6 w-96 bg-white">
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 text-gray-900"
                    >
                      Latest News
                    </Typography>
                    <Typography className="text-gray-900">
                    The controversy emerged after the Delhi University noted certain 'crucial and alarming aspects' in the list submitted by St Stephen's college.
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              </li>
              <li>
                <Card className="mt-6 w-96 bg-white">
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 text-gray-900"
                    >
                      Colleges Reviews
                    </Typography>
                    <Typography className="text-gray-900">
                      The quality of teaching is way more good as i think about this college the management of academics i... Read more at: https://www.careers360.com/colleges/reviews
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              </li>
              <li>
                <Card className="mt-6 w-96 bg-white">
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 text-gray-900"
                    >
                      Latest News
                    </Typography>
                    <Typography className="text-gray-900">
                    Delhi University will be offering admission to around 71,600 seats (excluding supernumerary seats) across 69 colleges, departments, and centres.
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              </li>
              {/* <li>
                <Card className="mt-6 w-96 bg-white">
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 text-gray-900"
                    >
                      College Reviews
                    </Typography>
                    <Typography className="text-gray-900">
                    One reviewer says that the faculty at ITS Engineering College in Greater Noida are helpful and knowledgeable, and that the college has good placements. Another reviewer says that the fees are moderate, and that the ROI is good. 

                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              </li> */}
            </ul>
          </div>
          {/*    <!-- Controls --> */}
          <div
            className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
            data-glide-el="controls"
          >
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
              data-glide-dir="<"
              aria-label="prev slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <title>prev slide</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </button>
            <button
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
              data-glide-dir=">"
              aria-label="next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <title>next slide</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
          {/*    <!-- Indicators --> */}
          <div
            className="absolute bottom-0 flex w-full items-center justify-center  gap-2"
            data-glide-el="controls[nav]"
          >
            <button
              className="group p-4"
              data-glide-dir="=0"
              aria-label="goto slide 1"
            >
              <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
            </button>
            <button
              className="group p-4"
              data-glide-dir="=1"
              aria-label="goto slide 2"
            >
              <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
            </button>
            <button
              className="group p-4"
              data-glide-dir="=2"
              aria-label="goto slide 3"
            >
              <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
            </button>
            <button
              className="group p-4"
              data-glide-dir="=3"
              aria-label="goto slide 4"
            >
              <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
            </button>
          </div>
        </div>
      </div>
      {/*<!-- End Card Carousel --> */}
    </>
  );
}
export default CarouselCard;



// import jssimg from "../assets/"
// import mietimg from "../../assets/MIET.jpeg"
// import akgecimg from "../../assets/AKGEC.jpeg"
// import React from "react";
// import { TECarousel, TECarouselItem } from "tw-elements-react";

// export default function CarouselBasicExample() {
//   return (
//     <>
//       <TECarousel showControls showIndicators ride="carousel">
//         <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
//           <TECarouselItem
//             itemID={1}
//             className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
//           >
//             <img
//               src={jssimg}
//               className="block w-full"
//               alt="..."
//             />
//             <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
//               <h5 className="text-xl">First slide label</h5>
//               <p>
//                 Some representative placeholder content for the first slide.
//               </p>
//             </div>
//           </TECarouselItem>
//           <TECarouselItem
//             itemID={2}
//             className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
//           >
//             <img
//               src={mietimg}
//               className="block w-full"
//               alt="..."
//             />
//             <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
//               <h5 className="text-xl">Second slide label</h5>
//               <p>
//                 Some representative placeholder content for the second slide.
//               </p>
//             </div>
//           </TECarouselItem>
//           <TECarouselItem
//             itemID={3}
//             className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
//           >
//             <img
//               src={akgecimg}
//               className="block w-full"
//               alt="..."
//             />
//             <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
//               <h5 className="text-xl">Third slide label</h5>
//               <p>
//                 Some representative placeholder content for the third slide.
//               </p>
//             </div>
//           </TECarouselItem>
//         </div>
//       </TECarousel>
//     </>
//   );
// }