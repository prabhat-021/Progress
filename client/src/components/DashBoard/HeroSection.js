import React from "react";
import college from "../../assets/iit.jpg";
import CountUp from "react-countup";
// import ScrollTrigger from "react-scroll-trigger";
function HeroSection() {
  return (
    <div>
      <section className="">
        <div
          className="relative overflow-hidden bg-cover bg-fixed bg-no-repeat"
          style={{
            backgroundPosition: "50%",
            backgroundImage: `url(${college})`,
            height: "600px",
          }}
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
            <div className="flex h-full items-center justify-center">
              <div className="px-6 text-center text-white md:px-12">
                <h1 className="mt-2  mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                  {/* <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}> */}

                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">Find Over{" "} 
                    {<CountUp start={0} end={25000} duration={3} delay={0} />}+
                    College{" "} </span> 
                  {/* </LinearGradient>{" "} */}
                  in India <br />
                  <span>of your Choice</span>
                </h1>
                <div className="flex justify-center">
                  {/* <img src={college} alt='college image' className="max-w-3xl w-full"/> */}
                </div>

                <button
                  type="button"
                  className=" hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  rounded border-2 mt-9 hover:border-0 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 mb-6 active:text-neutral-200"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
